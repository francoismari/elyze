import react from "react";
import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  headerImage: {
    width: "100%",
    height: 247,
  },
  upTextContainer: {
    flexDirection: "row",
    alignItems: 'baseline',
  },
  nameText: {
    marginTop: 15,
    fontSize: 30,
    fontWeight: "bold",
  },
  ageText: {
    fontSize: 25,
    marginLeft: 6,
  },
  groupDetailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    width: Dimensions.get('window').width*0.8
  },
  groupText: {
    fontSize: 18,
    marginLeft: 5,
    color: "gray",
  },
  themeText: {
    marginLeft: 25,
    marginTop: 15,
    fontSize: 24,
    fontWeight: "500",
    width: "80%",
  },
  showAllButton: {
    marginTop: 10,
    height: 35,
    width: "90%",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderRadius: 8,
  },
  showAllText: {
    textTransform: "uppercase",
    color: "white",
    fontWeight: "700",
  },
  separationBar: {
    width: "88%",
    height: 0.9,
    backgroundColor: "lightgray",
    paddingHorizontal: 30,
    alignSelf: "center",
    marginTop: 7,
  },
  themeContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginRight: 20,
    marginTop: 15,
    height: 25,
    width: 25,
    borderRadius: 25,
    backgroundColor: colors.primary,
    paddingLeft: 2,
  },
  themeBottomBar: {
      width: "100%",
      height: 0.9,
      backgroundColor: "lightgray",
      marginLeft: 50,
      alignSelf: "center",
      marginTop: 7,
      marginTop: 15,
  }
});

export default styles;
