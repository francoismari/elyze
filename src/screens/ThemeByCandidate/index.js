import React, { useEffect, useState } from "react";
import {
  View,
  Text,
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

export default function ThemeByCandidate({ route }) {
  const themeDetails = route.params;

  const navigation = useNavigation();

  const [themeInfo, setThemeInfo] = useState([]);
  const [propositionListForCandidate, setPropositionListForCandidate] =
    useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    setThemeInfo(findThemeTitle(themeDetails.idTheme));

    const getPropositionsForThemeCandidateQuery =
      `query getPropositionsForThemeAndCandidate {
      listPropositions(filter: {idCandidat: {eq: ` +
      themeDetails.idCandidat +
      `}, idTheme: {eq: ` +
      themeDetails.idTheme +
      `}}, limit: 1000) {
        nextToken
        items {
          id
          idCandidat
          idTheme
          source
          title
          toBeShownFirst
          toShowOnSwipe
          firstPropositions
          createdAt
          articleContent
        }
      }
    }`;

    await API.graphql(
      graphqlOperation(getPropositionsForThemeCandidateQuery)
    ).then((res) => {
      // console.log(res);
      var propsForThemeAndCandidate = res.data.listPropositions.items
      propsForThemeAndCandidate.sort((a, b) => a.title.localeCompare(b.title));
      setPropositionListForCandidate(propsForThemeAndCandidate);
    });
  }, []);

  useEffect(() => {
    setLoaded(true);
  }, [propositionListForCandidate]);

  if (loaded) {
    console.log("Propositions : ", propositionListForCandidate);

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
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PropositionDetails", {
                  title: item.title,
                  theme: item.idTheme,
                  articleContent: item.articleContent,
                  idCandidat: item.idCandidat,
                  showCandidateInfo: true,
                  source: item.source,
                })
              }
            >
              <PropositionListCard propositionID={item.id} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  } else {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
}
