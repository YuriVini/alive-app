import { StyleSheet } from "react-native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    marginTop: getStatusBarHeight() + 28,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.white,
  },
  closeButtonText: {
    color: colors.white,
  },
});
