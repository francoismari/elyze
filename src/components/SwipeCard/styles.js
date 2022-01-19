import react from "react";
import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = StyleSheet.create({
  cardContainer: {
    width: width * 0.9,
    height: height * 0.50,
    backgroundColor: "#E9556F",
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: 'flex-end'
  },
  topCardInfos: {
    justifyContent: "center",
    alignItems: "center",
    position: 'absolute',
    top: 10,
    alignSelf: 'center',
    zIndex: 10
  },
  themeInfoContainer: {
    paddingHorizontal: 10,
    height: width*0.06,
    backgroundColor: "#FAFC91",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 11,
  },
  themeText: {
    color: colors.primary,
    fontSize: width*0.038
  },
  questionContainer: {
    height: height * 0.3,
    backgroundColor: "#E9556F",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 27,
  },
  questionText: {
    fontWeight: "bold",
    fontSize: width*0.055,
    textAlign: "center",
    color: "#FAFC91",
    paddingBottom: height*0.02
  },
  bottomCardInfos: {
    backgroundColor: colors.bottomCardColor,
    alignItems: "center",
    paddingBottom: 15
  },
  learnMoreButton: {
    flexDirection: "row",
    alignItems: "center",
    height: width*0.11,
    width: width * 0.82,
    backgroundColor: "white",
    justifyContent: "center",
    borderRadius: 10,
    marginTop: 15,
  },
  learnMoreText: {
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 6,
    color: "#707AD7",
  },
});

export default styles;
