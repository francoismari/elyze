import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { useNavigation } from "@react-navigation/core";
import PropositionListCard from "../../components/PropositionListCard";
import findThemeTitle from "../../../assets/queries/findThemeTitle";
import ThemeHeader from "../../components/ThemeHeader";

import firstPropositions from "../../../assets/data/propositions/firstPropositions";
import propositionsList from "../../../assets/data/propositions/propositionsList";

var firstPropositionsArray = JSON.parse(JSON.stringify(firstPropositions));
var propositionsListArray = JSON.parse(JSON.stringify(propositionsList));

export default function ListPropositions({ route }) {
  const navigation = useNavigation();

  const propositionInfo = route.params;

  const [propositions, setPropositions] = useState([]);
  const [themeDetails, setThemeDetails] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    const themeInfo = findThemeTitle(propositionInfo.themeID);
    setThemeDetails(themeInfo);

    var propositionsForThemeForFP = firstPropositionsArray.filter(
      (proposition) => proposition.idTheme == propositionInfo.themeID
    );

    var propositionsForThemeForAP = propositionsListArray.filter(
      (proposition) => proposition.idTheme == propositionInfo.themeID
    );

    const propsForTheme = propositionsForThemeForFP.concat(
      propositionsForThemeForAP
    );

    propsForTheme.sort((a, b) => a.title.localeCompare(b.title));

    setPropositions(propsForTheme);
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, [propositions]);

  if (loaded) {
    return (
      <View style={styles.container}>
        <ThemeHeader
          title={themeDetails[0].title}
          iconType={themeDetails[0].iconType}
          lightColor={themeDetails[0].lightColor}
          darkColor={themeDetails[0].darkColor}
          iconTitle={themeDetails[0].iconTitle}
        />
        <View style={{ flex: 1 }}>
          {loaded ? (
            <FlatList
              data={propositions}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("PropositionDetails", {
                      id: item.id,
                      title: item.title,
                      theme: item.idTheme,
                      articleContent: item.articleContent,
                      idCandidat: item.idCandidat,
                      source: item.source,
                      showCandidateInfo: true,
                    })
                  }
                  style={[
                    styles.container,
                    { height: item.showCandidateName !== false ? 100 : 80 },
                  ]}
                >
                  <PropositionListCard proposition={item} />
                </TouchableOpacity>
              )}
            />
          ) : (
            <View style={{ alignItems: "center", justifyContent: "center" }}>
              <ActivityIndicator
                size={"large"}
                style={{ alignSelf: "center" }}
              />
            </View>
          )}
        </View>
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
