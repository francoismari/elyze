import react from "react";
import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    width: width * 0.8,
    // height: height * 0.12,
    marginRight: 13,
    borderRadius: 15,

    flexDirection: "row",
    backgroundColor: "white",

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,

    marginTop: 2,
    marginBottom: 10,
  },
  textContainer: {
    marginTop: 11,
    paddingHorizontal: 12
  },
  favoriteText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  favoriteDetails: {
    fontSize: 17,
    marginTop: 4,
    paddingBottom: 10,
    width: width*0.75
  },
  anecdoteText: {
    width: width * 0.8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    // fontSize: height*0.02,
    fontSize: 17,
  },
});

export default styles;
