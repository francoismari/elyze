import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import HTMLView from "react-native-htmlview";
import findCandidateDetails from "../../../assets/queries/findCandidateDetails";
import findThemeTitle from "../../../assets/queries/findThemeTitle";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { AsyncStorage } from "@aws-amplify/core";

export default function PropositionDetails({ route }) {
  const allPropositionDetails = route.params;

  const navigation = useNavigation();

  const [candidatInfo, setCandidatInfo] = useState([]);
  const [themeInfo, setThemeInfo] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const candidateDetails = findCandidateDetails(
      allPropositionDetails.idCandidat
    );
    setCandidatInfo(candidateDetails);

    const themeDetails = findThemeTitle(allPropositionDetails.theme);
    setThemeInfo(themeDetails);

    setLoaded(true);

    console.log(themeInfo);
  }, []);

  useEffect(async () => {
    // Vérifier si la proposition est déjà ajoutée en favoris
    await AsyncStorage.getItem("@favoritesPropositions").then((res) => {
      var currentFavoritesPropositions = JSON.parse(res);
      if (currentFavoritesPropositions.includes(allPropositionDetails.id)) {
        setIsFavorite(true);
      } else {
        setIsFavorite(false);
      }
    });
  }, []);

  const addPropositionToFavorites = async () => {
    // Ajouter aux favoris
    try {
      await AsyncStorage.getItem("@favoritesPropositions").then(async (res) => {
        // Retirer des favoris
        if (isFavorite) {
          // On retire la proposition des propositions favorites
          var currentFavorites = JSON.parse(res);

          currentFavorites = currentFavorites.filter(
            (e) => e !== allPropositionDetails.id
          );
          currentFavorites = JSON.stringify(currentFavorites);

          await AsyncStorage.setItem(
            "@favoritesPropositions",
            currentFavorites
          ).then(() => {
            console.log("Proposition retirée des favoris");
            setIsFavorite(false);
          });
        } else {
          // Si c'est la première proposition ajoutée au favoris

          if (res == null) {
            var newFavoriteArray = [allPropositionDetails.id];
            newFavoriteArray = JSON.stringify(newFavoriteArray);

            await AsyncStorage.setItem(
              "@favoritesPropositions",
              newFavoriteArray
            ).then(() => {
              console.log("Première proposition ajoutée aux favoris");
              setIsFavorite(true);
            });
          } else {
            console.log(allPropositionDetails);
            var currentFavorites = JSON.parse(res);
            var newFavoriteArray = [
              ...currentFavorites,
              allPropositionDetails.id,
            ];

            newFavoriteArray = JSON.stringify(newFavoriteArray);

            try {
              await AsyncStorage.setItem(
                "@favoritesPropositions",
                newFavoriteArray
              ).then(() => {
                console.log("Proposition ajoutée aux favoris");
                setIsFavorite(true);
              });
            } catch (e) {
              console.log(e);
            }
          }
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  if (loaded) {
    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <View
            style={[
              styles.themeContainer,
              {
                backgroundColor: themeInfo[0].lightColor,
                // width: themeInfo[0].title.length * 11,
              },
            ]}
          >
            <Text style={[styles.themeTitleText]}>{themeInfo[0].title}</Text>
          </View>

          <TouchableOpacity
            onPress={() => addPropositionToFavorites()}
            style={[
              styles.addToFavoriteButton,
              {
                backgroundColor: isFavorite ? themeInfo[0].lightColor : null,
                borderWidth: isFavorite ? 0 : 2,
                borderColor: themeInfo[0].lightColor,
              },
            ]}
          >
            <AntDesign
              name={"star"}
              size={20}
              color={isFavorite ? "white" : themeInfo[0].lightColor}
            />
          </TouchableOpacity>
        </View>

        {allPropositionDetails.showCandidateInfo ? (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("CandidateProfile", {
                id: allPropositionDetails.idCandidat,
              })
            }
            style={styles.candidateDetailsContainer}
          >
            <View>
              <Image
                source={candidatInfo[0].imageProfile}
                style={{ height: 35, width: 35, borderRadius: 35 }}
              />
            </View>
            <Text style={{ marginLeft: 10, fontSize: 20 }}>
              {candidatInfo[0].firstname} {candidatInfo[0].lastname}
            </Text>
          </TouchableOpacity>
        ) : null}
        <Text style={styles.propositionTitle}>
          {allPropositionDetails.title}
        </Text>
        <ScrollView
          style={{ marginBottom: 45 }}
          showsVerticalScrollIndicator={false}
        >
          <HTMLView
            value={`<p>${allPropositionDetails.articleContent}</p>`}
            stylesheet={styles}
          />
          {allPropositionDetails.source ? (
            <Text style={{ marginTop: 20, fontSize: 18, marginBottom: 10 }}>
              Sources : {allPropositionDetails.source}
            </Text>
          ) : null}
        </ScrollView>
        <TouchableOpacity
          style={[
            styles.closeButton,
            { backgroundColor: themeInfo[0].lightColor },
          ]}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.closeModalText}>FERMER</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{ marginTop: 300, alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
}
