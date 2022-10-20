import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StatusBar } from "expo-status-bar";
import {
  initialWindowMetrics,
  SafeAreaProvider,
} from "react-native-safe-area-context";

import "./src/config/ReactotronConfig";
import GlobalContext from "./src/contexts";
import Routes from "./src/routes";

const App = () => {
  const queryClient = new QueryClient();

  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <GlobalContext>
        <QueryClientProvider client={queryClient}>
          <StatusBar style="auto" />
          <Routes />
        </QueryClientProvider>
      </GlobalContext>
    </SafeAreaProvider>
  );
};

export default App;
