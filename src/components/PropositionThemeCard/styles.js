import react from "react";
import { Dimensions, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 4,
  },
  cardThemeContainer: {
    width: Dimensions.get('window').width*0.41,
    height: Dimensions.get('window').width*0.41,
    borderRadius: 15,
    overflow: "hidden",
  },
  themeTitleText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 22,
    marginHorizontal: 12,
    zIndex: 1,
  },
  cardIcon: {
    position: "absolute",
    bottom: -12,
    right: -9,
  },
});

export default styles;
