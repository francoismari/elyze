import { useNavigation } from "@react-navigation/core";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import candidatesList from "../../../assets/data/candidates/candidatesList";
import ByCandidateCard from "../../components/ByCandidateCard";
import PropositionThemeCard from "../../components/PropositionThemeCard";
import styles from "./styles";
import ResponsiveTitle from "../../components/ResponsiveTitle";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Propositions() {
  const navigation = useNavigation();

  const [candidateShowList, setCandidateShowList] = useState([]);

  useEffect(() => {
    const sortedCandidateList = candidatesList.sort((a, b) =>
      a.lastname.localeCompare(b.lastname)
    );
    setCandidateShowList(sortedCandidateList);
  }, []);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView>
        <ResponsiveTitle title={'Parcourir les propositions'} />

        <View style={styles.lineContainer}>
          <PropositionThemeCard
            title={"Environnement"}
            bgColor={"#25AD5B"}
            icon={"leaf"}
            iconColor={"#147139"}
            iconType={"FontAwesome5"}
            themeID={1}
          />
          <PropositionThemeCard
            title={"Économie"}
            bgColor={"#EFE160"}
            icon={"euro"}
            iconColor={"#AE9F16"}
            iconType={"FontAwesome"}
            themeID={2}
          />
        </View>
        <View style={styles.lineContainer}>
          <PropositionThemeCard
            title={"Éducation"}
            bgColor={"#C04F7E"}
            icon={"school"}
            iconColor={"#8E2953"}
            iconType={"MaterialCommunityIcons"}
            themeID={3}
          />
          <PropositionThemeCard
            title={"Solidarités & santé"}
            bgColor={"#E092CF"}
            icon={"healing"}
            iconColor={"#A84793"}
            iconType={"MaterialIcons"}
            themeID={4}
          />
        </View>
        <View style={styles.lineContainer}>
          <PropositionThemeCard
            title={"Société"}
            bgColor={"#A165B6"}
            icon={"family-restroom"}
            iconColor={"#6A2283"}
            iconType={"MaterialIcons"}
            themeID={8}
          />
          <PropositionThemeCard
            title={"International"}
            bgColor={"#5054AF"}
            icon={"globe"}
            iconColor={"#2E3395"}
            iconType={"Entypo"}
            themeID={6}
          />
        </View>

        <TouchableOpacity
          style={styles.showAllButton}
          onPress={() => navigation.navigate("AllThemesList")}
        >
          <Text style={styles.showAllText}>TOUT AFFICHER</Text>
        </TouchableOpacity>

        <View>
          <Text style={styles.byPresidentText}>Par candidat</Text>
        </View>

        <View>
          <FlatList
            data={candidateShowList}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ByCandidateCard
                idCandidate={item.id}
                firstname={item.firstname}
                lastname={item.lastname}
                bgColor={item.bgColor}
                image={item.image}
                firstLinearColor={item.firstLinearColor}
                secondLinearColor={item.secondLinearColor}
              />
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
