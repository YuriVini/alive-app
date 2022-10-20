import * as React from "react";
import { ROUTES } from "./appRoutes";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Home, StockCompare, StockDetails } from "../screens";

export type StackRoutesParams = {
  [ROUTES.HOME]: undefined;
  [ROUTES.STOCK_DETAILS]: {
    stockName: string;
  };
  [ROUTES.STOCK_COMPARE]: undefined;
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
      <StackRoute.Screen name={ROUTES.STOCK_COMPARE} component={StockCompare} />
    </StackRoute.Navigator>
  );
};

export default MainRoutes;
