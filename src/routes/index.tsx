import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainRoutes from "./stackRoutes.routes";

const Routes = () => {
  return (
    <NavigationContainer>
      <MainRoutes />
    </NavigationContainer>
  );
};

export default Routes;
