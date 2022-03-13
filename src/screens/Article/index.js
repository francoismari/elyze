import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";

import HTMLView from "react-native-htmlview";
import BackButton from "../../components/backButton";
import styles from "./styles";

export default function Article({ route }) {
  const articleInfo = route.params;

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <BackButton />
      <SafeAreaView>
      <ScrollView>
        <Text style={styles.titleText}>{articleInfo.title}</Text>
        <ScrollView style={styles.contentContainer}>
          <HTMLView value={articleInfo.content} stylesheet={styles} />
        </ScrollView>
      </ScrollView>
      </SafeAreaView>
    </View>
  );
}
