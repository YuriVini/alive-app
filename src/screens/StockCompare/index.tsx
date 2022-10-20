import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Keyboard,
  ListRenderItem,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import Wrapper from "../../components/Wrapper";
import { useStockState } from "../../contexts/Stock";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";

import styles from "./styles";
import colors from "../../styles/colors";
import StockBox from "../../components/StockBox";
import { getStockCompared } from "../../services/api";
import { StockCompareType } from "../../services/types";
import { format } from "date-fns";
import StockGains from "../StockGains";
import { Modal } from "../../components/Modal";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";

const StockCompare = () => {
  const [stockModal, setStockModal] = useState<StockCompareType>(
    {} as StockCompareType
  );
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);

  const { stock } = useStockState();
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { mutate, data: stockResult } = getStockCompared();

  const handleCompare = async (stocksCompare: string) => {
    setLoading(true);
    let stockCompareValues: string[] = [];
    stockCompareValues.push(stocksCompare);

    mutate(
      { stockName: stock.name, stocksToCompare: stockCompareValues },
      {
        onError(error) {
          return Alert.alert(error.message);
        },
        onSettled() {
          setTimeout(() => setLoading(false), 2000);
        },
      }
    );
  };

  const handleOpenGains = (item: StockCompareType) => {
    setStockModal(item);
    setVisible(true);
  };

  const renderItem: ListRenderItem<StockCompareType> = ({ item, index }) => {
    const date = format(new Date(item?.pricedAt), "dd/MM/yy");

    return (
      <>
        {loading && index === 1 ? (
          <ActivityIndicator style={{ marginTop: 40 }} size="large" />
        ) : (
          <>
            <StockBox onPress={() => handleOpenGains(item)}>
              <Text style={styles.textSearch}>{item.name}</Text>
              <Text style={styles.textSearch}>{item.lastPrice}</Text>
              <Text style={styles.textSearch}>{date}</Text>
            </StockBox>
            <View style={styles.iconContainer}>
              {index === 0 && !loading && (
                <AntDesign name="arrowdown" size={24} color="black" />
              )}
            </View>

            {stockResult?.lastPrices?.length! < 2 && (
              <View style={{ alignItems: "center" }}>
                <Text style={styles.emptyTextList}>
                  Nenhuma ação encontrada.
                </Text>
              </View>
            )}
          </>
        )}
      </>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <>
        <Wrapper>
          <View style={styles.container}>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.goBack()}
            >
              <AntDesign name="left" size={24} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.textHeader}>Comparar {stock.name} com:</Text>
          </View>

          <View style={styles.content}>
            <View accessibilityRole="search" style={styles.search}>
              <MaterialCommunityIcons
                name="briefcase-search"
                color={colors.textLight}
                size={18}
                style={{ marginEnd: 11, marginStart: -9 }}
              />
              <TextInput
                style={styles.input}
                placeholder="Buscar"
                onEndEditing={(e) => handleCompare(e.nativeEvent.text)}
              />
            </View>

            <FlatList
              data={stockResult?.lastPrices}
              style={{ width: "100%" }}
              keyExtractor={(item, index) => `${item}-${index}`}
              renderItem={renderItem}
            />
          </View>
        </Wrapper>

        <Modal height={400} visible={visible} close={() => setVisible(false)}>
          <StockGains data={[stockModal]} setModalVisible={setVisible} />
        </Modal>
      </>
    </TouchableWithoutFeedback>
  );
};
export default StockCompare;
