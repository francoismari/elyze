import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
} from "react-native";
import findThemeTitle from "../../../assets/queries/findThemeTitle";
import ThemeHeader from "../../components/ThemeHeader";
import styles from "./styles";
import PropositionListCard from "../../components/PropositionListCard";
import { useNavigation } from "@react-navigation/core";
import { API, graphqlOperation } from "aws-amplify";

import firstPropositions from "../../../assets/data/propositions/firstPropositions";
import propositionsList from "../../../assets/data/propositions/propositionsList";

var firstPropositionsArray = JSON.parse(JSON.stringify(firstPropositions));
var propositionsListArray = JSON.parse(JSON.stringify(propositionsList));

var allPropositions = firstPropositionsArray.concat(propositionsListArray);

export default function ThemeByCandidate({ route }) {
  const themeDetails = route.params;

  const navigation = useNavigation();

  const [themeInfo, setThemeInfo] = useState([]);
  const [propositionListForCandidate, setPropositionListForCandidate] =
    useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    setThemeInfo(findThemeTitle(themeDetails.idTheme));

    var propositionsForThemeAndCandidate = allPropositions.filter(
      (proposition) =>
        proposition.idTheme == themeDetails.idTheme &&
        proposition.idCandidat == themeDetails.idCandidat
    );

    propositionsForThemeAndCandidate.sort((a, b) =>
      a.title.localeCompare(b.title)
    );

    setPropositionListForCandidate(propositionsForThemeAndCandidate);
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, [propositionListForCandidate]);

  if (loaded) {
    // console.log("Propositions : ", propositionListForCandidate);

    return (
      <View style={styles.container}>
        <ThemeHeader
          title={themeInfo[0].title}
          iconType={themeInfo[0].iconType}
          lightColor={themeInfo[0].lightColor}
          darkColor={themeInfo[0].darkColor}
          iconTitle={themeInfo[0].iconTitle}
        />

        <Text
          style={{
            textTransform: "uppercase",
            paddingVertical: 15,
            paddingHorizontal: 20,
          }}
        >
          PROPOSÉ PAR {themeDetails.candidateFirstName}{" "}
          {themeDetails.candidateLastName}
        </Text>

        <FlatList
          data={propositionListForCandidate}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            console.log('Proposition du candidat : ', item)
            return (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PropositionDetails", {
                  title: item.title,
                  theme: item.idTheme,
                  articleContent: item.articleContent,
                  idCandidat: item.idCandidat,
                  source: item.source,
                  id: item.id,
                  showCandidateInfo: true,
                })
              }
            >
              <PropositionListCard proposition={item} />
            </TouchableOpacity>
            // <Text>{item.title}</Text>
          )}}
        />
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
}
