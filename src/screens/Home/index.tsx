import React, { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  FlatList,
  Image,
  Keyboard,
  ListRenderItem,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { getStockQuote } from "../../services/api";
import { StockQuoteResponse } from "../../services/types";
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
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [showEmptyRender, setShowEmptyRender] = useState(false);
  const [searchResult, setSearchResult] = useState<StockQuoteResponse[]>([]);

  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const { addStock } = useStockState();

  const handleChange = async (value: string) => {
    setLoading(true);
    try {
      const { data: quote } = await getStockQuote(value);

      setSearchResult([quote]);
      setShowEmptyRender(false);
    } catch (error: any) {
      if (error.response.status === 404) {
        setSearchResult([]);
        setShowEmptyRender(true);
      } else {
        Alert.alert("Serviço indisponível, tente mais tarde!");
      }
    } finally {
      setTimeout(() => setLoading(false), 2000);
    }
  };

  const handleCompare = () => {
    addStock(searchResult[0]);
    navigation.navigate(ROUTES.STOCK_COMPARE);
  };

  const renderItem: ListRenderItem<StockQuoteResponse> = ({ item }) => {
    const handleGoToStockDetails = () => {
      setVisible(true);
    };

    const date = format(new Date(item?.pricedAt), "dd/MM/yy");

    return (
      <>
        {loading ? (
          <ActivityIndicator style={{ marginTop: 40 }} size="large" />
        ) : (
          <StockBox onPress={handleGoToStockDetails}>
            <View style={styles.content}>
              <View style={styles.iconText}>
                <MaterialCommunityIcons
                  name="graphql"
                  size={48}
                  color={colors.white}
                />
                <View style={styles.texts}>
                  <Text style={styles.text1}>{item?.name}</Text>
                  <Text style={styles.text2}>R$ {item?.lastPrice}</Text>
                  <Text style={styles.text3}>{date}</Text>
                </View>
              </View>
              <AntDesign name="right" size={24} color={colors.white} />
            </View>
          </StockBox>
        )}
      </>
    );
  };

  const listEmptyComponent = () => (
    <View style={{ alignItems: "center" }}>
      {showEmptyRender && (
        <Text style={styles.textSearch}>Nenhuma ação encontrada.</Text>
      )}
    </View>
  );

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
                onChangeText={setSearch}
                onEndEditing={(e) => handleChange(e.nativeEvent.text)}
                value={search}
                style={styles.input}
                maxLength={64}
              />
            </View>

            <FlatList
              data={searchResult}
              style={{ width: "100%" }}
              keyExtractor={(item, index) => `${item.pricedAt}-${index}`}
              renderItem={renderItem}
              ListEmptyComponent={listEmptyComponent}
            />
            <View style={styles.buttonContainer}>
              {searchResult?.length > 0 && !loading && (
                <Button title="Comparar essa ação" onPress={handleCompare} />
              )}
            </View>
          </View>
        </Wrapper>
        <Modal height={400} visible={visible} close={() => setVisible(false)}>
          <StockGains data={searchResult} setModalVisible={setVisible} />
        </Modal>
      </>
    </TouchableWithoutFeedback>
  );
};
export default Home;
