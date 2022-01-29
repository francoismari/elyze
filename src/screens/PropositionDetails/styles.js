import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get("window").width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingBottom: 40
  },
  closeButton: {
    position: "absolute",
    bottom: 35,
    height: 50,
    width: width * 0.9,
    alignSelf: "center",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  closeModalText: {
    fontSize: 18,
    fontWeight: "bold",
    color: 'white'
  },
  themeContainer: {
    height: width*0.09,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 27,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    borderRadius: 10,
    marginBottom: 18
  },
  themeTitleText: {
    textTransform: 'uppercase'
  },
  candidateDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  propositionTitle: {
      fontSize: width*0.06,
      fontWeight: 'bold',
      marginBottom: 12
  },

  /* Style de la description (HTML) */
  p: {
    fontSize: 20
  }
});

export default styles;
