import React, { Dispatch, SetStateAction, useReducer } from "react";
import { format } from "date-fns";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import { getStockGains } from "../../services/api";
import { StockQuoteResponse } from "../../services/types";
import { ptBR } from "date-fns/locale";

import styles from "./styles";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { ROUTES } from "../../routes/appRoutes";
import { Skeleton } from "moti/skeleton";
import { useQuery } from "@tanstack/react-query";

type StockGainsProps = {
  data: StockQuoteResponse[];
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

const StockGains = ({ data, setModalVisible }: StockGainsProps) => {
  const [visible, toggle] = useReducer((s) => !s, true);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleGoToStockDetails = () => {
    setModalVisible(false);
    navigation.navigate(ROUTES.STOCK_DETAILS, {
      stockName: data[0]?.name,
    });
  };

  const {
    data: gainsResult,
    isSuccess,
    isError,
  } = useQuery(["gains"], async () => {
    const gains = await getStockGains(
      data[0]?.name,
      data[0]?.pricedAt,
      data[0]?.lastPrice
    );
    if (isSuccess) {
      toggle();
      return gains;
    } else if (isError) {
      toggle();
      setModalVisible(false);
      return Alert.alert("Não foi possível carregar as informações.");
    } else {
      toggle();
      return gains;
    }
  });

  const date = !!gainsResult?.data?.purchasedAt
    ? format(new Date(gainsResult?.data?.purchasedAt), "'Dia' dd 'de' MMMM'", {
        locale: ptBR,
      })
    : "";

  return (
    <>
      <View style={styles.container}>
        <View style={styles.alignItem}>
          <View style={styles.circleContainer}>
            {visible ? (
              <Skeleton
                colorMode="light"
                width={70}
                height={70}
                radius="round"
              />
            ) : (
              <Text style={styles.textName}>{gainsResult?.data?.name}</Text>
            )}
          </View>

          {visible ? (
            <Skeleton colorMode="light" width={140} height={30} />
          ) : (
            <Text style={styles.textDate}>{date}</Text>
          )}

          <View style={styles.content}>
            {visible ? (
              <Skeleton colorMode="light" width={100} height={30} />
            ) : (
              <View style={styles.alignItem}>
                <Text style={styles.title}>Comprado por</Text>
                <Text style={styles.values}>
                  R$ {gainsResult?.data?.purchasedAmount}
                </Text>
              </View>
            )}

            {visible ? (
              <Skeleton colorMode="light" width={100} height={30} />
            ) : (
              <View style={styles.alignItem}>
                <Text style={styles.title}>Último preço</Text>
                <Text style={styles.values}>
                  R$ {gainsResult?.data?.lastPrice}
                </Text>
              </View>
            )}

            {visible ? (
              <Skeleton colorMode="light" width={100} height={30} />
            ) : (
              <View style={styles.alignItem}>
                <Text style={styles.title}>Capital de ganhos</Text>
                <Text style={styles.values}>
                  {gainsResult?.data?.capitalGains}
                </Text>
              </View>
            )}
          </View>
        </View>

        {visible ? (
          <Skeleton colorMode="light" width={140} height={30} />
        ) : (
          <TouchableOpacity
            onPress={handleGoToStockDetails}
            style={{ marginBottom: 10 }}
          >
            <Text>Ver histórico</Text>
          </TouchableOpacity>
        )}
      </View>
    </>
  );
};
export default StockGains;
