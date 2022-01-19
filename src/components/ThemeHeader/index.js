import React from "react";
import { View, Text, Dimensions } from "react-native";
import BackButton from "../backButton";
import styles from "./styles";
import {
  FontAwesome5,
  MaterialCommunityIcons,
  FontAwesome,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";

export default function ThemeHeader(props) {
  const themeDetails = props;

  return (
    <View style={[styles.header, { backgroundColor: themeDetails.lightColor }]}>
      <BackButton />
      <View style={styles.headerTextAndIconContainer}>
        <View style={{ marginTop: Dimensions.get("window").height * 0.13 }}>
          <Text
            style={{
              marginLeft: 20,
              marginBottom: 10,
              fontSize: Dimensions.get("window").height * 0.045,
              fontWeight: "bold",
              color: "white",
              width: Dimensions.get("window").width * 0.6,
            }}
            numberOfLines={1}
          >
            {themeDetails.title}
          </Text>
        </View>
        <View style={{ marginTop: 40 }}>
          {/* Mettre un émoji en rapport avec le thème ? */}
          {themeDetails.iconType == "MaterialCommunityIcons" ? (
            <MaterialCommunityIcons
              color={themeDetails.darkColor}
              name={themeDetails.iconTitle}
              size={170}
            />
          ) : themeDetails.iconType == "FontAwesome" ? (
            <FontAwesome
              color={themeDetails.darkColor}
              name={themeDetails.iconTitle}
              size={170}
            />
          ) : themeDetails.iconType == "FontAwesome5" ? (
            <FontAwesome5
              color={themeDetails.darkColor}
              name={themeDetails.iconTitle}
              size={170}
            />
          ) : themeDetails.iconType == "MaterialIcons" ? (
            <MaterialIcons
              color={themeDetails.darkColor}
              name={themeDetails.iconTitle}
              size={170}
            />
          ) : themeDetails.iconType == "Entypo" ? (
            <Entypo
              color={themeDetails.darkColor}
              name={themeDetails.iconTitle}
              size={170}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}
