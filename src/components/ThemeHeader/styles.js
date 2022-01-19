import react from "react";
import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  header: {
    justifyContent: "flex-end",
    overflow: "hidden",
    height: Dimensions.get("window").height * 0.2,
  },
  headerTextAndIconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default styles;
