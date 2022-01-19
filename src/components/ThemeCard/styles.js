import react from "react";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 92,
    alignSelf: "center",
    marginBottom: 15,
    flexDirection: "row",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    justifyContent: "space-between",
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  textTitle: {
      marginTop: 20,
      marginLeft: 20,
      color: 'white',
      fontSize: 22,
      fontWeight: 'bold',
      width: '65%'
  }
});

export default styles;
