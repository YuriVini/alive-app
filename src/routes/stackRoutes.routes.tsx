import * as React from "react";
import { ROUTES } from "./appRoutes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../screens/Home";
import StockDetails from "../screens/StockDetails";

export type StackRoutesParams = {
  [ROUTES.HOME]: undefined;
  [ROUTES.STOCK_DETAILS]: {
    stockName: string;
  };
};

const StackRoute = createNativeStackNavigator<StackRoutesParams>();

const MainRoutes = () => {
  return (
    <StackRoute.Navigator
      initialRouteName={ROUTES.HOME}
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationTypeForReplace: "pop",
      }}
    >
      <StackRoute.Screen name={ROUTES.HOME} component={Home} />
      <StackRoute.Screen name={ROUTES.STOCK_DETAILS} component={StockDetails} />
    </StackRoute.Navigator>
  );
};

export default MainRoutes;
