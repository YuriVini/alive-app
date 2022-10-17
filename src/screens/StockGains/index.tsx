import React, { Dispatch, SetStateAction, useEffect } from "react";
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

type StockGainsProps = {
  data: StockQuoteResponse[];
  setModalVisible: Dispatch<SetStateAction<boolean>>;
};

const StockGains = ({ data, setModalVisible }: StockGainsProps) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const handleGoToStockDetails = () => {
    setModalVisible(false);
    navigation.navigate(ROUTES.STOCK_DETAILS, {
      stockName: data[0]?.name,
    });
  };

  const { mutate, data: gainsResult, isLoading } = getStockGains();

  const obj = {
    stockName: data[0]?.name,
    purchasedAt: data[0]?.pricedAt,
    purchasedAmount: data[0]?.lastPrice,
  };

  const date = !!gainsResult?.purchasedAt
    ? format(new Date(gainsResult?.purchasedAt), "'Dia' dd 'de' MMMM'", {
        locale: ptBR,
      })
    : "";

  useEffect(() => {
    mutate(obj, {
      onError(error) {
        setModalVisible(false);
        Alert.alert("Serviço indisponível.");
      },
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.alignItem}>
          <Skeleton
            show={isLoading}
            colorMode="light"
            width={70}
            height={70}
            radius="round"
          >
            <View style={styles.circleContainer}>
              <Text style={styles.textName}>{gainsResult?.name}</Text>
            </View>
          </Skeleton>

          <Skeleton show={isLoading} colorMode="light" width={120}>
            <Text style={styles.textDate}>{date}</Text>
          </Skeleton>

          <View style={styles.content}>
            <Skeleton show={isLoading} colorMode="light">
              <View style={styles.alignItem}>
                <Text style={styles.title}>Comprado por</Text>
                <Text style={styles.values}>
                  R$ {gainsResult?.purchasedAmount}
                </Text>
              </View>
            </Skeleton>

            <Skeleton show={isLoading} colorMode="light">
              <View style={styles.alignItem}>
                <Text style={styles.title}>Último preço</Text>
                <Text style={styles.values}>R$ {gainsResult?.lastPrice}</Text>
              </View>
            </Skeleton>

            <Skeleton show={isLoading} colorMode="light">
              <View style={styles.alignItem}>
                <Text style={styles.title}>Capital de ganhos</Text>
                <Text style={styles.values}>{gainsResult?.capitalGains}</Text>
              </View>
            </Skeleton>
          </View>
        </View>

        <Skeleton show={isLoading} colorMode="light" width={100}>
          <TouchableOpacity
            onPress={handleGoToStockDetails}
            style={{ marginBottom: 10 }}
          >
            <Text>Ver histórico</Text>
          </TouchableOpacity>
        </Skeleton>
      </View>
    </>
  );
};
export default StockGains;
