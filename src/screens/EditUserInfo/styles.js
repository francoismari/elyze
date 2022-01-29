import react from "react";
import { StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";

const styles = StyleSheet.create({
  closeButton: {
    marginTop: 30,
    height: 40,
    width: 40,
    backgroundColor: colors.primary,
    borderRadius: 40,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-end",
    marginRight: 20,
  },
  editText: {
    height: 70,
    backgroundColor: "#E3E3E3",
    width: "30%",
    alignSelf: "center",
    padding: 10,
    fontSize: 20,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginTop: 30,
  },
  updateButton: {
    height: 70,
    backgroundColor: "#E3E3E3",
    width: "52%",
    alignSelf: "center",
    padding: 10,
    fontSize: 30,
    borderRadius: 20,
    paddingHorizontal: 20,
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
  },
  updateButtonText: {
    fontSize: 17,
    textAlign: "center",
    fontWeight: "bold",
    color: "white",
  },
});

export default styles;
