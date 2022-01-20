import react from "react";
import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    backgroundColor: "white",
    height: 127,
    alignSelf: "center",
    marginBottom: 15,
    flexDirection: "row",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    justifyContent: "space-between",
  },
  textContainer: {
    marginHorizontal: 20,
    justifyContent: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 22,
  },
  descriptionText: {
    marginTop: 3,
    width: width * 0.5,
    fontSize: 15,
  },
  cardImage: {
    height: 100,
    width: 100,
    position: "absolute",
    bottom: 0,
    right: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
});

export default styles;
