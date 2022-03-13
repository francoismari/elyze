import { View, Text, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import team from "../../../assets/data/team";
import TeamCard from "../../components/teamCard";
import styles from './styles'

export default function Team() {
  const [com, setCom] = useState([]);

  useEffect(() => {
    const comTeam = team.filter((e) => e.role === "com");

    console.log(comTeam);

    setCom(comTeam);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.teamTitle}>L'équipe</Text>

      <FlatList
        data={com}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <TeamCard
            profile={{
              id: 1,
              firstName: item.firstName,
              lastName: item.lastName,
              role: "Co-créateur",
              social: item.social,
              imageURI: item.imageURI,
            }}

            showImage={false}
          />
        )}
      />
    </View>
  );
}
