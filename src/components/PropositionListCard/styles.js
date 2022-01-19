import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.25,
    borderColor: "lightgray",
  },
  propositionTextContainer: {
    marginLeft: 25,
    width: width * 0.75,
    height: 100,
    justifyContent: "center",
  },
  titleText: {
    fontSize: 18,
    fontWeight: "500",
    marginBottom: 5
  },
  candidatDetailsContainer: {
    flexDirection: "row",
    alignItems: 'center'
  },
  candidateImage: {
    height: 24,
    width: 24,
    borderRadius: 24
  },
  plusButtonContainer: {
    height: 30,
    width: 30,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 29,
    marginRight: 18,
  },
});

export default styles;
