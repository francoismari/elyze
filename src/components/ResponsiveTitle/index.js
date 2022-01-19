import React from "react";
import { View, Text, Dimensions } from "react-native";
import styles from "./styles";

export default function ResponsiveTitle(props) {
  const title = props.title;

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
  );
}
