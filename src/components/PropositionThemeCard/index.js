import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import styles from "./styles";
import {
  FontAwesome5,
  FontAwesome,
  MaterialCommunityIcons,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";

export default function PropositionThemeCard(props) {
  const navigation = useNavigation();

  const cardThemeInfo = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.cardThemeContainer,
          { backgroundColor: cardThemeInfo.bgColor },
        ]}
        onPress={() =>
          navigation.navigate("ListPropositions", {
            title: cardThemeInfo.title,
            themeID: cardThemeInfo.themeID,
          })
        }
      >
        <Text style={styles.themeTitleText}>{cardThemeInfo.title}</Text>
        {/* Overflow: hidden */}
        {cardThemeInfo.iconType === "MaterialCommunityIcons" ? (
          <MaterialCommunityIcons
            style={styles.cardIcon}
            name={cardThemeInfo.icon}
            size={110}
            color={cardThemeInfo.iconColor}
          />
        ) : cardThemeInfo.iconType === "FontAwesome5" ? (
          <FontAwesome5
            style={styles.cardIcon}
            name={cardThemeInfo.icon}
            size={110}
            color={cardThemeInfo.iconColor}
          />
        ) : cardThemeInfo.iconType === "FontAwesome" ? (
          <FontAwesome
            style={styles.cardIcon}
            name={cardThemeInfo.icon}
            size={110}
            color={cardThemeInfo.iconColor}
          />
        ) : cardThemeInfo.iconType === "MaterialIcons" ? (
          <MaterialIcons
            style={styles.cardIcon}
            name={cardThemeInfo.icon}
            size={110}
            color={cardThemeInfo.iconColor}
          />
        ) : cardThemeInfo.iconType === "Entypo" ? (
          <Entypo
            style={styles.cardIcon}
            name={cardThemeInfo.icon}
            size={110}
            color={cardThemeInfo.iconColor}
          />
        ) : null}
      </TouchableOpacity>
    </View>
  );
}
