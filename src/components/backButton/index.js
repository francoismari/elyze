import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Entypo } from "@expo/vector-icons";
import colors from "../../../assets/colors/colors";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";

export default function BackButton() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.backButtonContainer}
      onPress={() => navigation.goBack()}
    >
      <Entypo name={"chevron-left"} size={27} color={"white"} />
    </TouchableOpacity>
  );
}
