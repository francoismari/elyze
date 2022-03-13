import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Dimensions } from "react-native";
import styles from "./styles";
import {
  FontAwesome5,
  FontAwesome,
  AntDesign,
  Entypo,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import findThemeTitle from "../../../assets/queries/findThemeTitle";

export default function SwipeCard(props) {
  if (props.proposition.id !== undefined) {
    const { articleContent, id, idCandidat, idTheme, title, source } =
      props.proposition;

    const themeRequest = findThemeTitle(idTheme);
    const themeTitle = themeRequest[0].title;
    const themeBackground = themeRequest[0].cardBackground;
    const iconType = themeRequest[0].iconType;
    const iconTitle = themeRequest[0].iconTitle;

    const navigation = useNavigation();

    return (
      <View
        style={{
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.23,
          shadowRadius: 2.62,

          elevation: 4,
          alignSelf: "center",
          marginTop: -40,
        }}
      >
        <View
          style={[
            styles.cardContainer,
            {
              backgroundColor: themeBackground,
            },
          ]}
        >
          <View
            style={[
              styles.topCardInfos,
              {
                backgroundColor: themeBackground,
              },
            ]}
          >
            {iconType == "FontAwesome5" ? (
              <FontAwesome5
                name={iconTitle}
                size={Dimensions.get("window").width * 0.07}
                color={
                  idTheme == 1
                    ? "white"
                    : idTheme == 2
                    ? "white"
                    : idTheme == 3
                    ? "white"
                    : idTheme == 4
                    ? "white"
                    : idTheme == 5
                    ? "#FAFC91"
                    : idTheme == 6
                    ? "white"
                    : idTheme == 7
                    ? "white"
                    : idTheme == 8
                    ? "white"
                    : idTheme == 9
                    ? "white"
                    : idTheme == 10
                    ? "white"
                    : null
                }
              />
            ) : iconType == "FontAwesome" ? (
              <FontAwesome
                name={iconTitle}
                size={Dimensions.get("window").width * 0.07}
                color={
                  idTheme == 1
                    ? "white"
                    : idTheme == 2
                    ? "white"
                    : idTheme == 3
                    ? "white"
                    : idTheme == 4
                    ? "white"
                    : idTheme == 5
                    ? "#FAFC91"
                    : idTheme == 6
                    ? "white"
                    : idTheme == 7
                    ? "white"
                    : idTheme == 8
                    ? "white"
                    : idTheme == 9
                    ? "white"
                    : idTheme == 10
                    ? "white"
                    : null
                }
              />
            ) : iconType == "AntDesign" ? (
              <AntDesign
                name={iconTitle}
                size={Dimensions.get("window").width * 0.07}
                color={
                  idTheme == 1
                    ? "white"
                    : idTheme == 2
                    ? "white"
                    : idTheme == 3
                    ? "white"
                    : idTheme == 4
                    ? "white"
                    : idTheme == 5
                    ? "#FAFC91"
                    : idTheme == 6
                    ? "white"
                    : idTheme == 7
                    ? "white"
                    : idTheme == 8
                    ? "white"
                    : idTheme == 9
                    ? "white"
                    : idTheme == 10
                    ? "white"
                    : null
                }
              />
            ) : iconType == "Entypo" ? (
              <Entypo
                name={iconTitle}
                size={Dimensions.get("window").width * 0.07}
                color={
                  idTheme == 1
                    ? "white"
                    : idTheme == 2
                    ? "white"
                    : idTheme == 3
                    ? "white"
                    : idTheme == 4
                    ? "white"
                    : idTheme == 5
                    ? "#FAFC91"
                    : idTheme == 6
                    ? "white"
                    : idTheme == 7
                    ? "white"
                    : idTheme == 8
                    ? "white"
                    : idTheme == 9
                    ? "white"
                    : idTheme == 10
                    ? "white"
                    : null
                }
              />
            ) : iconType == "MaterialCommunityIcons" ? (
              <MaterialCommunityIcons
                name={iconTitle}
                size={Dimensions.get("window").width * 0.07}
                color={
                  idTheme == 1
                    ? "white"
                    : idTheme == 2
                    ? "white"
                    : idTheme == 3
                    ? "white"
                    : idTheme == 4
                    ? "white"
                    : idTheme == 5
                    ? "#FAFC91"
                    : idTheme == 6
                    ? "white"
                    : idTheme == 7
                    ? "white"
                    : idTheme == 8
                    ? "white"
                    : idTheme == 9
                    ? "white"
                    : idTheme == 10
                    ? "white"
                    : null
                }
              />
            ) : iconType == "MaterialIcons" ? (
              <MaterialIcons
                name={iconTitle}
                size={Dimensions.get("window").width * 0.07}
                color={
                  idTheme == 1
                    ? "white"
                    : idTheme == 2
                    ? "white"
                    : idTheme == 3
                    ? "white"
                    : idTheme == 4
                    ? "white"
                    : idTheme == 5
                    ? "#FAFC91"
                    : idTheme == 6
                    ? "white"
                    : idTheme == 7
                    ? "white"
                    : idTheme == 8
                    ? "white"
                    : idTheme == 9
                    ? "white"
                    : idTheme == 10
                    ? "white"
                    : null
                }
              />
            ) : null}
            <View
              style={[
                styles.themeInfoContainer,
                {
                  backgroundColor:
                    idTheme == 1
                      ? "white"
                      : idTheme == 2
                      ? "white"
                      : idTheme == 3
                      ? "white"
                      : idTheme == 4
                      ? "white"
                      : idTheme == 5
                      ? "#FAFC91"
                      : idTheme == 6
                      ? "white"
                      : idTheme == 7
                      ? "white"
                      : idTheme == 8
                      ? "white"
                      : idTheme == 9
                      ? "white"
                      : idTheme == 10
                      ? "white"
                      : null,
                },
              ]}
            >
              <Text
                style={[
                  styles.themeText,
                  {
                    color: themeBackground,
                    textTransform: "uppercase",
                  },
                ]}
              >
                {themeTitle}
              </Text>
            </View>
          </View>
          <View
            style={[
              styles.questionContainer,
              {
                backgroundColor: themeBackground,
              },
            ]}
          >
            <Text
              style={[
                styles.questionText,
                {
                  color:
                    idTheme == 1
                      ? "white"
                      : idTheme == 2
                      ? "white"
                      : idTheme == 3
                      ? "white"
                      : idTheme == 4
                      ? "white"
                      : idTheme == 5
                      ? "#FAFC91"
                      : idTheme == 6
                      ? "white"
                      : idTheme == 7
                      ? "white"
                      : idTheme == 8
                      ? "white"
                      : idTheme == 9
                      ? "white"
                      : idTheme == 10
                      ? "white"
                      : null,
                },
              ]}
            >
              {title}
            </Text>
          </View>
          <View style={styles.bottomCardInfos}>
            {/* Bouton "en savoir plus" */}
            <TouchableOpacity
              style={styles.learnMoreButton}
              onPress={() =>
                navigation.navigate("PropositionDetails", {
                  title: title,
                  theme: idTheme,
                  articleContent: articleContent,
                  idCandidat: idCandidat,
                  source: source,
                  id: id,
                })
              }
            >
              <FontAwesome5 name={"plus"} size={18} color={"#707AD7"} />
              <Text style={styles.learnMoreText}>EN SAVOIR PLUS</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  } else {
    return null;
  }
}
