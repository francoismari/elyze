import React, { useEffect, useState } from "react";
import {
  View,
  Text,
} from "react-native";
import styles from "./styles";
import { FontAwesome5 } from "@expo/vector-icons";
import findCandidateDetails from "../../../assets/queries/findCandidateDetails";
import { useNavigation } from "@react-navigation/core";

export default function PropositionListCard(props) {
  const propID = props.proposition;
  console.log('ID de la proposition : ', propID);

  const navigation = useNavigation();

  const [propositionDetails, setPropositionDetails] = useState([]);
  const [candidateDetails, setCandidateDetails] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
      console.log("ID du candidat : ", propID.idCandidat);
      const candidateForPropDetails = findCandidateDetails(
        propID.idCandidat
      );
      // console.log(candidateForPropDetails);
      setCandidateDetails(candidateForPropDetails);
      setLoaded(true);
  }, [props]);

  if (loaded) {
    return (
      <View
        style={[
          styles.container,
          { height: propID.showCandidateName !== false ? 100 : 80 },
        ]}
      >
        <View style={styles.propositionTextContainer}>
          <Text ellipsizeMode="tail" numberOfLines={3} style={styles.titleText}>
            {propID.title}
          </Text>
          {propID.showCandidateName !== false ? (
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
      </View>
    );
  } else {
    return <View>{/* <ActivityIndicator size={'large'} /> */}</View>;
  }
}
