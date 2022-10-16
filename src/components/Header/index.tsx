import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";

import styles from "./styles";
import colors from "../../styles/colors";
import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { ROUTES } from "../../routes/appRoutes";

type HeaderProps = {
  title?: string;
};

const Header = ({ title }: HeaderProps) => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.goBack()}>
        <AntDesign name="left" size={24} color={colors.white} />
      </TouchableOpacity>
      {title && <Text style={styles.title}>{title}</Text>}
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => navigation.navigate(ROUTES.HOME)}
      >
        <Text style={styles.closeButtonText}>Fechar</Text>
      </TouchableOpacity>
    </View>
  );
};
export default Header;
