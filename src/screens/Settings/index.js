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
import TeamCard from "../../components/teamCard";
import team from "../../../assets/data/team";
import { FlatList } from "react-native-gesture-handler";

export default function Settings() {
  const navigation = useNavigation();

  const [founders, setFounders] = useState([]);

  useEffect(() => {
    const foundersTeam = team.filter((e) => e.role === "founder");

    console.log(foundersTeam);

    setFounders(foundersTeam);
  }, []);

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
            Est-ce que ELYZE collecte mes données ?
          </Text>
          <Text style={styles.helpText}>
            Non, ELYZE ne collecte aucune donnée lors de l'utilisation de
            l'application.
          </Text>
          <Text style={styles.helpTitleText}>
            Comment ELYZE détermine mes résultats ?
          </Text>
          <Text style={styles.helpText}>
            Le score d'un candidat est calculé de la façon suivante : un point
            pour un "like", deux pour un "super-like", et moins un pour un
            "dislike" (les votes "Je ne sais pas" ne sont pas comptabilisés).
          </Text>
          <Text style={styles.helpTitleText}>
            Mes résultats me paraissent incohérents
          </Text>
          <Text style={styles.helpText}>
            Si tu obtiens des résultats que tu considères comme incohérents,
            continue à voter pour affiner tes résultats !
          </Text>
          <Text style={styles.helpTitleText}>
            Est-ce que je peux utiliser ELYZE sans connexion internet ?
          </Text>
          <Text style={styles.helpText}>
            Oui ! ELYZE ne nécessite aucune connexion internet pour fonctionner.
          </Text>
        </View>

        <Text style={styles.settingsCategory}>👋🏼 À propos</Text>
        <View style={[styles.sectionContainer, { paddingHorizontal: 15 }]}>
          <FlatList
            data={founders}
            keyExtractor={(item) => item.id}
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
              />
            )}
          />

          {/* <TouchableOpacity
          onPress={() => navigation.navigate('Team')}
            style={{
              height: 35,
              backgroundColor: "#F33C53",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>
              TOUT AFFICHER
            </Text>
          </TouchableOpacity> */}
          <Text style={{ fontSize: 17 }}>
            ELYZE a été développé avec ❤️ à Paris et Montréal avec les bénévoles
            du mouvement
            <Text style={{ fontStyle: "italic", fontWeight: "bold" }}>
              {" "}
              Les Engagés !
            </Text>
            , <Text style={{ fontWeight: "bold" }}>Gaspard G</Text>, et{" "}
            <Text style={{ fontWeight: "bold" }}>
              Wallerand MOULLÉ-BERTEAUX
            </Text>
            .
          </Text>
        </View>

        <Text style={styles.settingsCategory}>🤗 Remerciements</Text>
        <View style={styles.sectionContainer}>
          <Text style={{ marginBottom: 2, paddingHorizontal: 15 }}>
            Cloé Artaut · Gaston Anton Leon · Victor Barthes · Thibaut Chancy ·
            Alexis Costa · Louis de Benoist · Enzo Gabriel · Fanny Graffin ·
            Garance Hablot · Victor Jacquet · Anna Koulakssis · Loup Laurent ·
            Marie Lafarge · Océanne Lewden · Maxime Mazuel · Octavien Maury ·
            Camilo Pallasco · Swann Payan · Louison Poilvet · Baptiste Salis ·
            Julia Thebault Laurier · Julie Wright
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
            marginBottom: 10,
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
              "https://nifty-option-15c.notion.site/Mentions-l-gales-d-ELYZE-903b50418a2a4ef59fe9361b37f59c54"
            )
          }
          style={{
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Feather name={"external-link"} color={"#2C6EB9"} size={15} />
          <Text style={{ color: "#2C6EB9", marginLeft: 5 }}>
            Mentions légales
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://nifty-option-15c.notion.site/Politique-de-confidentialit-d-ELYZE-563c3cdb31c9465da8e6749c0c4760d1"
            )
          }
          style={{
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Feather name={"external-link"} color={"#2C6EB9"} size={15} />
          <Text style={{ color: "#2C6EB9", marginLeft: 5 }}>
            Conditions générales d'utilisation
          </Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
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
        </TouchableOpacity> */}

        <Image
          source={require("../../../assets/icon.png")}
          style={{
            height: 40,
            width: 40,
            alignSelf: "center",
            borderRadius: 8,
            marginTop: 10,
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
