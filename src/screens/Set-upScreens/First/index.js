import { View, Text, Image, Dimensions } from "react-native";
import React from "react";

export default function FirstScreen() {
  return (
    <View style={{ justifyContent: "center", alignItems: "center" }}>
      <Image
        style={{
          height: Dimensions.get("window").width * 0.15,
          marginBottom: -25,
          resizeMode: "contain",
        }}
        source={require("../../../../assets/images/set-up/logo-simple.png")}
      />
      <Text
        style={{
          marginTop: Dimensions.get("window").width * 0.09,
          fontSize: Dimensions.get("window").width * 0.08,
          marginHorizontal: 30,
          color: "white",
          fontWeight: "bold",
          marginBottom: Dimensions.get("window").width * 0.08,
          textAlign: "center",
        }}
      >
        Bienvenue sur <Text style={{fontStyle: 'italic'}}>ELYZE</Text>
      </Text>
      <Image
        style={{
          height: Dimensions.get("window").width * 0.62,
          resizeMode: "contain",
        }}
        source={require("../../../../assets/images/set-up/step-1.png")}
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
        Juge les propositions et découvre le candidat fait pour toi
      </Text>
    </View>
  );
}
