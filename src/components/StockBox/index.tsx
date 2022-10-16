import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { TouchableOpacity } from "react-native";

import colors from "../../styles/colors";

import styles from "./styles";

type StockBoxProps = {
  onPress: () => void;
  children: React.ReactNode;
};

const StockBox = ({ onPress, children }: StockBoxProps) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <LinearGradient
        colors={colors.linearCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearContainer}
      >
        {children}
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default StockBox;
