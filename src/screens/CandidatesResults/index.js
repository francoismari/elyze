import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import PropositionListCard from "../../components/PropositionListCard";
import styles from "./styles";
import getPropositionDetails from "../../../assets/queries/getPropositionDetails";

import firstPropositions from "../../../assets/data/propositions/firstPropositions";
import propositionsList from "../../../assets/data/propositions/propositionsList";

var allPropositions = firstPropositions.concat(propositionsList);

export default function CandidatesResults({ route }) {
  const candidateInfo = route.params;

  // console.log(candidateInfo);

  const navigation = useNavigation();

  const [likedPropositions, setLikedPropositions] = useState([]);
  const [dislikedPropositions, setDislikedPropositions] = useState([]);
  const [superLikedPropositions, setSuperLikedPropositions] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [viewIndex, setViewIndex] = useState(1);

  useEffect(async () => {
    const likeListVariable = "@likeListCandidate_" + candidateInfo.id;
    const dislikeListVariable = "@dislikeListCandidate_" + candidateInfo.id;
    const superLikeListVariable = "@superLikeListCandidate_" + candidateInfo.id;

    // On récupère les propositions likées du candidat
    try {
      await AsyncStorage.getItem(likeListVariable).then(async (response) => {
        var likeListByCandidate = JSON.parse(response);

        let finalPropositionsLiked = [...new Set(likeListByCandidate)];

        console.log("Propositions likées : ", finalPropositionsLiked);

        setLikedPropositions(finalPropositionsLiked);

        // On récupère les propositions dislikées du candidat
        await AsyncStorage.getItem(dislikeListVariable).then(
          async (response) => {
            // console.log(response);
            var dislikeListByCandidate = JSON.parse(response);

            let finalPropositionsDisliked = [
              ...new Set(dislikeListByCandidate),
            ];
            console.log("Propositions dislikées : ", finalPropositionsDisliked);

            setDislikedPropositions(finalPropositionsDisliked);

            await AsyncStorage.getItem(superLikeListVariable).then(
              (response) => {
                // console.log(response);
                var superLikeListByCandidate = JSON.parse(response);

                let finalPropositionsSuperLiked = [
                  ...new Set(superLikeListByCandidate),
                ];
                console.log(
                  "Propositions super-likées : ",
                  finalPropositionsSuperLiked
                );

                setSuperLikedPropositions(finalPropositionsSuperLiked);

                setLoaded(true);
              }
            );
          }
        );
      });
    } catch (e) {
      console.log(
        "Erreur lors de la récupération des propositions likées : ",
        e
      );
    }
  }, []);

  // console.log('Propositions likées : ', likedPropositions);

  if (loaded) {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: candidateInfo.bgColor }}>
          <Text
            style={{
              paddingHorizontal: 20,
              paddingTop: Dimensions.get("window").height * 0.06,
              paddingBottom: 10,
              color: "white",
              fontWeight: "bold",
              fontSize: Dimensions.get("window").width * 0.085,
            }}
          >
            {candidateInfo.firstname} {candidateInfo.lastname}
          </Text>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              onPress={() => setViewIndex(1)}
              style={[
                styles.menuItemContainer,
                {
                  marginLeft: 5,
                  backgroundColor:
                    viewIndex == 1 ? candidateInfo.bgColor : "white",
                },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: viewIndex == 1 ? "white" : candidateInfo.bgColor,
                  fontSize: 20,
                }}
              >
                👍 ({likedPropositions.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setViewIndex(3)}
              style={[
                styles.menuItemContainer,
                {
                  marginLeft: 5,
                  backgroundColor:
                    viewIndex == 3 ? candidateInfo.bgColor : "white",
                },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: viewIndex == 3 ? "white" : candidateInfo.bgColor,
                  fontSize: 20,
                }}
              >
                🤩 ({superLikedPropositions.length})
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setViewIndex(2)}
              style={[
                styles.menuItemContainer,
                {
                  marginLeft: 5,
                  marginRight: 5,
                  backgroundColor:
                    viewIndex == 2 ? candidateInfo.bgColor : "white",
                },
              ]}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: viewIndex == 2 ? "white" : candidateInfo.bgColor,
                  fontSize: 20,
                }}
              >
                👎 ({dislikedPropositions.length})
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {viewIndex == 1 ? (
          <View style={{ flex: 1 }}>
            {likedPropositions.length > 0 ? (
              <FlatList
                style={{ marginBottom: 90 }}
                data={likedPropositions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const propositionDetails = allPropositions.find(
                    (proposition) => proposition.id == item
                  );

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
            ) : (
              <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Aucune proposition likée
                </Text>
              </View>
            )}
          </View>
        ) : viewIndex == 2 ? (
          <View style={{ flex: 1 }}>
            {dislikedPropositions.length > 0 ? (
              <FlatList
                style={{ marginBottom: 90 }}
                data={dislikedPropositions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const propositionDetails = allPropositions.find(
                    (proposition) => proposition.id == item
                  );

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
            ) : (
              <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Aucune proposition dislikée
                </Text>
              </View>
            )}
          </View>
        ) : viewIndex == 3 ? (
          <View style={{ flex: 1 }}>
            {superLikedPropositions.length > 0 ? (
              <FlatList
                style={{ marginBottom: 90 }}
                data={superLikedPropositions}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => {
                  const propositionDetails = allPropositions.find(
                    (proposition) => proposition.id == item
                  );

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
            ) : (
              <View style={{ flex: 1, alignItems: "center", marginTop: 50 }}>
                <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                  Aucune proposition super-likée
                </Text>
              </View>
            )}
          </View>
        ) : null}

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[
            styles.closeButton,
            { backgroundColor: candidateInfo.bgColor },
          ]}
        >
          <Text style={styles.closeButtonText}>Fermer</Text>
        </TouchableOpacity>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
}
