import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import BackButton from "../../components/backButton";
import React, { useEffect, useState } from "react";
import PropositionListCard from "../../components/PropositionListCard";

import styles from "./styles";
import { AsyncStorage } from "@aws-amplify/core";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import firstPropositions from "../../../assets/data/propositions/firstPropositions";
import propositionsList from "../../../assets/data/propositions/propositionsList";

export default function FavoritesPropositions() {
  const navigation = useNavigation();

  const [favoritesPropositions, setFavoritePropositions] = useState([]);

  const [reRenderList, setReRenderList] = useState(0);

  const isFocused = useIsFocused();

  useEffect(async () => {
    // await AsyncStorage.removeItem("@favoritesPropositions");

    try {
      await AsyncStorage.getItem("@favoritesPropositions").then((res) => {
        const favoriteProps = JSON.parse(res);

        if (favoriteProps !== null) {
          setFavoritePropositions(favoriteProps);
        } else {
          return null;
        }
      });
    } catch (e) {
      Alert.alert(
        "Oups",
        "Une erreur est survenue lors de la récupération des propositions"
      );
    }
  }, [isFocused, reRenderList]);

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <BackButton />
        <View style={{ marginTop: 65 }}>
          <Text style={styles.titleText}>Propositions favorites</Text>
        </View>
      </SafeAreaView>

      {favoritesPropositions.length == 0 ? (
        <View>
          <Text style={styles.noPropositionText}>
            Aucune proposition favorite
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={favoritesPropositions}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
            // ListFooterComponent={() => (
            //   <TouchableOpacity
            //     onPress={async () => {
            //       await AsyncStorage.setItem("@favoritesPropositions", "").then(
            //         () => setReRenderList(reRenderList + 1)
            //       );
            //     }}
            //     style={styles.resetFavoritesContainer}
            //   >
            //     <Text style={styles.resetFavoritesText}>
            //       Réinitialiser mes favoris
            //     </Text>
            //   </TouchableOpacity>
            // )}
            renderItem={({ item }) => {
              var allPropositions = firstPropositions.concat(propositionsList);
              const propositionDetails = allPropositions.find(
                (proposition) => proposition.id == item
              );

              console.log("Proposition favorite : ", propositionDetails);

              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PropositionDetails", {
                      id: propositionDetails.id,
                      title: propositionDetails.title,
                      theme: propositionDetails.idTheme,
                      articleContent: propositionDetails.articleContent,
                      idCandidat: propositionDetails.idCandidat,
                      source: propositionDetails.source,
                      showCandidateInfo: true,
                    })
                  }
                  style={[
                    styles.container,
                    { height: item.showCandidateName !== false ? 100 : 80 },
                  ]}
                >
                  <PropositionListCard proposition={propositionDetails} />
                </TouchableOpacity>
              );
            }}
          />
        </View>
      )}
    </View>
  );
}
