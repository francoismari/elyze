import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "./styles";
import * as Linking from "expo-linking";

export default function TeamCard(props) {
  const teamProfile = props.profile;

  const handleSocialLink = (username) => {
    const socialURL = "https://instagram.com/" + username;

    Linking.openURL(socialURL);
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleSocialLink(teamProfile.social)}
    >
      <View style={styles.infoContainer}>
        <View style={styles.nameContainer}>
          <Text style={styles.firstName}>{teamProfile.firstName}</Text>
          <Text style={styles.lastName}>{teamProfile.lastName}</Text>
        </View>
        <Text style={styles.roleText}>{teamProfile.role}</Text>
      </View>
      <View style={styles.pictureContainer}>
        <Image style={styles.profileImage} source={teamProfile.imageURI} />
      </View>
    </TouchableOpacity>
  );
}
