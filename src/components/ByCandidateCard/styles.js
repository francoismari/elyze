import react from "react";
import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    backgroundColor: "white",
    height: 92,
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
  firstnameText: {
    fontWeight: "300",
    fontSize: 27,
    letterSpacing: 0.5,
    color: 'white'
  },
  lastnameText: {
    fontWeight: "bold",
    fontSize: 27,
    letterSpacing: 0.5,
    color: 'white'
  },
  cardImage: {
    height: 80,
    width: 100,
    resizeMode: "contain",
    position: "absolute",
    bottom: 0,
    right: Dimensions.get('window').width*0.05,
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
