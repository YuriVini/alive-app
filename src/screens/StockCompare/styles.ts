import { Platform, StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 80,
  },
  content: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderTopLeftRadius: 45,
    backgroundColor: colors.white,
  },
  textHeader: {
    color: colors.white,
    fontSize: 32,
    marginLeft: 50,
    fontWeight: "bold",
  },
  search: {
    width: "80%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grayFooter,
    paddingHorizontal: 20,
    borderRadius: 7,
    marginTop: 80,
    ...Platform.select({
      android: { elevation: 2 },
      ios: {
        shadowColor: colors.textLight,
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.3,
        shadowRadius: 15,
      },
    }),
  },
  input: {
    flex: 1,
    backgroundColor: colors.grayFooter,
    color: colors.text,
    height: 36,
    borderRadius: 12,
    fontSize: 14,
  },
  textSearch: {
    color: colors.grayFooter,
    fontSize: 20,
    fontWeight: "600",
  },
  emptyTextList: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "600",
    marginTop: 30,
  },
  iconContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: 40,
  },
});
