import { View, Text, Image, TouchableOpacity, Share } from "react-native";
import React, { useRef } from "react";
import styles from "./styles";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function ShareToSocial({ route }) {
  const navigation = useNavigation();

  console.log("Premier : ", route.params.first);
  console.log("Deuxième : ", route.params.second.image);
  console.log("Troisième : ", route.params.third.image);

  const viewRef = useRef();

  // download image
  const shareImage = async () => {
    try {
      // react-native-view-shot caputures component
      const uri = await captureRef(viewRef, {
        format: "jpg",
        quality: 1.0,
      });

      console.log(uri);

      if (!(await Sharing.isAvailableAsync())) {
        alert(
          `Le partage des résultats n'est pas disponible sur ton appareil 😣`
        );
        return;
      } else {
        const imageResultsOptions = {
          mimeType: "image/jpeg",
          dialogTitle: "Mes résultats",
        };

        Share.share(
          {
            message:
              "Voici mes résultats avec #Elyze à partir de " +
              route.params.numberOfSwipes +
              " votes ! @ElyzeApp sur l'App Store et le Play Store https://linktr.ee/elyze.app",
            url: "file://" + uri,
            title: "Wow, did you see that?",
          },
          {
            // Android only:
            dialogTitle: "Share BAM goodness",
          }
        );

        // await Sharing.shareAsync("file://" + uri, imageResultsOptions);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.shareResultsText}>Partager mes résultats</Text>
      <View ref={viewRef} style={styles.imageToShare}>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Image
            style={styles.logo}
            source={require("../../../assets/images/logo-header.png")}
          />
          <Text>@elyze.app</Text>
          <Text style={styles.resultsText}>Mes résultats</Text>
          <Text style={styles.numberOfSwipesText}>
            À partir de {route.params.numberOfSwipes} votes
          </Text>
        </View>
        <View
          style={[
            styles.secondColumn,
            { backgroundColor: route.params.second.bgColor },
          ]}
        >
          <Image
            style={[styles.candidateProfilImage, { borderColor: "lightgray" }]}
            source={route.params.second.image}
          />
          <Text
            style={{
              color: "white",
              marginTop: 5,
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            #2
          </Text>
        </View>
        <View
          style={[
            styles.firstColumn,
            { backgroundColor: route.params.first.bgColor },
          ]}
        >
          <Image
            style={[styles.candidateProfilImage, { borderColor: "gold" }]}
            source={route.params.first.image}
          />
          <Text
            style={{
              color: "white",
              marginTop: 5,
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            #1
          </Text>
        </View>
        <View
          style={[
            styles.thirdColumn,
            { backgroundColor: route.params.third.bgColor },
          ]}
        >
          <Image
            style={[styles.candidateProfilImage, { borderColor: "#E9AB81" }]}
            source={route.params.third.image}
          />
          <Text
            style={{
              color: "white",
              marginTop: 5,
              fontWeight: "bold",
              fontSize: 15,
            }}
          >
            #3
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => shareImage()}
        style={styles.moreOptionButton}
      >
        <Feather name={"share"} size={20} color={"white"} />
        <Text style={styles.moreOptionText}>Partager mes résultats</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <Text style={styles.moreOptionText}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );
}
