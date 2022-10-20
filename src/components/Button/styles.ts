import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    width: "100%",
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blueHeader,
    borderRadius: 30,
  },
  title: {
    fontSize: 20,
    color: colors.white,
    fontWeight: "bold",
  },
});
