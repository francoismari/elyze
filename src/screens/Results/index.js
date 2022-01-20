import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  Alert,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../../../assets/colors/colors";
import findCandidateDetails from "../../../assets/queries/findCandidateDetails";
import ResultCandidateCard from "../../components/ResultCandidateCard";
import styles from "./styles";
import { AntDesign, Feather } from "@expo/vector-icons";
import ResponsiveTitle from "../../components/ResponsiveTitle";
import { round } from "lodash";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};

export default function Results() {
  const navigation = useNavigation();

  // Faire un object avec les scores pour chaque candidat, et trier l'objet du plus grand au plus petit
  // Pour chaque candidat récupérer le score
  // !!! Pour chaque candidat récupérer le total de propositions passées
  // !!! Faire le pourcentage de propositions likés pour chaque candidat
  // !!! Afficher les résultats uniquement si
  /* var scoreCandidats = {
        player1: (nb propositions likées pour candidat 1 * 100)/(nb de propositions passées pour chaque candidat)
        player2: ......,
        player3: ......
    };
    
    var sorted = Object.keys(scoreCandidats)
                       .sort(function(keya, keyb) {
                           return scoreCandidats[keyb] - scoreCandidats[keya];
                       })
                       .forEach(function(key) {
                           console.log(key, scoreCandidats[key]);
                       }) */

  const [podiumFirstDetails, setPodiumFirstDetails] = useState([]);
  const [podiumSecondDetails, setPodiumSecondDetails] = useState([]);
  const [podiumThirdDetails, setPodiumThirdDetails] = useState([]);

  const [scoreCandidats, setScoreCandidats] = useState([]);

  const [positionsPassedNumber, setPositionsPassedNumber] = useState(0);

  const [loaded] = useState(true);
  const [isSet, setIsSet] = useState(true);

  const [isFetching, setIsFetching] = useState(false);
  const [hasValidateTips, setHasValidateTips] = useState(true);

  const updatePassedPropositionNumber = async () => {
    try {
      await AsyncStorage.getItem("@passed_propositions").then((response) => {
        const arrayPassedPropositionNumber = JSON.parse(response);
        if (arrayPassedPropositionNumber !== null) {
          setPositionsPassedNumber(arrayPassedPropositionNumber.length);
        } else {
          setPositionsPassedNumber(0);
        }
      });
    } catch (e) {
      console.log(e);
    }
  };

  const getScoreFor = async (idCandidat) => {
    // const candidateVariable = "@score_candidat_" + idCandidat;
    // const dislikeCandidateVariable = "@scoreDislike_candidat_" + idCandidat;

    const candidateVariable = "@likeListCandidate_" + idCandidat;
    const dislikeCandidateVariable = "@dislikeListCandidate_" + idCandidat;

    var likesForCandidateJSON = await AsyncStorage.getItem(candidateVariable);
    var dislikesForCandidateJSON = await AsyncStorage.getItem(
      dislikeCandidateVariable
    );

    likesForCandidate = JSON.parse(likesForCandidateJSON);
    likesForCandidate = [...new Set(likesForCandidate)];

    dislikesForCandidate = JSON.parse(dislikesForCandidateJSON);
    dislikesForCandidate = [...new Set(dislikesForCandidate)];

    likesForCandidateCount = likesForCandidate.length;
    dislikesForCandidateCount = dislikesForCandidate.length;

    const likesAndDislikes = likesForCandidate + dislikesForCandidate;

    const likesPercentageForCandidate = (likesForCandidate / likesAndDislikes) * 100;
    const scoreForCandidate = likesPercentageForCandidate + likesForCandidate - dislikesForCandidate;

    if (!Number.isInteger(scoreForCandidate) || !Number.isFinite(scoreForCandidate)) {
      return -1;
    }

    return scoreForCandidate;
  };

  const createFinalTable = (
    scoreFirst,
    scoreSecond,
    scoreThird,
    scoreFourth,
    scoreFifth,
    scoreSix,
    scoreSeven,
    scoreEight,
    scoreNine,
    scoreTen,
    scoreEleven,
    scoreTwelve,
    scoreThirteen,
    scoreFourteen,
    scoreFiveteen
  ) => {
    var finalScoreForCandidates = [
      {
        id: 1,
        score: scoreFirst,
      },
      {
        id: 2,
        score: scoreSecond,
      },
      {
        id: 3,
        score: scoreThird,
      },
      {
        id: 4,
        score: scoreFourth,
      },
      {
        id: 5,
        score: scoreFifth,
      },
      {
        id: 6,
        score: scoreSix,
      },
      {
        id: 7,
        score: scoreSeven,
      },
      {
        id: 8,
        score: scoreEight,
      },
      {
        id: 9,
        score: scoreNine,
      },
      {
        id: 10,
        score: scoreTen,
      },
      {
        id: 11,
        score: scoreEleven,
      },
      {
        id: 12,
        score: scoreTwelve,
      },
      {
        id: 13,
        score: scoreThirteen,
      },
      {
        id: 14,
        score: scoreFourteen,
      },
      {
        id: 15,
        score: scoreFiveteen,
      },
    ];

    finalScoreForCandidates.sort(
      (a, b) => parseFloat(b.score) - parseFloat(a.score)
    );

    return finalScoreForCandidates;
  };

  const updateScore = async () => {
    const response = await Promise.all(
      finalScoreForCandidates.map(({ id }) => getScoreFor(id))
    );
    
    if (response.some((value) => !Number.isInteger(value))) {
      setIsSet(false);
      return ;
    }

    const finalTableSorted = createFinalTable(...response);
    setScoreCandidats(finalTableSorted);

    // console.log("Score finaux : ", finalTableSorted);

    // On met à jour le podium
    const firstPodiumDetails = findCandidateDetails(finalTableSorted[0].id);
    setPodiumFirstDetails(firstPodiumDetails);

    const secondPodiumDetails = findCandidateDetails(
      finalTableSorted[1].id
    );
    setPodiumSecondDetails(secondPodiumDetails);

    const thirdPodiumDetails = findCandidateDetails(finalTableSorted[2].id);
    setPodiumThirdDetails(thirdPodiumDetails);

    setIsSet(true);
  };

  const onRefresh = React.useCallback(async () => {
    setIsFetching(true);
    await updateScore().then(() => wait(500).then(() => setIsFetching(false)));
  }, []);

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      updatePassedPropositionNumber();
      updateScore();
    }
  }, [scoreCandidats, isFocused, isFetching]);

  useEffect(async () => {
    try {
      await AsyncStorage.getItem("@hasValidateResultTip").then((response) => {
        if (response == null) {
          setHasValidateTips(false);
        }
      });
    } catch (e) {
      console.log(e);
    }

    console.log(hasValidateTips);
  }, []);

  const renderCandidateRankCard = (item, index) => {
    // Récupérer les infos sur le candidat

    return (
      <ResultCandidateCard
        position={index + 1}
        idCandidat={item.id}
        item={item}
        focused={isFocused}
      />
    );
  };

  const viewRef = useRef();

  // download image
  const shareImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: "jpg",
        quality: 1.0,
      });

      console.log(uri);

      if (!(await Sharing.isAvailableAsync())) {
        alert(
          `Le partage des résultats n'est pas disponible sur ton appareil 😣`
        );
        return;
      }

      const imageResultsOptions = {
        mimeType: "image/jpg",
        dialogTitle: "Mes résultats",
      };

      await Sharing.shareAsync("file://" + uri, { imageResultsOptions });
    } catch (e) {
      console.log(e);
    }
  };

  if (
    loaded &&
    isSet &&
    scoreCandidats !== "undefined" &&
    scoreCandidats !== "null" &&
    podiumSecondDetails !== undefined &&
    podiumSecondDetails.length !== 0 &&
    podiumFirstDetails &&
    podiumFirstDetails.length !== 0 &&
    podiumThirdDetails &&
    podiumThirdDetails.length !== 0
  ) {
    const fiabilityRating = round((positionsPassedNumber / 450) * 100);

    return (
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text
            style={{
              fontSize: Dimensions.get("window").width * 0.085,
              marginLeft: 25,
              marginBottom: 20,
              width: 250,
              fontWeight: "bold",
            }}
          >
            Résultats
          </Text>

          {/* {positionsPassedNumber > 0 ? (
            <TouchableOpacity style={styles.shareButton}>
              <Entypo name={"share-alternative"} size={20} color={"white"} />
            </TouchableOpacity>
          ) : null} */}
        </View>

        {/* Bouton partage des résultats */}
        {positionsPassedNumber > 0 ? (
          <TouchableOpacity
            onPress={() => shareImage()}
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
              name={"share"}
              size={Dimensions.get("window").width * 0.06}
              color={"white"}
            />
          </TouchableOpacity>
        ) : null}

        <View style={styles.podiumContainer}>
          {
            // Si aucune proposition n'est swipée
            positionsPassedNumber == 0 ? (
              <View style={[styles.secondResults, { marginTop: 50 }]}>
                <View style={styles.imageContainer}>
                  <Text
                    style={[
                      styles.podiumImage,
                      { fontSize: 35, textAlign: "center" },
                    ]}
                  >
                    🤔
                  </Text>
                </View>
                <View
                  style={[
                    styles.rectangleWrapper,
                    {
                      height: 100,
                      backgroundColor: podiumSecondDetails[0].bgColor,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.numberWrapper,
                      {
                        borderWidth: 4,
                        borderColor: "lightgray",
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>#</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>2</Text>
                  </View>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.secondResults, { marginTop: 50 }]}
                onPress={() =>
                  navigation.navigate("CandidateProfile", {
                    id: podiumSecondDetails[0].id,
                  })
                }
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={podiumSecondDetails[0].image}
                    style={styles.podiumImage}
                  />
                </View>
                <View
                  style={[
                    styles.rectangleWrapper,
                    {
                      height: 100,
                      backgroundColor: podiumSecondDetails[0].bgColor,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.numberWrapper,
                      {
                        borderWidth: 4,
                        borderColor: "lightgray",
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>#</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>2</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }

          {
            // Si aucune proposition n'est swipée
            positionsPassedNumber == 0 ? (
              <View style={[styles.firstResults]}>
                <View style={styles.imageContainer}>
                  <Text
                    style={[
                      styles.podiumImage,
                      { fontSize: 35, textAlign: "center" },
                    ]}
                  >
                    🤔
                  </Text>
                </View>
                <View
                  style={[
                    styles.rectangleWrapper,
                    {
                      height: 150,
                      backgroundColor: podiumFirstDetails[0].bgColor,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.numberWrapper,
                      {
                        borderWidth: 4,
                        borderColor: "gold",
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>#</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>1</Text>
                  </View>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.firstResults}
                onPress={() =>
                  navigation.navigate("CandidateProfile", {
                    id: podiumFirstDetails[0].id,
                  })
                }
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={podiumFirstDetails[0].image}
                    style={styles.podiumImage}
                  />
                </View>
                <View
                  style={[
                    styles.rectangleWrapper,
                    {
                      height: 150,
                      backgroundColor: podiumFirstDetails[0].bgColor,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.numberWrapper,
                      {
                        borderWidth: 4,
                        borderColor: "gold",
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>#</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>1</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }

          {
            // Si aucune proposition n'est swipée
            positionsPassedNumber == 0 ? (
              <View style={[styles.thirdResults, { marginTop: 70 }]}>
                <View style={styles.imageContainer}>
                  <Text
                    style={[
                      styles.podiumImage,
                      { fontSize: 35, textAlign: "center" },
                    ]}
                  >
                    🤔
                  </Text>
                </View>
                <View
                  style={[
                    styles.rectangleWrapper,
                    {
                      height: 80,
                      backgroundColor: podiumThirdDetails[0].bgColor,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.numberWrapper,
                      {
                        borderWidth: 4,
                        borderColor: "#E9AB81",
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>#</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>3</Text>
                  </View>
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={[styles.thirdResults, { marginTop: 70 }]}
                onPress={() =>
                  navigation.navigate("CandidateProfile", {
                    id: podiumThirdDetails[0].id,
                  })
                }
              >
                <View style={styles.imageContainer}>
                  <Image
                    source={podiumThirdDetails[0].image}
                    style={styles.podiumImage}
                  />
                </View>
                <View
                  style={[
                    styles.rectangleWrapper,
                    {
                      height: 80,
                      backgroundColor: podiumThirdDetails[0].bgColor,
                    },
                  ]}
                >
                  <View
                    style={[
                      styles.numberWrapper,
                      {
                        borderWidth: 4,
                        borderColor: "#E9AB81",
                        flexDirection: "row",
                      },
                    ]}
                  >
                    <Text style={{ fontSize: 12, fontWeight: "bold" }}>#</Text>
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>3</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }
        </View>

        <View
          style={{
            width: Dimensions.get("window").width * 2.5,
            height: Dimensions.get("window").width * 2.5,
            borderRadius: (Dimensions.get("window").width * 2.5) / 2,
            position: "absolute",
            backgroundColor: colors.primary,
            top: 200,
            zIndex: -10,
            alignSelf: "center",
          }}
        ></View>

        <ScrollView
          style={styles.listScoreContainer}
          refreshControl={
            <RefreshControl refreshing={isFetching} onRefresh={onRefresh} />
          }
        >
          <View collapsable={false} ref={viewRef}>
            <Text style={styles.allResultsText}>🏆 Tous les résultats</Text>
            <Image
              style={{
                height: 25,
                width: 100,
                alignSelf: "center",
                marginBottom: 10,
              }}
              source={require("../../../assets/images/logo-header.png")}
            />
            <Text style={styles.passedPropositionsText}>
              Sur {Math.round(positionsPassedNumber)} propositions | Continue à
              swiper pour affiner tes résultats
            </Text>
            {positionsPassedNumber > 0 ? (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={[
                    styles.passedPropositionsText,
                    { fontWeight: "bold" },
                  ]}
                >
                  Indice de fiabilité :{" "}
                  {fiabilityRating <= 30
                    ? "Faible"
                    : fiabilityRating > 30 && fiabilityRating < 70
                    ? "Moyen"
                    : fiabilityRating >= 70
                    ? "Élevé"
                    : null}
                </Text>
              </View>
            ) : null}
            {positionsPassedNumber == 0 ? (
              <View>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 30,
                    paddingHorizontal: 45,
                    fontSize: 40,
                  }}
                >
                  🗳
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: 10,
                    paddingHorizontal: 45,
                    fontSize: 25,
                  }}
                >
                  Continue à swiper pour découvrir les candidats qui te
                  correspondent
                </Text>
              </View>
            ) : (
              <View style={{ alignItems: "center" }}>
                {!hasValidateTips ? (
                  <View
                    style={{
                      backgroundColor: "#E1C356",
                      width: "87%",
                      borderRadius: 10,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      paddingHorizontal: 10,
                      paddingVertical: 10,
                      alignItems: "center",
                      marginBottom: 10,
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Text>💡</Text>
                      <Text
                        style={{ marginLeft: 10, color: "white", width: "80%" }}
                      >
                        Astuce : pour connaître les détails des résultats pour
                        un candidat, appuyez sur celui-ci.
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={async () => {
                        await AsyncStorage.setItem(
                          "@hasValidateResultTip",
                          "true"
                        ).then(() => {
                          setHasValidateTips(true);
                        });
                      }}
                      style={{ marginRight: 5 }}
                    >
                      <AntDesign
                        name={"closecircle"}
                        size={20}
                        color={"white"}
                      />
                    </TouchableOpacity>
                  </View>
                ) : null}

                <FlatList
                  data={scoreCandidats}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item, index }) =>
                    renderCandidateRankCard(item, index)
                  }
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    );
  } else if (isSet == false) {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ResponsiveTitle title={"Résultats"} />
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginTop: Dimensions.get("window").height * 0.2,
            paddingHorizontal: 10,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              fontSize: 35,
              fontWeight: "bold",
              marginBottom: 5,
            }}
          >
            🗳
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 30,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Plus que quelques swipes !
          </Text>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              marginHorizontal: 20,
            }}
          >
            Tu dois répondre à au moins une proposition de chaque candidat pour
            obtenir vos résultats
          </Text>
        </View>
      </SafeAreaView>
    );
  } else {
    // console.log(isSet);

    // console.log(loaded);

    return (
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator
          style={{
            justifyContent: "center",
            alignItems: "center",
            zIndex: 100,
            marginTop: 400,
          }}
          size={"large"}
        />
      </View>
    );
  }
}
