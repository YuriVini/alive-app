import React, { useCallback, useEffect, useReducer, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  ListRenderItem,
  Text,
  View,
} from "react-native";
import Wrapper from "../../components/Wrapper";
import { StackScreenProps } from "@react-navigation/stack";

import styles from "./styles";
import { StackRoutesParams } from "../../routes/stackRoutes.routes";
import { ROUTES } from "../../routes/appRoutes";
import { getStockHistory } from "../../services/api";
import { HistoryStockPrice } from "../../services/types";
import colors from "../../styles/colors";
import StockBox from "../../components/StockBox";
import { format } from "date-fns";

const StockDetails = ({
  route,
}: StackScreenProps<StackRoutesParams, ROUTES.STOCK_DETAILS>) => {
  const [historyData, setHistoryData] = useState<HistoryStockPrice[]>([]);
  const [from, setFrom] = useState(1);
  const [to, setTo] = useState(2);
  const [showEmptyRender, setShowEmptyRender] = useState(false);
  const [loading, toggle] = useReducer((s) => !s, true);

  const { stockName } = route.params;

  const fetchStockHistory = useCallback(async () => {
    try {
      const { data: history } = await getStockHistory(stockName, from, to);

      setHistoryData((prevState) => [...prevState, ...history.prices]);
    } catch (error: any) {
      if (error.response.status === 404) {
        setHistoryData([]);
        setShowEmptyRender(true);
      } else {
        Alert.alert("Serviço indisponível.");
      }
    } finally {
      toggle();
    }
  }, [from, to]);

  const renderItem: ListRenderItem<HistoryStockPrice> = ({ item }) => {
    return (
      <>
        <StockBox onPress={() => null}>
          <Text style={{ color: colors.white }}>Abriu em: {item.opening}</Text>
          <Text style={{ color: colors.white }}>Alta: {item.high}</Text>
          <Text style={{ color: colors.white }}>
            Fechado em: {item.closing}
          </Text>
          <Text style={{ color: colors.white }}>
            Preço do dia: {format(new Date(item.pricedAt), "dd/MM/yy")}
          </Text>
        </StockBox>
      </>
    );
  };

  const listEmptyComponent = () => (
    <View style={{ alignItems: "center" }}>
      {showEmptyRender && (
        <Text style={styles.textSearch}>Nenhum histórico encontrado.</Text>
      )}
    </View>
  );

  const onEndReached = () => {
    setFrom((prevState) => prevState + 1);
    setTo((prevState) => prevState + 1);
  };

  useEffect(() => {
    fetchStockHistory();
  }, [from, to]);

  return (
    <Wrapper title="Detalhes de Ações" hasHeader>
      <View style={{ flex: 1 }}>
        {loading ? (
          <ActivityIndicator
            size="large"
            style={{ marginTop: 80 }}
            color={colors.white}
          />
        ) : (
          <FlatList
            data={historyData}
            contentContainerStyle={{ paddingBottom: 100 }}
            keyExtractor={(item, index) => `${item.volume}-${index}`}
            renderItem={renderItem}
            onEndReached={onEndReached}
            ListEmptyComponent={listEmptyComponent}
          />
        )}
      </View>
    </Wrapper>
  );
};
export default StockDetails;
