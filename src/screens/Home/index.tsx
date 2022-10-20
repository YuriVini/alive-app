import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Keyboard,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { getStockQuote } from "../../services/api";
import { MaterialCommunityIcons, AntDesign } from "@expo/vector-icons";
import investorIcon from "../../assets/general/investor-money-finance.png";

import styles from "./styles";
import colors from "../../styles/colors";
import Wrapper from "../../components/Wrapper";
import { format } from "date-fns";

import StockBox from "../../components/StockBox";
import { Modal } from "../../components/Modal";
import StockGains from "../StockGains";
import Button from "../../components/Button";
import { useStockState } from "../../contexts/Stock";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { ROUTES } from "../../routes/appRoutes";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showEmptyRender, setShowEmptyRender] = useState(false);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { addStock } = useStockState();

  const { mutate, data: searchResult, isError } = getStockQuote();
  const handleChange = async (value: string) => {
    setLoading(true);

    setShowEmptyRender(false);
    mutate(
      { stockName: value },
      {
        onError(error) {
          setShowEmptyRender(true);
          Alert.alert(error.message);
        },
        onSettled() {
          setLoading(false);
        },
      }
    );
  };
  console.tron.log!(searchResult);
  const handleCompare = () => {
    addStock(searchResult!);
    navigation.navigate(ROUTES.STOCK_COMPARE);
  };

  const handleGoToStockDetails = () => {
    setVisible(true);
  };

  const date = searchResult?.pricedAt
    ? format(new Date(searchResult?.pricedAt), "dd/MM/yy")
    : "";

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss}>
      <>
        <Wrapper>
          <View style={styles.header}>
            <Text style={styles.textHeader}>Olá Investidor!</Text>
            <Image source={investorIcon} style={styles.imageHeader} />
          </View>

          <View style={styles.modalView}>
            <Text style={styles.textSearch}>
              Busque uma ação e veja as cotações!
            </Text>

            <View accessibilityRole="search" style={styles.search}>
              <MaterialCommunityIcons
                name="briefcase-search"
                color={colors.textLight}
                size={18}
                style={{ marginEnd: 11, marginStart: -9 }}
              />
              <TextInput
                placeholder="Buscar"
                placeholderTextColor={colors.textLight}
                selectionColor={colors.textLight}
                onEndEditing={(e) => handleChange(e.nativeEvent.text)}
                style={styles.input}
                maxLength={64}
              />
            </View>

            <View style={{ width: "100%" }}>
              {loading ? (
                <ActivityIndicator style={{ marginTop: 40 }} size="large" />
              ) : (
                <>
                  {!isError && searchResult?.name && (
                    <StockBox onPress={handleGoToStockDetails}>
                      <View style={styles.content}>
                        <View style={styles.iconText}>
                          <MaterialCommunityIcons
                            name="graphql"
                            size={48}
                            color={colors.white}
                          />
                          <View style={styles.texts}>
                            <Text style={styles.text1}>
                              {searchResult?.name}
                            </Text>
                            <Text style={styles.text2}>
                              R$ {searchResult?.lastPrice}
                            </Text>
                            <Text style={styles.text3}>{date}</Text>
                          </View>
                        </View>
                        <AntDesign
                          name="right"
                          size={24}
                          color={colors.white}
                        />
                      </View>
                    </StockBox>
                  )}
                </>
              )}
            </View>

            {showEmptyRender && (
              <Text style={styles.textSearch}>Nenhuma ação encontrada.</Text>
            )}

            <View style={styles.buttonContainer}>
              {!!searchResult?.name && !loading && (
                <Button title="Comparar essa ação" onPress={handleCompare} />
              )}
            </View>
          </View>
        </Wrapper>
        <Modal height={400} visible={visible} close={() => setVisible(false)}>
          <StockGains data={[searchResult!]} setModalVisible={setVisible} />
        </Modal>
      </>
    </TouchableWithoutFeedback>
  );
};
export default Home;
