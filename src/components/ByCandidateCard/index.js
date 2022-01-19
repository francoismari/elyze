import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";
import { LinearGradient } from "expo-linear-gradient";

export default function ByCandidateCard(props) {
  const navigation = useNavigation();

  const item = props;

  console.log(item);

  return (
    <TouchableOpacity
    style={[styles.container, { backgroundColor: item.bgColor }]}
      onPress={() =>
        navigation.navigate("CandidateProfile", { id: item.idCandidate })
      }
    >
      {/* <LinearGradient
        
        colors={[item.firstLinearColor, item.secondLinearColor]}
        start={{ x: 0.1, y: 0.1 }}
      > */}
        <View style={styles.textContainer}>
          <Text style={styles.firstnameText}>{item.firstname}</Text>
          <Text style={styles.lastnameText}>{item.lastname}</Text>
        </View>
        <View>
          <Image style={styles.cardImage} source={item.image} />
        </View>
      {/* </LinearGradient> */}
    </TouchableOpacity>
  );
}
