import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    backgroundColor: "#5B98EC",
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingTop: 10,
    marginBottom: 10,
  },
  nameContainer: {
    flexDirection: "row",
  },
  firstName: {
    fontSize: width*0.065,
    color: "white",
    fontWeight: "bold",
  },
  lastName: {
    marginLeft: 5,
    fontSize: width*0.065,
    color: "white",
    fontWeight: "400",
  },
  roleText: {
    fontSize: 17,
    color: "white",
    marginTop: 4,
  },
  profileImage: {
    height: 70,
    width: 70,
  },
});

export default styles;
