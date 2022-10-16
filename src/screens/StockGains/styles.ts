import { StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  circleContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.black,
    borderWidth: 1,
    marginBottom: 10,
  },
  textName: {
    fontWeight: "bold",
    fontSize: 24,
  },
  textDate: {
    fontWeight: "600",
    fontSize: 14,
    marginBottom: 20,
  },
  content: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    margin: 10,
  },
  title: {
    fontWeight: "600",
    fontSize: 16,
    marginBottom: 10,
    color: colors.text,
  },
  values: {
    fontSize: 14,
    marginBottom: 10,
    color: colors.textLight,
  },
  alignItem: {
    alignItems: "center",
  },
});
