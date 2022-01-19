import react from "react";
import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    height: 104,
    width: 0.87 * width,
    marginBottom: 10,
    borderRadius: 15,
    justifyContent: "space-between",
  },
  candidateDetailsContainer: {
    flexDirection: "row",
    marginTop: 11,
    marginLeft: 12,
    marginBottom: 5,
  },
  hashtagPositionText: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
  positionText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
  candidateFirtnameText: {
    fontSize: 24,
    color: "white",
    marginLeft: 9,
  },
  candidateLastnameText: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    marginLeft: 7,
  },
  bottomCardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  agreePourcentageText: {
    width: "75%",
    fontSize: 18,
    color: "white",
  },
  imageCandidate: {
    height: 90,
    width: 86,
    marginTop: -19,
    resizeMode: "contain",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

export default styles;
