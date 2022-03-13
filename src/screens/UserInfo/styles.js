import react from "react";
import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  titleHeader: {
    marginTop: 40,
    fontSize: width * 0.085,
    fontWeight: "bold",
  },
  closeButton: {
    marginTop: 20,
    height: 40,
    width: 40,
    backgroundColor: colors.primary,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  settingsCategory: {
    marginLeft: 20,
    fontSize: Dimensions.get("window").width * 0.04,
    textTransform: "uppercase",
    marginBottom: 10,
    marginTop: 15,
    width: Dimensions.get("window").width * 0.9,
  },
  noteContainer: {
    marginHorizontal: 20,
    backgroundColor: "#F0F0F0",
    padding: 10,
    borderRadius: 10,
  },
  subCategory: {
    marginHorizontal: 20,
    fontSize: Dimensions.get("window").width * 0.04,
  },
  sectionContainer: {
    backgroundColor: "#F0F0F0",
    marginHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 15,
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
    fontWeight: "bold",
    color: "white",
  },
});

export default styles;
