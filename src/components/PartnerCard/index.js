import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image, Linking } from "react-native";

import styles from "./styles";

export default function PartnerCard(props) {
  const navigation = useNavigation();

  const partnerInfo = props;

  return (
    <TouchableOpacity style={styles.container} onPress={() => Linking.openURL(partnerInfo.websiteLink)}>
      <View style={styles.imageContainer}>
        <Image style={styles.cardImage} source={partnerInfo.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{partnerInfo.name}</Text>
        <Text style={styles.descriptionText}>{partnerInfo.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
