import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import { FontAwesome5 } from "@expo/vector-icons";
import findCandidateDetails from "../../../assets/queries/findCandidateDetails";
import { useNavigation } from "@react-navigation/core";
import { API, graphqlOperation } from "aws-amplify";

export default function PropositionListCard(props) {
  const propID = props.propositionID;
  console.log("ID de la proposition : ", propID);

  const navigation = useNavigation();

  const [propositionDetails, setPropositionDetails] = useState([]);
  const [candidateDetails, setCandidateDetails] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    try {
      const getPropositionDetailsRequest =
        `query getPropositionInfo {
                    getPropositions(id: "` +
        propID +
        `") {
                      id
                      articleContent
                      idCandidat
                      idTheme
                      source
                      title
                    }
                  }`;

      const getPropositionDetailsAPI = await API.graphql(
        graphqlOperation(getPropositionDetailsRequest)
      );
      const finalPropositionDetailsAPI =
        getPropositionDetailsAPI.data.getPropositions;
      console.log(
        "Détails de la proposition : ",
        finalPropositionDetailsAPI.idCandidat
      );
      setPropositionDetails(finalPropositionDetailsAPI);

      console.log("ID du candidat : ", finalPropositionDetailsAPI.idCandidat);
      const candidateForPropDetails = findCandidateDetails(
        finalPropositionDetailsAPI.idCandidat
      );
      // console.log(candidateForPropDetails);
      setCandidateDetails(candidateForPropDetails);
      setLoaded(true);
    } catch (e) {
      console.log("Erreur lors de la récupération de la proposition : ", e);
    }
  }, [props]);

  if (loaded) {
    return (
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("PropositionDetails", {
            idCandidat: propositionDetails.idCandidat,
            theme: propositionDetails.idTheme,
            showCandidateInfo: true,
            title: propositionDetails.title,
            articleContent: propositionDetails.articleContent,
          })
        }
        style={[
          styles.container,
          { height: propositionDetails.showCandidateName !== false ? 100 : 80 },
        ]}
      >
        <View style={styles.propositionTextContainer}>
          <Text ellipsizeMode="tail" numberOfLines={3} style={styles.titleText}>
            {propositionDetails.title}
          </Text>
          {propositionDetails.showCandidateName !== false ? (
            <View style={styles.candidatDetailsContainer}>
              <Text style={styles.candidatDetailsText}>
                Par {candidateDetails[0].firstname}{" "}
                {candidateDetails[0].lastname}
              </Text>
            </View>
          ) : null}
        </View>
        <View style={styles.plusButtonContainer}>
          <FontAwesome5 name={"plus"} color={"white"} />
        </View>
      </TouchableOpacity>
    );
  } else {
    return <View>{/* <ActivityIndicator size={'large'} /> */}</View>;
  }
}
