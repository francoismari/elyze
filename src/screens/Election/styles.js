import React from "react";
import { StyleSheet, Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: height * 0.08,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 20,
  },
  electionCountdown: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
  electionIcon: {
    fontSize: 40,
    marginBottom: 10,
  },
  diffTimeText: {
    fontSize: Dimensions.get("window").width * 0.12,
    fontWeight: "bold",
  },
  electionText: {
    fontSize: Dimensions.get("window").width * 0.05,
    marginTop: 10,
    textTransform: "uppercase",
  },
  subTitleText: {
    marginTop: 20,
    marginBottom: 10,
    fontSize: 20,
    marginHorizontal: 20,
    fontWeight: "500",
  },
  isEligibleContainer: {
    width: "90%",
    backgroundColor: "#63A5C1",
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    paddingVertical: 10,
    marginBottom: 7,
  },
  isEligibleText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  timerBeforeRegisterContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  timerContainer: {
    width: "46%",
    borderRadius: 12,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: "#63A5C1",
    marginTop: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  registerOnListContainer: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#63A5C1",
    borderRadius: 12,
  },
  registerOnListMenu: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  registerOnListMenuButton: {
    width: "46%",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: 5,
    marginTop: 10,
    borderRadius: 10,
  },
});

export default styles;
