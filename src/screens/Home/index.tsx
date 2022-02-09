import React, { createRef, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Swiper from "react-native-deck-swiper";

import { Root, Popup } from "react-native-popup-confirm-toast";

import { API, graphqlOperation } from "aws-amplify";

import SwipeCard from "../../components/SwipeCard";

import { FontAwesome, Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import colors from "../../../assets/colors/colors";
import { useNavigation } from "@react-navigation/core";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import resetData from "../../../assets/queries/resetData";
import { getPropositions, usePropositions } from "./usePropositions";
import { RootStackParamList } from "../../types/navigation";
import { StackNavigationProp } from "@react-navigation/stack";

const swipeRef = createRef();

export default function Levels() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [index, setIndex] = useState(0);

  const [showNotConnectedText, setShowNotConnectedText] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const [finalPropositionsToShow, setFinalPropositionsToShow] = useState([]);

  const [numberOfPropsSwiped, setNumberOfPropsSwiped] = useState(0);

  const [isEnded, setIsEnded] = useState(false);

  // Si l'utilisateur a renseigné ses données dans une version précédente, alors elles sont supprimées au démarrage de la nouvelle version
  useEffect(() => {
    (async () => {
      await AsyncStorage.getItem("@idUser").then(async (res) => {
        const resetUserInfoRequest =
          `mutation resetUserInfo {
        updateUserInfo(input: {id: "` +
          res +
          `", monthBirth: 0, postalCode: "null", willVoteFor: "null", haveVotedFor: "null", haveVoted: 0, genre: 0, dayBirth: 0, yearBirth: 0}) {id}
      }`;
        console.log("Données réinitialisées");

        try {
          await API.graphql(graphqlOperation(resetUserInfoRequest));
        } catch (e) {
          console.log(
            "Impossible de réinitialiser les données de l'utilisateur : ",
            e
          );
        }
      });
    })();
  }, []);

  // Fonction pour rendre la position des propositions aléatoire
  function shuffle(array) {
    let currentIndexForShuffle = array.length,
      randomIndex;

    while (currentIndexForShuffle != 0) {
      randomIndex = Math.floor(Math.random() * currentIndexForShuffle);
      currentIndexForShuffle--;

      [array[currentIndexForShuffle], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndexForShuffle],
      ];
    }

    return array;
  }

  const {
    propositions,
    setPropositions,
    firstPropositionsToShow,
    isConnectedToInternet,
  } = usePropositions();

  useEffect(() => {
    (async () => {
      if (propositions.length > 0) {
        // Filtrer les propositions qui ont déjà été passées

        try {
          var passedPropsIDRequest = await AsyncStorage.getItem(
            "@passed_propositions"
          ); // pour que ce soit égal à "null" pour l'instant
          passedPropsIDRequest = JSON.parse(passedPropsIDRequest);

          if (passedPropsIDRequest == "null" || passedPropsIDRequest == null) {
            // Si il n'y aucune propositions passées

            // console.log(firstPropositionsToShow);

            var newPropsList = shuffle(propositions);
            newPropsList.push.apply(newPropsList, firstPropositionsToShow);
            newPropsList.reverse();

            setFinalPropositionsToShow(newPropsList);
            setLoaded(true);
          } else {
            console.log(
              "Nb de propositions passées: ",
              passedPropsIDRequest.length
            );

            // Si beaucoup de propositions passées -> Afficher l'écran de fin
            if (passedPropsIDRequest.length >= 400) {
              setIsEnded(true);
              setLoaded(true);
            } else {
              // On enlève les propositions qui sont déjà passées
              const newPropositionsToShow = propositions.filter(
                ({ id }) => !passedPropsIDRequest.includes(id)
              );

              var newPropsList = shuffle(newPropositionsToShow);

              // console.log(newPropsList);

              setFinalPropositionsToShow(newPropsList);
              setLoaded(true);
            }
          }
        } catch (e) {
          console.log("Erreur: ", e);
        }
      }
    })();
  }, [propositions]);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.getItem("@passed_propositions").then((response) => {
          const arrayPassedPropositionNumber = JSON.parse(response);
          if (arrayPassedPropositionNumber !== null) {
            setNumberOfPropsSwiped(arrayPassedPropositionNumber.length);
          } else {
            setNumberOfPropsSwiped(0);
          }
        });
      } catch (e) {
        console.log(e);
      }
    })();
  }, [index]);

  const storePassedPropositions = async (idNewPassedProposition: string) => {
    try {
      var currentPassedPropositions = await AsyncStorage.getItem(
        "@passed_propositions"
      );
      if (currentPassedPropositions !== null) {
        // si il y a déjà des propositon passées -> ajouter la nouvelle dans '@passed_propositions'
        currentPassedPropositions = JSON.parse(currentPassedPropositions);

        // Nouveau tableau avec les propositions déjà passées
        var newCurrentPassedPropositions = [
          ...currentPassedPropositions,
          idNewPassedProposition,
        ];
        newCurrentPassedPropositions = JSON.stringify(
          newCurrentPassedPropositions
        );

        // On met à jour la variable qui contient toutes les propositions déjà passées
        try {
          await AsyncStorage.setItem(
            "@passed_propositions",
            newCurrentPassedPropositions
          );
        } catch (e) {
          console.log(e);
        }
      } else {
        // Si il n'y a aucune proposition passée -> créer un objet avec la proposition et l'ajouter à '@passed_propositions'
        var firstPropositionPassed = [];
        firstPropositionPassed.push(idNewPassedProposition);
        firstPropositionPassed = JSON.stringify(firstPropositionPassed);
        try {
          await AsyncStorage.setItem(
            "@passed_propositions",
            firstPropositionPassed
          ).then(() =>
            console.log("Premier élement ajouté : ", firstPropositionPassed)
          );
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onSwiped = (index) => {
    storePassedPropositions(propositions[index].id);

    setIndex((index + 1) % propositions.length);
  };

  const toggleLike = async (index: number) => {
    const candidateId = finalPropositionsToShow[index].idCandidat;
    const propositionIDForList = finalPropositionsToShow[index].id;

    // 1. On récupère le score du candidat en question
    try {
      const candidateVariable = "@score_candidat_" + candidateId;

      const dislikeCandidateVariable = "@scoreDislike_candidat_" + candidateId;

      var currentCandidateScore = await AsyncStorage.getItem(candidateVariable);
      var currentDislikeCandidateScore = await AsyncStorage.getItem(
        dislikeCandidateVariable
      ).then((value) => {
        if (value) {
          return parseInt(value);
        }
        return 0;
      });

      // Set sur 0 le nombre de like si elle n'est pas définit
      if (
        currentDislikeCandidateScore == null ||
        isNaN(currentDislikeCandidateScore)
      ) {
        try {
          await AsyncStorage.setItem(dislikeCandidateVariable, "0").then(() =>
            console.log(
              "Nombre de dislike mis à jour pour ",
              dislikeCandidateVariable
            )
          );
        } catch (e) {
          console.log(e);
        }
      }

      if (currentCandidateScore !== null) {
        // Si !== null (>0) -> convertir en Int, ajouter 1, reconvertir en String
        const intScore = parseInt(currentCandidateScore);
        const newScore = intScore + 1;

        console.log("On augmente de 1 point le score du candidat :", newScore);

        await AsyncStorage.setItem(candidateVariable, newScore.toString());
      } else {
        // Si le candidat n'a aucun point (=null) -> setItem sur 1)
        try {
          await AsyncStorage.setItem(candidateVariable, "1").then(() =>
            console.log("On met sur 1 le nombre de like ", candidateVariable)
          );
        } catch (e) {
          console.log("Erreur pour mettre à jour le 1er score : ", e);
        }
      }
    } catch (e) {
      console.log("Impossible de récupérer le score du candidat", e);
    }

    // On ajoute l'id de cette proposition au tableau qui recense tous les 'likes' pour ce candidat
    try {
      const likeListForCandidateVariable = "@likeListCandidate_" + candidateId;

      var currentLikeListForCandidate = await AsyncStorage.getItem(
        likeListForCandidateVariable
      );

      console.log(currentLikeListForCandidate);

      if (currentLikeListForCandidate !== null) {
        // On ajoute cette proposition dans la liste des propositions likées
        currentLikeListForCandidate = JSON.parse(currentLikeListForCandidate);

        var newLikeListForCandidate: string[] = [
          ...currentLikeListForCandidate,
          propositionIDForList,
        ];
        const newLikeListForCandidateStringified = JSON.stringify(
          newLikeListForCandidate
        );

        // console.log("Liste des likes mise à jour : ", newLikeListForCandidate);

        try {
          await AsyncStorage.setItem(
            likeListForCandidateVariable,
            newLikeListForCandidateStringified
          );
        } catch (e) {
          console.log(e);
        }
      } else {
        // Si il n'y a aucun like passée
        var firstLikeList = [];
        firstLikeList.push(propositionIDForList);
        const firstLikeListStringified = JSON.stringify(firstLikeList);
        try {
          await AsyncStorage.setItem(
            likeListForCandidateVariable,
            firstLikeListStringified
          ).then(() =>
            console.log("Liste des likes mise à jour : ", firstLikeList)
          );
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(
        "Erreur lors de la récupération de la liste des propositions likées : ",
        e
      );
    }
  };

  const toggleDislike = async (index) => {
    const candidateId = finalPropositionsToShow[index].idCandidat;
    const propositionIDForList = finalPropositionsToShow[index].id;

    // 1. On récupère le nombre de dislikes du candidat en question
    try {
      const dislikeCandidateVariable = "@scoreDislike_candidat_" + candidateId;

      const likeCandidateVariable = "@score_candidat_" + candidateId;

      var currentCandidateDislike = await AsyncStorage.getItem(
        dislikeCandidateVariable
      );
      var currentCandidateLike = await AsyncStorage.getItem(
        likeCandidateVariable
      ).then((value) => {
        if (value) {
          return parseInt(value);
        }
        return 0;
      });

      console.log(
        "Nb de likes pour le candidat (action dislike) : ",
        currentCandidateLike
      );

      // Set sur 0 le nombre de like si elle n'est pas définit
      if (currentCandidateLike == null || isNaN(currentCandidateLike)) {
        try {
          await AsyncStorage.setItem(likeCandidateVariable, "0").then(() =>
            console.log(
              "Nombre de likes mis à jour pour ",
              likeCandidateVariable
            )
          );
        } catch (e) {
          console.log(e);
        }
      }

      if (currentCandidateDislike !== null) {
        // Si !== null (>0) -> convertir en Int, ajouter 1, reconvertir en String
        const intScore = parseInt(currentCandidateDislike);
        const newScore = intScore + 1;

        console.log(
          "On augmente de 1 point le nb de dislike du candidat :",
          newScore
        );

        await AsyncStorage.setItem(
          dislikeCandidateVariable,
          newScore.toString()
        );
      } else {
        // Si le candidat n'a aucun point (=null) -> setItem sur 1)
        try {
          await AsyncStorage.setItem(dislikeCandidateVariable, "1").then(() =>
            console.log(
              "On set sur 1 le nombre de dislike ",
              dislikeCandidateVariable
            )
          );
        } catch (e) {
          console.log("Erreur pour mettre à jour le 1er score : ", e);
        }
      }
    } catch (e) {
      console.log("Impossible de récupérer le score du candidat", e);
    }

    // On ajoute l'id de cette proposition au tableau qui recense tous les 'likes' pour ce candidat
    try {
      const dislikeListForCandidateVariable =
        "@dislikeListCandidate_" + candidateId;

      var currentDislikeListForCandidate = await AsyncStorage.getItem(
        dislikeListForCandidateVariable
      );

      if (currentDislikeListForCandidate !== null) {
        // On ajoute cette proposition dans la liste des propositions likées
        currentDislikeListForCandidate = JSON.parse(
          currentDislikeListForCandidate
        );

        var newDislikeListForCandidate = [
          ...currentDislikeListForCandidate,
          propositionIDForList,
        ];
        newDislikeListForCandidate = JSON.stringify(newDislikeListForCandidate);

        try {
          await AsyncStorage.setItem(
            dislikeListForCandidateVariable,
            newDislikeListForCandidate
          );
        } catch (e) {
          console.log(e);
        }
      } else {
        // Si il n'y a aucun like passée
        var firstDislikeList = [];
        firstDislikeList.push(propositionIDForList);
        firstDislikeList = JSON.stringify(firstDislikeList);
        try {
          await AsyncStorage.setItem(
            dislikeListForCandidateVariable,
            firstDislikeList
          ).then(() =>
            console.log("Liste des dislikes mise à jour : ", firstDislikeList)
          );
        } catch (e) {
          console.log(e);
        }
      }
    } catch (e) {
      console.log(
        "Erreur lors de la récupération de la liste des propositions dislikées : ",
        e
      );
    }
  };

  if (numberOfPropsSwiped == 25) {
    Popup.show({
      type: "success",
      title: "Déjà 25 propositions passées 🗳",
      textBody:
        "Plus que 25 swipes avant d'avoir une tendance qui se dessine !",
      iconEnabled: false,
      okButtonStyle: { backgroundColor: colors.primary },
      buttonText: "OK",
      callback: () => Popup.hide(),
    });
  }

  if (numberOfPropsSwiped == 50) {
    Popup.show({
      type: "success",
      title: "50 propositions passées 🥳",
      textBody:
        "Ça y est ! Une tendance se dessine. Découvre tes premiers résultats dans le deuxième onglet en bas de ton écran.",
      iconEnabled: false,
      okButtonStyle: { backgroundColor: colors.primary },
      buttonText: "OK",
      callback: () => Popup.hide(),
    });
  }

  if (numberOfPropsSwiped == 100) {
    Popup.show({
      type: "success",
      title: "100 propositions swipées ! 🥇",
      textBody:
        "Véritable as du swipe, tes résultats continuent de s'affiner, observe l'évolution de ton classement dans le deuxième onglet.",
      iconEnabled: false,
      okButtonStyle: { backgroundColor: colors.primary },
      buttonText: "OK",
      callback: () => Popup.hide(),
    });
  }

  if (isConnectedToInternet) {
    if (loaded) {
      return (
        <Root>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar style={"auto"} />
            <View
              style={{
                marginTop: 20,
              }}
            >
              <Image
                source={require("../../../assets/images/logo-header.png")}
                style={styles.logoImage}
              />
              {/* Bouton réglage */}
              <TouchableOpacity
                onPress={() => navigation.navigate("Settings")}
                style={{
                  position: "absolute",
                  top: -10,
                  right: 25,
                  height: Dimensions.get("window").width * 0.13,
                  width: Dimensions.get("window").width * 0.13,
                  backgroundColor: colors.primary,
                  borderRadius: 55,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Feather
                  name={"settings"}
                  size={Dimensions.get("window").width * 0.06}
                  color={"white"}
                />
              </TouchableOpacity>

              {/* Cercle rouge affiché derrière */}
              <View style={styles.circleContainer} />

              <View
                style={{
                  width: "100%",
                  height: "100%",
                  marginTop: Dimensions.get("window").height * 0.06,
                }}
              >
                {isEnded == true ? (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: Dimensions.get("window").height * 0.15,
                      height: Dimensions.get("window").height * 0.4,
                      backgroundColor: "white",
                      marginHorizontal: 25,
                      borderRadius: 40,
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 2,
                      },
                      shadowOpacity: 0.25,
                      shadowRadius: 3.84,
                      elevation: 5,
                      justifyContent: "space-between",
                      zIndex: 100,
                    }}
                  >
                    <View style={{ marginTop: 20, alignItems: "center" }}>
                      <Text style={{ fontSize: 40 }}>🎉</Text>
                      <Text
                        style={{
                          paddingHorizontal: 30,
                          fontSize: 25,
                          textAlign: "center",
                          marginTop: 20,
                          fontWeight: "bold",
                        }}
                      >
                        Tu as passé toutes les propositions !
                      </Text>
                      <Text
                        style={{
                          paddingHorizontal: 30,
                          fontSize: 18,
                          textAlign: "center",
                          marginTop: 10,
                        }}
                      >
                        Découvrez vos scores dans l'onglet "Résultats"
                      </Text>
                    </View>
                    <View style={{ width: "85%" }}>
                      <TouchableOpacity
                        onPress={async () => {
                          await resetData().then(async () => {
                            setIndex(0);
                            setLoaded(false);

                            const allPropositions = await getPropositions();
                            console.log(allPropositions);
                            setPropositions(
                              allPropositions.data.listPropositions.items
                            );
                            setIsEnded(false);
                          });
                        }}
                        style={{
                          marginBottom: 0,
                          height: 50,
                          backgroundColor: colors.primary,
                          borderRadius: 10,
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            textTransform: "uppercase",
                            color: "white",
                            fontSize: 18,
                            fontWeight: "bold",
                          }}
                        >
                          Recommencer
                        </Text>
                      </TouchableOpacity>
                      <Text
                        style={{
                          textAlign: "center",
                          paddingVertical: 10,
                          fontSize: 12,
                        }}
                      >
                        Cela réinitialisera également vos résultats
                      </Text>
                    </View>
                  </View>
                ) : null}
                {isEnded !== true ? (
                  <Swiper
                    ref={swipeRef}
                    cards={finalPropositionsToShow}
                    cardIndex={index}
                    onSwipedAll={() => {
                      setIsEnded(true);
                    }}
                    renderCard={(card) => {
                      return <SwipeCard cardTo proposition={card} />;
                    }}
                    onSwiped={onSwiped}
                    onSwipedLeft={(index) => toggleDislike(index)}
                    onSwipedRight={(index) => toggleLike(index)}
                    stackSize={4}
                    disableTopSwipe
                    animateOverlayLabelsOpacity
                    animateCardOpacity
                    backgroundColor={"transparent"}
                    overlayLabels={{
                      left: {
                        title: "CONTRE",
                        style: {
                          label: {
                            backgroundColor: colors.primary,
                            color: "white",
                            fontSize: 24,
                          },
                          wrapper: {
                            flexDirection: "column",
                            alignItems: "flex-end",
                            justifyContent: "flex-start",
                            marginTop: 20,
                            marginLeft: -20,
                          },
                        },
                      },
                      right: {
                        title: "POUR",
                        style: {
                          label: {
                            backgroundColor: "#5099AF",
                            color: "white",
                            fontSize: 24,
                          },
                          wrapper: {
                            flexDirection: "column",
                            alignItems: "flex-start",
                            justifyContent: "flex-start",
                            marginTop: 20,
                            marginLeft: 20,
                          },
                        },
                      },
                      bottom: {
                        title: "NE SE PRONONCE PAS",
                        style: {
                          label: {
                            backgroundColor: "white",
                            color: "black",
                            fontSize: 24,
                          },
                          wrapper: {
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "flex-start",
                            marginTop: 20,
                          },
                        },
                      },
                    }}
                  />
                ) : null}
              </View>
              {/* </View> */}

              {isEnded == false ? (
                <View style={styles.buttonContainer}>
                  <TouchableOpacity
                    style={[styles.likeButton, { marginLeft: 0 }]}
                    onPress={() => {
                      swipeRef.current.swipeLeft();
                    }}
                  >
                    <FontAwesome
                      name={"times"}
                      size={Dimensions.get("window").width * 0.1}
                      color={colors.dislikeButton}
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => {
                      swipeRef.current.swipeBottom();
                    }}
                  >
                    <Text
                      style={{
                        fontSize: Dimensions.get("window").width * 0.08,
                      }}
                    >
                      🤔
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.likeButton}
                    onPress={() => {
                      swipeRef.current.swipeRight();
                    }}
                  >
                    <FontAwesome
                      name={"heart"}
                      size={Dimensions.get("window").width * 0.08}
                      color={colors.likeButton}
                    />
                  </TouchableOpacity>
                  {/* <Text>{numberOfPropsSwiped} swipes</Text> */}
                </View>
              ) : null}
            </View>
          </SafeAreaView>
        </Root>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      );
    }
  } else {
    setTimeout(function () {
      if (showNotConnectedText == false) {
        setShowNotConnectedText(true);
      }
    }, 4000);

    if (!showNotConnectedText) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", paddingHorizontal: 30 }}
        >
          <Text
            style={{ fontSize: 40, textAlign: "center", fontWeight: "bold" }}
          >
            😖
          </Text>
          <Text
            style={{
              fontSize: 25,
              textAlign: "center",
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            Impossible de charger les propositions
          </Text>
          <Text
            style={{
              fontSize: 15,
              textAlign: "center",
              fontWeight: "400",
              marginTop: 10,
            }}
          >
            Vérifie ta connexion internet et réessaye dans quelques instants (en
            attendant, tu peux toujours accéder à tes résultats 👀)
          </Text>
        </View>
      );
    }
  }
}
