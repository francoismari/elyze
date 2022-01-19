import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ScrollView,
  Image,
} from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import resetData from "../../../assets/queries/resetData";
import { Entypo, Feather } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { API, graphqlOperation } from "aws-amplify";

export default function Settings() {
  const navigation = useNavigation();

  const deleteData = async () => {
    Alert.alert(
      "Attention",
      "Ceci effacera ton score et tes choix de propositions, es-tu sûr de vouloir continuer ?",
      [
        {
          text: "Annuler",
          onPress: () => {
            console.log("Données non supprimées");
          },
        },
        {
          text: "Supprimer",
          onPress: async () => {
            try {
              await resetData().then(() =>
                Alert.alert(
                  "Score réinitialisé",
                  "Ton score a été réinitialisé avec succès"
                )
              );
            } catch (e) {
              console.log(e);
            }
          },
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleHeader}>Paramètres</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <AntDesign name={"close"} size={22} color={"white"} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text style={styles.settingsCategory}>🗳 MES RÉSULTATS</Text>

        <View style={styles.sectionContainer}>
          <Text style={[styles.helpText, { paddingHorizontal: 15 }]}>
            Tes résultats enregistrés sur cet appareil peuvent être
            réinitialisés en cliquant sur le bouton ci-dessous.
          </Text>
          {/* <TouchableOpacity
            onPress={async () => {
              await AsyncStorage.removeItem("@isSetUp2");
            }}
            style={styles.eraseButton}
          >
            <Text style={styles.eraseButtonText}>Recommencer le set up</Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => deleteData()}
            style={styles.eraseButton}
          >
            <Text style={styles.eraseButtonText}>
              Réinitialiser mes résultats
            </Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.settingsCategory}>🙋‍♂️ Aide</Text>

        <View style={[styles.sectionContainer, { paddingHorizontal: 15 }]}>
          <Text style={styles.helpTitleText}>Comment ça fonctionne ?</Text>
          <Text style={styles.helpText}>
            Devant une proposition, glisse ton doigt vers la droite si tu es en
            accord avec celle-ci, vers la gauche si tu es en désaccord, ou vers
            le bas si tu n'as pas de préférence. Tu peux également utiliser les
            boutons en dessous pour chaque choix. Retrouve ensuite tes résultats
            dans le deuxième onglet.
          </Text>
          <Text style={styles.helpTitleText}>
            Comment ELYZE détermine mes résultats ?
          </Text>
          <Text style={styles.helpText}>
            Le "score" d'un candidat correspond à la proportion de "likes" parmi
            l'ensemble des propositions swipées pour ce candidat.
          </Text>
          <Text style={styles.helpTitleText}>
            Mes résultats me paraissent incohérents ou "extrêmes"
          </Text>
          <Text style={styles.helpText}>
            Si tu obtiens des résultats "extrêmes" (comme 100% ou 0%) sur
            beaucoup de candidats, continue à swiper pour les affiner. Il est
            normal que ceux-ci soient très élevés ou très faibles au départ,
            mais plus tu swiperas et plus cela évoluera !
          </Text>
          <Text style={styles.helpTitleText}>
            Est-ce que les membres d'ELYZE peuvent connaître mon orientation
            politique ?
          </Text>
          <Text style={styles.helpText}>
            Non, tes données personnelles sont traitées anonymement et tes
            opinions politiques restent pour toi. Si tu veux en savoir plus, tu
            peux consulter notre politique de confidentialité.
          </Text>
        </View>

        <Text style={styles.settingsCategory}>👋🏼 À propos</Text>
        <View style={[styles.sectionContainer, { paddingHorizontal: 15 }]}>
          <Text>
            ELYZE a été développé avec ❤️ à Paris et Montréal par Grégoire
            CAZCARRA & François MARI.
          </Text>
          <Text style={{ marginTop: 10 }}>
            Avec les bénévoles du mouvement
            <Text style={{ fontStyle: "italic" }}> Les Engagés !</Text>, Gaspard
            G, et Wallerand MOULLÉ-BERTEAUX.
          </Text>
        </View>

        <Text style={styles.settingsCategory}>🤗 Remerciements</Text>
        <View style={styles.sectionContainer}>
          <Text style={{ marginBottom: 2, paddingHorizontal: 15 }}>
            Cloé Artaut · Gaston Anton Leon · Victor Barthes · Thibaut Chancy ·
            Alexis Costa · Enzo Gabriel · Garance Hablot · Victor Jacquet · Anna
            Koulakssis · Loup Laurent · Marie Lafarge · Océanne Lewden · Maxime
            Mazuel · Octavien Maury · Camilo Pallasco · Swann Payan · Louison
            Poilvet · Baptiste Salis · Julia Thebault Laurier · Julie Wright
          </Text>
        </View>

        <Text numberOfLines={1} style={styles.settingsCategory}>
          Bibliothèques Open Source
        </Text>
        <View
          style={[
            styles.sectionContainer,
            { marginBottom: 15, paddingHorizontal: 15 },
          ]}
        >
          <Text>
            · React Native Deck Swiper © Copyright 2018 Alexandre Brillant
          </Text>
          <Text>
            · React Native Image Header Scroll View © Copyright 2017 BAM
          </Text>
          <Text>
            · React Native Onboarding Swiper © Copyright Johannes Filter, 2017
          </Text>
          <Text>· React Native Popup-confirm-toast © 2019 NY Samnang</Text>
        </View>

        <TouchableOpacity
          onPress={() => Linking.openURL("mailto:salut@elyze.co")}
          style={{
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Feather name={"mail"} color={"#2C6EB9"} size={15} />
          <Text style={{ color: "#2C6EB9", marginLeft: 5 }}>
            Nous contacter / Signaler un problème
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://nifty-option-15c.notion.site/Politique-de-confidentialit-d-ELYZE-563c3cdb31c9465da8e6749c0c4760d1"
            )
          }
          style={{
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Feather name={"external-link"} color={"#2C6EB9"} size={15} />
          <Text style={{ color: "#2C6EB9", marginLeft: 5 }}>
            Politique de confidentialité & mentions légales
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () =>
            await AsyncStorage.getItem("@idUser").then((res) =>
              Alert.alert("Identifiant unique", res)
            )
          }
          style={{
            marginBottom: 5,
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Text style={{ color: "#2C6EB9", marginLeft: 5 }}>
            Obtenir mon identifiant unique
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.getItem("@idUser").then(async (res) => {
              console.log("identifiant : ", res);
              const deleteDataRequest =
                `mutation deleteUserInfo {
                    updateUserInfo(input: {id: "` +
                res +
                `", postalCode: "0", willVoteFor: "", haveVotedFor: "", haveVoted: 0, dayBirth: 0, monthBirth: 0, yearBirth: 0, genre: 0}) {
                      id
                    }
                  }
                  `;

              try {
                await API.graphql(graphqlOperation(deleteDataRequest)).then(
                  async () => {
                    Alert.alert(
                      "Données supprimées",
                      "Tes informations ont bien été supprimées de nos serveurs."
                    );
                  }
                );
              } catch (e) {
                Alert.alert("Erreur", "Réessaye dans quelques instants");
              }
            });
          }}
          style={{ marginTop: 5, marginBottom: 20, marginHorizontal: 10 }}
        >
          <Text style={{ textAlign: "center", fontSize: 18 }}>
            Supprimer mes données
          </Text>
        </TouchableOpacity>

        <Image
          source={require("../../../assets/icon.png")}
          style={{
            height: 40,
            width: 40,
            alignSelf: "center",
            borderRadius: 8,
            marginBottom: 10,
          }}
        />

        <Text style={{ textAlign: "center", marginBottom: 35 }}>
          © ELYZE APP 2022
        </Text>
      </ScrollView>
    </View>
  );
}
