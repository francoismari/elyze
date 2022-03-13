import react from "react";
import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";

const height = Dimensions.get("window").height;
const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionContainer: {
    marginHorizontal: 27,
    width: width * 0.9,
    alignItems: "center",
    alignSelf: "center",
    paddingHorizontal: 5,
    borderRadius: 18,
    paddingVertical: 25,
    marginBottom: 15,
  },
  sectionTitle: {
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 20,
    fontWeight: "500",
    color: "white",
  },
  dataText: {
    marginTop: 20,
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  }
});

export default styles;
