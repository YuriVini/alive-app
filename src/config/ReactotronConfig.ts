/* eslint-disable no-console */
import { NativeModules } from "react-native";
import Reactotron from "reactotron-react-native";

declare global {
  interface Console {
    tron: typeof Reactotron;
  }
}

if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode;
  const scriptHostname = scriptURL.split("://")[1].split(":")[0];
  const tron = Reactotron.configure({ host: scriptHostname })
    .useReactNative({
      networking: {
        ignoreUrls: /symbolicate|logs|generate_204|collect|exp.host/,
      },
    })
    .connect();

  console.tron = tron;
}
