import React from "react";
import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    height: 110,
    backgroundColor: "blue",
    marginBottom: 10,
    alignSelf: "center",
    borderRadius: 15,
  },
  candidatNameContainer: {
    flexDirection: "row",
    marginTop: 10,
    marginLeft: 13,
  },
  candidatRankingContainer: {
    flexDirection: "row",
  },
  hashtagText: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
  },
  rankingText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  candidateNameText: {
    fontSize: 25,
    fontWeight: "bold",
    color: "white",
    marginLeft: 9,
  },
  bottomCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: 13,
  },
  proportionText: {
    width: width * 0.6,
    fontSize: 18,
    fontWeight: "400",
    color: "white",
    marginTop: 7
  },
  candidateImage: {
    width: 90,
    height: 70,
    marginRight: 20,
  },
});

export default styles;
