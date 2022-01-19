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

export default function PropositionDetails({ route }) {
  const allPropositionDetails = route.params;

  const navigation = useNavigation();

  const [candidatInfo, setCandidatInfo] = useState([]);
  const [themeInfo, setThemeInfo] = useState([]);
  const [loaded, setLoaded] = useState(false);

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

  if (loaded) {
    return (
      <View style={styles.container}>
        <View
          style={[
            styles.themeContainer,
            {
              backgroundColor: themeInfo[0].lightColor,
              // width: themeInfo[0].title.length * 11,
            },
          ]}
        >
          <Text style={[styles.themeTitleText, { color: "white" }]}>
            {themeInfo[0].title}
          </Text>
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
