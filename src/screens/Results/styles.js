import react from "react";
import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height * 0.08,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  shareButton: {
    height: width * 0.12,
    width: width * 0.12,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 25,
  },
  podiumContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginHorizontal: 20,
  },
  secondResults: {
    alignItems: "center",
  },
  firstResults: {
    alignItems: "center",
  },
  thirdResults: {
    alignItems: "center",
  },
  imageContainer: {},
  podiumImage: {
    resizeMode: "contain",
    height: 56,
    width: 65,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
  },
  rectangleWrapper: {
    width: 0.27 * width,
    backgroundColor: "red",
    alignItems: "center",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  numberWrapper: {
    height: 40,
    width: 40,
    borderRadius: 22,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  listScoreContainer: {
    backgroundColor: "#FFEDF0",
  },
  allResultsText: {
    marginTop: 17,
    alignSelf: "center",
    fontSize: 20,
    marginBottom: 8,
  },
  passedPropositionsText: {
    textAlign: "center",
    textTransform: "uppercase",
    marginTop: -5,
    marginBottom: 10,
    fontSize: width * 0.035,
    color: "gray",
    paddingHorizontal: 30,
  },
});

export default styles;
