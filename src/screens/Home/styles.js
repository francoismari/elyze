import react from "react";
import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

const styles = {
  logoImage: {
    position: "absolute",
    top: -10,
    left: 0,
    width: width*0.40,
    height: height*0.07,
    marginLeft: 26,
    resizeMode: 'contain'
  },
  buttonContainer: {
    position: "absolute",
    top: 0.67 * height,
    zIndex: 1,
    flexDirection: "row",
    alignSelf: 'center'
  },
  dislikeButton: {
    height: width*0.17,
    width: width*0.17,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  likeButton: {
    height: width*0.17,
    width: width*0.17,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    marginLeft: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  hesitateButton: {
    height: width*0.15,
    width: width*0.15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    marginRight: 15,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  superLikeButton: {
    height: width*0.15,
    width: width*0.15,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    marginLeft: 15,
    marginTop: 4,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  circleContainer: {
    width: Dimensions.get("window").width * 2.5,
    height: Dimensions.get("window").width * 2.5,
    borderRadius: (Dimensions.get("window").width * 2.5) / 2,
    position: "absolute",
    backgroundColor: colors.primary,
    top: Dimensions.get("window").width * 0.85,
    zIndex: -10,
    alignSelf: "center",
  }
};

export default styles;
