import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";

import LearnCard from "../../components/learnCard";
import learnCategories from "../../../assets/data/more/learnCategories";
import PartnerCard from "../../components/PartnerCard";
import partners from "../../../assets/data/more/partners";
import engagementList from "../../../assets/data/more/engagementList";
import ResponsiveTitle from "../../components/ResponsiveTitle";

import { API, graphqlOperation } from "aws-amplify";
import getPropositionDetails from "../../../assets/queries/getPropositionDetails";

export default function More() {
  const [totalSwipes, setTotalSwipes] = useState(0);
  const [mostLikedPropositionDetails, setMostLikedPropositionDetails] =
    useState([]);

  function getMostReccurentResult(arr) {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  }

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const getTotalSwipeNumber = `query totalNumberSwipes {
        listSwipeStats(limit:1000000) {
          items {
            id
          }
        }
      }`;

      try {
        await API.graphql(graphqlOperation(getTotalSwipeNumber)).then(
          (response) =>
            setTotalSwipes(response.data.listSwipeStats.items.length)
        );
      } catch (e) {
        console.log(e);
      }

      const getMostReccuringLikes = `query mostReccuringLikes {
        listSwipeStats(filter: {rating: {eq: "like"}}, limit: 10000000) {
          items {
            idProposition
          }
        }
      }`;

      try {
        await API.graphql(graphqlOperation(getMostReccuringLikes)).then(
          (response) => {
            const reccuringPropositionID = getMostReccurentResult(
              response.data.listSwipeStats.items
            ).idProposition;
            const propositionDetails = getPropositionDetails(
              parseInt(reccuringPropositionID)
            );

            setMostLikedPropositionDetails(propositionDetails[0]);
          }
        );
      } catch (e) {
        console.log(e);
      }
    }, 3000);

    return () => clearInterval(intervalId); //This is important
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ResponsiveTitle title={"Statistiques"} />

      <ScrollView>
        <View style={[styles.sectionContainer, { backgroundColor: "#DCC468" }]}>
          <Text style={{ fontSize: 35, marginBottom: 10 }}>🗳</Text>
          <Text style={styles.sectionTitle}>
            Nombre total de votes réalisés sur ELYZE
          </Text>
          {totalSwipes == 0 ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.dataText}>
                {totalSwipes == 0 ? "..." : totalSwipes} swipes
              </Text>
              <Text style={{ marginTop: 5, color: "white" }}>
                (depuis le 11/12/2021)
              </Text>
            </View>
          )}
        </View>

        <View style={[styles.sectionContainer, { backgroundColor: "#D85F71" }]}>
        <Text style={{ fontSize: 35, marginBottom: 10 }}>👀</Text>
          <Text style={styles.sectionTitle}>Proposition la plus populaire</Text>
          {mostLikedPropositionDetails.title == "" ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text>{mostLikedPropositionDetails.title}</Text>
          )}
        </View>

        
      </ScrollView>
    </SafeAreaView>
  );
}
