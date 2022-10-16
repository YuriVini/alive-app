import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "flex-end",
  },
  button: {
    flex: 1,
    backgroundColor: colors.none,
  },
  container: {
    overflow: "hidden",
    borderRadius: 16,
    backgroundColor: colors.white,
  },
});
