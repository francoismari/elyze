import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";

export default function LearnCard(props) {
  const navigation = useNavigation();

  const item = props;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate("Article", {
          title: item.title,
          content: item.articleContent
      })}
    >
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{item.title}</Text>
        <Text style={styles.descriptionText}>{item.description}</Text>
      </View>
      <View>
        <Image style={styles.cardImage} source={item.image} />
      </View>
    </TouchableOpacity>
  );
}
