import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  FontAwesome5,
  FontAwesome,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import styles from "./styles";

export default function ThemeCard(props) {
  const navigation = useNavigation();
  const item = props.theme;

  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor: item.lightColor }]}
      onPress={() =>
        navigation.navigate("ListPropositions", {
          title: item.title,
          themeID: item.id,
        })
      }
    >
      <Text style={styles.textTitle} numberOfLines={2}>
        {item.title}
      </Text>
      <View style={{ marginTop: 30, marginRight: 25 }}>
        {/* Mettre un émoji en rapport avec le thème ? */}
        {item.iconType == "MaterialCommunityIcons" ? (
          <MaterialCommunityIcons
            color={item.darkColor}
            name={item.iconTitle}
            size={80}
          />
        ) : item.iconType == "FontAwesome" ? (
          <FontAwesome
            color={item.darkColor}
            name={item.iconTitle}
            size={80}
          />
        ) : item.iconType == "FontAwesome5" ? (
          <FontAwesome5
            color={item.darkColor}
            name={item.iconTitle}
            size={80}
          />
        ) : item.iconType == "MaterialIcons" ? (
          <MaterialIcons
            color={item.darkColor}
            name={item.iconTitle}
            size={80}
          />
        ) : item.iconType == "Entypo" ? (
          <Entypo color={item.darkColor} name={item.iconTitle} size={100} />
        ) : null}
      </View>
    </TouchableOpacity>
  );
}
