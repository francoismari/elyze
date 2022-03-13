import {
  View,
  Text,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";

import styles from "./styles";
import { useNavigation } from "@react-navigation/native";

export default function Election() {
  const navigation = useNavigation();

  const [registerPageIndex, setRegisterPageIndex] = useState(1);

  const currentDate = new Date();
  const electionDate = new Date("04/10/2022");
  const diffTime = Math.abs(electionDate - currentDate);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffDays + " jours avant le premier tour");

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text
          style={{
            fontSize: Dimensions.get("window").width * 0.085,
            marginLeft: 25,
            marginBottom: 7,
            width: 250,
            fontWeight: "bold",
          }}
        >
          L'élection
        </Text>
      </View>
      <ScrollView>
        <View style={styles.electionCountdown}>
          <Text style={styles.electionIcon}>🗳</Text>
          <Text style={styles.diffTimeText}>J-{diffDays}</Text>
          <Text style={styles.electionText}>Avant le premier tour</Text>
        </View>

        <Text style={styles.subTitleText}>
          M'inscrire sur les listes éléctorales
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate("Eligible")}
          style={styles.isEligibleContainer}
        >
          <Text style={styles.isEligibleText}>
            Suis-je éligible au vote ? 🤔
          </Text>
        </TouchableOpacity>

        <View style={styles.timerBeforeRegisterContainer}>
          <View style={styles.timerContainer}>
            <Text>J-30</Text>
          </View>
          <View style={styles.timerContainer}>
            <Text>J-30</Text>
          </View>
        </View>

        <View style={styles.registerOnListContainer}>
          <View style={styles.registerOnListMenu}>
            <TouchableOpacity
              onPress={() => setRegisterPageIndex(1)}
              style={[
                styles.registerOnListMenuButton,
                {
                  backgroundColor: registerPageIndex == 1 ? "#4669C3" : "white",
                },
              ]}
            >
              <Text
                style={{ color: registerPageIndex == 1 ? "white" : "#4669C3" }}
              >
                🇫🇷 Je suis en France
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setRegisterPageIndex(2)}
              style={[
                styles.registerOnListMenuButton,
                {
                  backgroundColor: registerPageIndex == 2 ? "#4669C3" : "white",
                },
              ]}
            >
              <Text
                style={{ color: registerPageIndex == 2 ? "white" : "#4669C3" }}
              >
                🌍 Je suis à l'étranger
              </Text>
            </TouchableOpacity>
          </View>

          {registerPageIndex == 1 ? (
            <View
              style={{
                paddingHorizontal: 10,
                marginTop: 7,
                marginBottom: 10,
                flexDirection: "row",
              }}
            >
              <TouchableOpacity style={styles.verifyRegisterOnListButtonContainer}>
                <Text>Vérifier mon inscription</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.registerOnListButtonContainer}>
                <Text>M'inscrire</Text>
              </TouchableOpacity>
            </View>
          ) : registerPageIndex == 2 ? (
            <View
              style={{ paddingHorizontal: 10, marginTop: 7, marginBottom: 10 }}
            >
              <Text style={{ color: "white" }}>
                Instructions si on est à l'étranger
              </Text>
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
}
