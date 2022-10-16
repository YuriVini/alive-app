import React from "react";
import { View } from "react-native";
import Header from "../Header";

import styles from "./styles";

type WrapperProps = {
  children: React.ReactNode;
  title?: string;
  hasHeader?: boolean;
};

const Wrapper = ({ children, title, hasHeader = false }: WrapperProps) => {
  return (
    <View style={styles.container}>
      {hasHeader && <Header title={title} />}
      {children}
    </View>
  );
};
export default Wrapper;
