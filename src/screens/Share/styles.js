import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import colors from "../../../assets/colors/colors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  shareResultsText: {
    marginTop: 50,
    alignSelf: "center",
    fontSize: width * 0.08,
    paddingHorizontal: 30,
    fontWeight: "bold",
    textAlign: "center",
  },
  imageToShare: {
    position: "absolute",
    top: height * 0.25,
    alignSelf: "center",
    height: width * 0.75,
    width: width * 0.75,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "center",
    // borderRadius: 15,
    borderWidth: 10,
    borderColor: "#516DF5",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  logo: {
    height: width * 0.1,
    width: width * 0.3,
    marginTop: 15,
  },
  resultsText: {
    marginTop: 2,
    fontSize: width * 0.06,
    fontWeight: "bold",
  },
  numberOfSwipesText: {
    textTransform: "uppercase",
    fontSize: width * 0.04,
    marginTop: 5,
  },
  firstColumn: {
    position: "absolute",
    bottom: 0,
    // left: 120,
    width: width * 0.17,
    height: height * 0.15,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  secondColumn: {
    position: "absolute",
    bottom: 0,
    left: width * 0.05,
    width: width * 0.17,
    height: height * 0.11,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  thirdColumn: {
    position: "absolute",
    bottom: 0,
    right: width * 0.05,
    width: width * 0.17,
    height: height * 0.09,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: "center",
  },
  candidateProfilImage: {
    height: width * 0.12,
    width: width * 0.12,
    marginTop: -height * 0.02,
    backgroundColor: "white",
    resizeMode: "contain",
    borderWidth: 4,
    borderColor: "black",
    borderRadius: 50,
  },
  moreOptionButton: {
    position: "absolute",
    bottom: height * 0.15,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: width * 0.135,
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: "row",
  },
  moreOptionText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
    marginLeft: 7,
  },
  backButton: {
    position: "absolute",
    bottom: height * 0.06,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    width: "80%",
    height: width * 0.135,
    backgroundColor: colors.primary,
    borderRadius: 10,
    flexDirection: "row",
  },
});

export default styles;
