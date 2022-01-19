import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

export default function FavoriteCardForCandidates(props) {
  const cardDetails = props.item;

  return (
    <View style={styles.container}>
      <Text style={styles.anecdoteText}>
        {cardDetails.anecdoteEmoji} {cardDetails.anecdoteText}
      </Text>
    </View>
  );
}
