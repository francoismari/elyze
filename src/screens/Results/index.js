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
import { AntDesign, Feather, Foundation } from "@expo/vector-icons";
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

  const [loaded, setLoaded] = useState(true);
  const [isSet, setIsSet] = useState(true);

  const [isFetching, setIsFetching] = useState(false);
  const [hasValidateTips, setHasValidateTips] = useState(true);

  const [firstNumeroPodium, setFirstNumeroPodium] = useState(1);
  const [secondNumeroPodium, setSecondNumeroPodium] = useState(2);
  const [thirdNumeroPodium, setThirdNumeroPodium] = useState(3);

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
    const candidateVariable = "@score_candidat_" + idCandidat;
    const dislikeCandidateVariable = "@scoreDislike_candidat_" + idCandidat;

    // const superLikecandidateVariable = "@likeListCandidate_" + idCandidat;
    // const candidateVariable = "@superLikeListCandidate_" + idCandidat;
    // const dislikeCandidateVariable = "@dislikeListCandidate_" + idCandidat;

    // var superLikesForCandidate = await AsyncStorage.getItem(superLikecandidateVariable);
    var likesForCandidate = await AsyncStorage.getItem(candidateVariable);
    var dislikesForCandidate = await AsyncStorage.getItem(
      dislikeCandidateVariable
    );

    // superLikesForCandidate = JSON.parse(likesForCandidate);

    // superLikesForCandidate = [...new Set(superLikesForCandidate)];

    // if (superLikesForCandidate == null) {
    //   superLikesForCandidate = 0;
    // } else {
    //   superLikesForCandidate = superLikesForCandidate.length;
    // }

    likesForCandidate = JSON.parse(likesForCandidate);

    // likesForCandidate = [...new Set(likesForCandidate)];

    // if (likesForCandidate == null) {
    //   likesForCandidate = 0;
    // } else {
    //   likesForCandidate = likesForCandidate.length;
    // }

    dislikesForCandidate = JSON.parse(dislikesForCandidate);

    // dislikesForCandidate = [...new Set(dislikesForCandidate)];
    // if (dislikesForCandidate == null) {
    //   dislikesForCandidate = 0;
    // } else {
    //   dislikesForCandidate = dislikesForCandidate.length;
    // }

    const likesAndDislikesNumber =
      parseInt(likesForCandidate) + parseInt(dislikesForCandidate);

    var likesPercentageForCandidate =
      (likesForCandidate / likesAndDislikesNumber) * 100;
    // (likesForCandidate) / (likesForCandidate + dislikesForCandidate);
    // var dislikePercentageForCandidate =
    //   (dislikesForCandidate * 100) / (likesForCandidate + dislikesForCandidate);

    var scoreForCandidate =
      likesPercentageForCandidate + likesForCandidate - dislikesForCandidate;

    // console.log("score: ", scoreForCandidate);
    if (isNaN(scoreForCandidate) || scoreForCandidate == "Infinity") {
      return -1000000000000;
    } else {
      return parseInt(scoreForCandidate);
    }
  };

  const findPairs = (arr) => {
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        if (arr[i].score == arr[j].score) {
          if (
            i != j &&
            !arr[j].pair.includes(arr[i].id) &&
            !arr[i].pair.includes(arr[j].id)
          ) {
            arr[i].pair.push(arr[j].id);
            arr[j].pair.push(arr[i].id);
          }
        }
      }
    }
    return arr;
  };

  const setPositions = (arr) => {
    // console.log("SETTING POSITIONS");
    var minimum = null;
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].pair.length != 0) {
        minimum = Math.min.apply(Math, arr[i].pair);

        if (arr[i].id <= minimum) {
          arr[i].position = i + 1;
        } else {
          // console.log("minimum", minimum);
          // index de l'object avec id = minimum dans arr
          var index = 0;
          for (let j = 0; j < arr.length; j++) {
            if (arr[j].id == minimum) {
              index = j;
              break;
            }
          }

          // console.log("INDEX", index);
          arr[i].position = arr[index].position;
        }
      } else {
        if (i == 0) {
          arr[i].position = 1;
        } else {
          arr[i].position = arr[i - 1].pair.length + arr[i - 1].position + 1;
        }
      }
    }
    // console.log("POSITIONS SET", arr);
    return arr;
  };

  const createFinalTable = (
    scoreFirst,
    scoreSecond,
    scoreThird,
    scoreFourth,
    scoreFifth,
    scoreSix,
    scoreEight,
    scoreNine,
    scoreTen,
    scoreEleven,
    scoreTwelve,
    scoreThirteen,
    scoreFourteen,
    scoreFiveteen,
    scoreSixteen
  ) => {
    var finalScoreForCandidates = [
      {
        id: 1,
        score: scoreFirst,
        pair: [],
        position: null,
      },
      {
        id: 2,
        score: scoreSecond,
        pair: [],
        position: null,
      },
      {
        id: 3,
        score: scoreThird,
        pair: [],
        position: null,
      },
      {
        id: 4,
        score: scoreFourth,
        pair: [],
        position: null,
      },
      {
        id: 5,
        score: scoreFifth,
        pair: [],
        position: null,
      },
      {
        id: 6,
        score: scoreSix,
        pair: [],
        position: null,
      },
      {
        id: 8,
        score: scoreEight,
        pair: [],
        position: null,
      },
      {
        id: 9,
        score: scoreNine,
        pair: [],
        position: null,
      },
      {
        id: 10,
        score: scoreTen,
        pair: [],
        position: null,
      },
      {
        id: 11,
        score: scoreEleven,
        pair: [],
        position: null,
      },
      {
        id: 12,
        score: scoreTwelve,
        pair: [],
        position: null,
      },
      {
        id: 13,
        score: scoreThirteen,
        pair: [],
        position: null,
      },
      {
        id: 14,
        score: scoreFourteen,
        pair: [],
        position: null,
      },
      {
        id: 15,
        score: scoreFiveteen,
        pair: [],
        position: null,
      },
      {
        id: 16,
        score: scoreSixteen,
        pair: [],
        position: null,
      },
    ];

    finalScoreForCandidates.sort(
      (a, b) => parseFloat(b.score) - parseFloat(a.score)
    );

    return finalScoreForCandidates;
  };

  const updateScore = async () => {
    await Promise.all([
      getScoreFor(1),
      getScoreFor(2),
      getScoreFor(3),
      getScoreFor(4),
      getScoreFor(5),
      getScoreFor(6),
      getScoreFor(8),
      getScoreFor(9),
      getScoreFor(10),
      getScoreFor(11),
      getScoreFor(12),
      getScoreFor(13),
      getScoreFor(14),
      getScoreFor(15),
      getScoreFor(16),
    ]).then((response) => {
      // console.log("Réponse du tableau : ", response);
      if (
        isNaN(response[0]) == false &&
        isNaN(response[1]) == false &&
        isNaN(response[2]) == false &&
        isNaN(response[3]) == false &&
        isNaN(response[4]) == false &&
        isNaN(response[5]) == false &&
        isNaN(response[6]) == false &&
        isNaN(response[7]) == false &&
        isNaN(response[8]) == false &&
        isNaN(response[9]) == false &&
        isNaN(response[10]) == false &&
        isNaN(response[11]) == false &&
        isNaN(response[12]) == false &&
        isNaN(response[13]) == false &&
        isNaN(response[14]) == false
      ) {
        const finalTableSorted = createFinalTable(
          response[0],
          response[1],
          response[2],
          response[3],
          response[4],
          response[5],
          response[6],
          response[7],
          response[8],
          response[9],
          response[10],
          response[11],
          response[12],
          response[13],
          response[14]
        );

        const pairsTable = setPositions(findPairs(finalTableSorted));

        setScoreCandidats(pairsTable);

        // console.log("Score finaux : ", finalTableSorted);

        // On met à jour le podium
        const firstPodiumDetails = findCandidateDetails(finalTableSorted[0].id);
        setPodiumFirstDetails(firstPodiumDetails);

        setFirstNumeroPodium(finalTableSorted[0].position);
        setSecondNumeroPodium(finalTableSorted[1].position);
        setThirdNumeroPodium(finalTableSorted[2].position);

        const secondPodiumDetails = findCandidateDetails(
          finalTableSorted[1].id
        );
        setPodiumSecondDetails(secondPodiumDetails);

        const thirdPodiumDetails = findCandidateDetails(finalTableSorted[2].id);
        setPodiumThirdDetails(thirdPodiumDetails);

        setIsSet(true);
      } else {
        setIsSet(false);
      }
    });
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

    // console.log(hasValidateTips);
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

      // console.log(uri);

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
            onPress={() =>
              navigation.navigate("Share", {
                first: podiumFirstDetails[0],
                second: podiumSecondDetails[0],
                third: podiumThirdDetails[0],
              })
            }
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
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {secondNumeroPodium}
                    </Text>
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
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {firstNumeroPodium}
                    </Text>
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
                    <Text style={{ fontSize: 16, fontWeight: "bold" }}>
                      {thirdNumeroPodium}
                    </Text>
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
              voter pour affiner tes résultats
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
                  Continue à voter pour découvrir les candidats qui te
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
            Plus que quelques votes !
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
