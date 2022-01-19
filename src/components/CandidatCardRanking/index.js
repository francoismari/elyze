import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./styles";

export default function CandidatCardRanking(props) {

    const {indexRanking, name, pourcentage, image} = props;

  return (
    <View style={styles.container}>
      <View style={styles.candidatNameContainer}>
        <View style={styles.candidatRankingContainer}>
          <Text style={styles.hashtagText}>#</Text>
          <Text style={styles.rankingText}>{indexRanking}</Text>
        </View>
        <Text style={styles.candidateNameText}>{name}</Text>
      </View>
      <View style={styles.bottomCardContainer}>
          <Text style={styles.proportionText}>D'accord avec {pourcentage}% des propositions</Text>
            <Image source={image} style={styles.candidateImage} />
      </View>
    </View>
  );
}
