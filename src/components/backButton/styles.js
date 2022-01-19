import react from "react";
import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";

const styles = StyleSheet.create({
  backButtonContainer: {
    position: "absolute",
    top: Dimensions.get('window').height*0.06,
    left: 20,
    height: 37,
    width: 37,
    backgroundColor: colors.primary,
    borderRadius: 38,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});

export default styles;