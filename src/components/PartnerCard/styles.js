import react from "react";
import { StyleSheet, Dimensions } from "react-native";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    backgroundColor: "white",
    height: 100,
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
  },
  textContainer: {
    marginHorizontal: 10,
    justifyContent: "center",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 22,
    width: 200
  },
  descriptionText: {
    marginTop: 3,
    width: width * 0.5,
    fontSize: 15,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  cardImage: {
    height: 50,
    width: 50,
  },
});

export default styles;
