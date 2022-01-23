import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import BackButton from "../../components/backButton";
import styles from "./styles";
import {
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  MaterialIcons,
  Entypo,
} from "@expo/vector-icons";
import { API, graphqlOperation } from "aws-amplify";

import { useNavigation } from "@react-navigation/core";
import PropositionListCard from "../../components/PropositionListCard";
import findThemeTitle from "../../../assets/queries/findThemeTitle";
import ThemeHeader from "../../components/ThemeHeader";

export default function ListPropositions({ route }) {
  const navigation = useNavigation();

  const propositionInfo = route.params;

  const [propositions, setPropositions] = useState([]);
  const [themeDetails, setThemeDetails] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(async () => {
    const themeInfo = findThemeTitle(propositionInfo.themeID);
    setThemeDetails(themeInfo);

    const getPropositionsForTheme =
      `query getPropositionsForThemeAndCandidate {
      listPropositions(filter: {idTheme: {eq: ` +
      propositionInfo.themeID +
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

    await API.graphql(graphqlOperation(getPropositionsForTheme)).then((res) => {
      var propsForTheme = res.data.listPropositions.items;
      propsForTheme.sort((a, b) => a.title.localeCompare(b.title));

      setPropositions(propsForTheme);
    });
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
                      title: item.title,
                      theme: item.theme,
                      articleContent: item.articleContent,
                      idCandidat: item.idCandidat,
                      showCandidateInfo: true,
                    })
                  }
                >
                  <PropositionListCard propositionID={item.id} />
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
