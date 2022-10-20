import { Platform, StyleSheet } from "react-native";
import colors from "../../styles/colors";

export default StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: colors.blueHeader,
    alignItems: "center",
  },
  header: {
    width: "100%",
    paddingHorizontal: 40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 80,
  },
  textHeader: {
    color: colors.white,
    fontSize: 32,
    fontWeight: "bold",
  },
  imageHeader: {
    width: 40,
    height: 40,
    backgroundColor: colors.blueHeader,
    borderRadius: 8,
  },
  modalView: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    borderTopLeftRadius: 45,
    backgroundColor: colors.grayNeutral,
  },
  textSearch: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "600",
    marginTop: 50,
  },
  search: {
    width: "80%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.grayFooter,
    paddingHorizontal: 20,
    borderRadius: 7,
    marginTop: 17,
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
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconText: {
    flexDirection: "row",
    alignItems: "center",
  },
  texts: {
    marginLeft: 10,
    flexDirection: "column",
  },
  text1: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.white,
  },
  text2: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.white,
  },
  text3: {
    fontSize: 14,
    fontWeight: "400",
    color: colors.white,
  },
  buttonContainer: {
    width: "80%",
    position: "absolute",
    zIndex: 1,
    top: 600,
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
});
