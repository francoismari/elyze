import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useNavigation } from "@react-navigation/core";
import { round } from "lodash";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import findCandidateDetails from "../../../assets/queries/findCandidateDetails";
import styles from "./styles";

export default function ResultCandidateCard(props) {
  // console.log(props.item.position);
  const navigation = useNavigation();

  const [candidateDetails, setCandidateDetails] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [positionsPassed, setPositionsPassed] = useState(0);
  const [candidateScore, setCandidateScore] = useState(0);
  const [swipedPropositions, setSwipedPropositions] = useState(0);

  const [candidateTotalSwipes, setCandidateTotalSwipes] = useState(0);

  const [candidatePourcentage, setCandidatePourcentage] = useState(0);

  const getPositionsPassedNumber = async () => {
    var numberOfPositionsPassed = await AsyncStorage.getItem(
      "@passed_propositions"
    );

    if (numberOfPositionsPassed !== null) {
      numberOfPositionsPassed = numberOfPositionsPassed.length;
      return numberOfPositionsPassed;
    } else {
      return 0;
    }
  };

  const isFocused = useIsFocused();

  useEffect(async () => {
    // Récupérer le nombre total de propositions passées
    // Récupérer les infos sur le candidat
    try {
      const candidateInfos = findCandidateDetails(props.idCandidat);

      const totalPassedProps = await getPositionsPassedNumber().then((res) => {
        const realPassedProps = Math.round(res / 3);

        setCandidateDetails(candidateInfos);

        if (props.item.score == -1) {
          setCandidateScore(-1);
        } else {
          const finalCandidateScore = Math.round(props.item.score);
          setCandidateScore(finalCandidateScore);
        }

        // console.log("Score: ", candidateScore);

        setLoaded(true);
      });
    } catch (e) {
      console.log(e);
    }

    const getTotalPropsByCandidate = async (idCandidat) => {
      const candidateVariable = "@likeListCandidate_" + idCandidat;
      const dislikeCandidateVariable = "@dislikeListCandidate_" + idCandidat;

      var likesForCandidate = await AsyncStorage.getItem(candidateVariable);
      var dislikesForCandidate = await AsyncStorage.getItem(
        dislikeCandidateVariable
      );

      likesForCandidate = JSON.parse(likesForCandidate);
      dislikesForCandidate = JSON.parse(dislikesForCandidate);

      if (likesForCandidate == null && dislikesForCandidate == null) {
        return 0;
      } else if (likesForCandidate == null && dislikesForCandidate !== null) {
        return console.log(dislikesForCandidate.length);
      } else if (dislikesForCandidate == null && likesForCandidate !== null) {
        return console.log(likesForCandidate.length);
      } else if (likesForCandidate !== null && dislikesForCandidate !== null) {
        return likesForCandidate.length + dislikesForCandidate.length;
      }
    };

    const totalSwipeNumber = await getTotalPropsByCandidate(props.idCandidat);

    if (totalSwipeNumber == undefined) {
      setCandidateTotalSwipes(0);
    } else {
      setCandidateTotalSwipes(totalSwipeNumber);
    }

    const getPourcentageForCandidate = async (idCandidat) => {
      const candidateVariable = "@score_candidat_" + idCandidat;
      const dislikeCandidateVariable = "@scoreDislike_candidat_" + idCandidat;

      const likeCandidateVariablePassed = "@likeListCandidate_" + idCandidat;
      const superLikeCandidateVariablePassed =
        "@superLikeListCandidate_" + idCandidat;
      const dislikeCandidateVariablePassed =
        "@dislikeListCandidate_" + idCandidat;

      try {
        var likesForCandidatePassed = await AsyncStorage.getItem(
          likeCandidateVariablePassed
        );
        likesForCandidatePassed = JSON.parse(likesForCandidatePassed);
        likesForCandidatePassed = likesForCandidatePassed.length;
      } catch (e) {
        var likesForCandidatePassed = null;
      }

      try {
        var superlikesForCandidatePassed = await AsyncStorage.getItem(
          superLikeCandidateVariablePassed
        );
        superlikesForCandidatePassed = JSON.parse(superlikesForCandidatePassed);
        superlikesForCandidatePassed = superlikesForCandidatePassed.length;
      } catch (e) {
        var superlikesForCandidatePassed = null;
      }

      try {
        var dislikesForCandidatePassed = await AsyncStorage.getItem(
          dislikeCandidateVariablePassed
        );
        dislikesForCandidatePassed = JSON.parse(dislikesForCandidatePassed);
        dislikesForCandidatePassed = dislikesForCandidatePassed.length;
      } catch (e) {
        var dislikesForCandidatePassed = null;
      }

      setSwipedPropositions(
        likesForCandidatePassed +
          superlikesForCandidatePassed +
          dislikesForCandidatePassed
      );

      var likesForCandidate = await AsyncStorage.getItem(candidateVariable);
      var dislikesForCandidate = await AsyncStorage.getItem(
        dislikeCandidateVariable
      );

      likesForCandidate = JSON.parse(likesForCandidate);

      dislikesForCandidate = JSON.parse(dislikesForCandidate);

      const likesAndDislikesNumber =
        parseInt(likesForCandidate) + parseInt(dislikesForCandidate);

      var likesPercentageForCandidate = likesForCandidate - dislikesForCandidate;
      // (likesForCandidate / (likesForCandidatePassed +
      //   superlikesForCandidatePassed +
      //   dislikesForCandidatePassed)) * 50;

      var scoreForCandidate = likesPercentageForCandidate;

      if (isNaN(scoreForCandidate) || scoreForCandidate == "Infinity") {
        return -1000000000000;
      } else {
        return parseInt(scoreForCandidate);
      }

      // const candidateVariable = "@likeListCandidate_" + idCandidat;
      // const dislikeCandidateVariable = "@dislikeListCandidate_" + idCandidat;

      // var likesForCandidate = await AsyncStorage.getItem(candidateVariable);
      // var dislikesForCandidate = await AsyncStorage.getItem(
      //   dislikeCandidateVariable
      // );

      // likesForCandidate = JSON.parse(likesForCandidate);
      // if (likesForCandidate == null) {
      //   likesForCandidate = 0;
      // } else {
      //   likesForCandidate = likesForCandidate.length;
      // }

      // dislikesForCandidate = JSON.parse(dislikesForCandidate);
      // if (dislikesForCandidate == null) {
      //   dislikesForCandidate = 0;
      // } else {
      //   dislikesForCandidate = dislikesForCandidate.length;
      // }

      // const likesAndDislikesNumber =
      //   parseInt(likesForCandidate) + parseInt(dislikesForCandidate);

      // var likesPercentageForCandidate =
      //   (likesForCandidate / likesAndDislikesNumber) * 100;

      // var scoreForCandidate = likesPercentageForCandidate;
      // return round(scoreForCandidate);
    };
    const currentPourcentage = await getPourcentageForCandidate(
      props.idCandidat
    );
    setCandidatePourcentage(currentPourcentage);
  }, [props.item.isFocused, isFocused, props.item.score]);

  // console.log("score pour : " + candidateDetails[0].id + " : ", candidateScore);

  if (loaded) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("CandidateResults", {
            id: candidateDetails[0].id,
            firstname: candidateDetails[0].firstname,
            lastname: candidateDetails[0].lastname,
            bgColor: candidateDetails[0].bgColor,
          })
        }
        style={[
          styles.container,
          {
            backgroundColor: candidateDetails[0].bgColor,
            overflow: "hidden",
            height: 104,
          },
        ]}
      >
        <View style={[styles.candidateDetailsContainer, { marginTop: 10 }]}>
          <Text></Text>
          <Text style={styles.hashtagPositionText}>#</Text>
          <Text style={styles.positionText}>{props.item.position}</Text>

          <Text style={styles.candidateFirtnameText}>
            {candidateDetails[0].firstname}
          </Text>

          <Text style={styles.candidateLastnameText}>
            {candidateDetails[0].lastname}
          </Text>
        </View>
        <View style={styles.bottomCardContainer}>
          {candidateScore == -1000000000000 ? (
            <Text style={styles.agreePourcentageText} numberOfLines={2}>
              Continue à swiper pour découvrir le score 🗳
            </Text>
          ) : (
            <Text style={styles.agreePourcentageText} numberOfLines={2}>
              <Text style={{fontWeight: '600'}}>Score : {candidatePourcentage}</Text> | {swipedPropositions} propositions passées
              {/* {
              candidateScore == 0
                ? " 0"
                : candidateScore > 100
                ? " 100"
                : " " + 
                candidatePourcentage} */}
              {/* % de ses propositions */}
            </Text>
          )}
          <Image
            source={candidateDetails[0].image}
            style={styles.imageCandidate}
          />
        </View>
      </TouchableOpacity>
    );
  } else {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
}
