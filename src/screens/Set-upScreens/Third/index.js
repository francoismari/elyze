import { View, Text, Image, Dimensions } from "react-native";
import React from "react";

export default function ThirdScreen() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          marginTop: Dimensions.get("window").width * 0.09,
          fontSize: Dimensions.get("window").width * 0.08,
          marginHorizontal: 30,
          color: "white",
          fontWeight: "bold",
          marginBottom: 10,
          textAlign: "center",
        }}
      >
        🗳
      </Text>
      <Text
        style={{
          fontSize: Dimensions.get("window").width * 0.08,
          marginHorizontal: 30,
          color: "white",
          fontWeight: "bold",
          marginBottom: Dimensions.get("window").width * 0.08,
          textAlign: "center",
        }}
      >
        Découvre les propositions
      </Text>
      <Image
        style={{
          height: Dimensions.get("window").width * 0.7,
          resizeMode: "contain",
        }}
        source={require("../../../../assets/images/set-up/step-3.png")}
      />
      <Text
        style={{
          marginHorizontal: 45,
          textAlign: "center",
          color: "white",
          fontSize: Dimensions.get("window").width * 0.06,
          marginBottom: 50,
          fontWeight: "500",
          marginTop: Dimensions.get("window").width * 0.08,
        }}
      >
        Explore l'ensemble des propositions, par thème et par candidat
      </Text>
    </View>
  );
}
