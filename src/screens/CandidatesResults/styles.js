import react from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menuContainer: {
    alignSelf: "center",
    width: "95%",
    backgroundColor: "white",
    height: 50,
    borderRadius: 10,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 10,
  },
  menuItemContainer: {
    width: "48%",
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  closeButton: {
    position: "absolute",
    bottom: 35,
    height: 55,
    width: "90%",
    alignSelf: "center",
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    fontSize: 20,
    textTransform: "uppercase",
    color: "white",
    fontWeight: "bold",
  },
});

export default styles;
