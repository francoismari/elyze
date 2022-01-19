import react from "react";
import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  titleText: {
    fontSize: Dimensions.get("window").width * 0.085,
    marginLeft: 25,
    marginBottom: 15,
    width: 250,
    fontWeight: "bold",
  },
});

export default styles;
