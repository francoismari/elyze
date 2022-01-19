import React from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import themesCategories from "../../../assets/data/themes/themesCategories";
import BackButton from "../../components/backButton";
import ThemeCard from "../../components/ThemeCard";

import styles from "./styles";

export default function AllThemesList() {
  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.header}>
        <BackButton />
        <View style={{ marginTop: 65 }}>
          <Text
            style={styles.titleText}
          >
            Tous les thèmes
          </Text>
        </View>
      </SafeAreaView>

      <FlatList
      contentContainerStyle={{ paddingTop: 20, paddingBottom: 20 }}
      data={themesCategories}
      keyExtractor={(item) => item.id}
      renderItem={({item}) => <ThemeCard theme={item} />}
      />
    </View>
  );
}
