import react from "react";
import { StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: "white",
  },
  noPropositionText: {
    textAlign: "center",
    marginTop: 55,
    fontSize: 25,
    paddingHorizontal: 20,
  },
  titleText: {
    marginLeft: 20,
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "bold",
    color: "black",
  },
  resetFavoritesContainer: {
    width: "90%",
    backgroundColor: colors.primary,
    paddingVertical: 15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  resetFavoritesText: {
    color: "white",
    fontSize: 17,
    fontWeight: "500",
  },
});
export default styles;
