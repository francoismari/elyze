import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import styles from "./styles";
import candidatesList from "../../../assets/data/candidates/candidatesList";
import BackButton from "../../components/backButton";
import { Entypo, Feather, Ionicons } from "@expo/vector-icons";
import FavoriteCardForCandidates from "../../components/FavoriteCardForCandidates";
import {
  ImageHeaderScrollView,
  TriggeringView,
} from "react-native-image-header-scroll-view";
import { useNavigation } from "@react-navigation/core";
import themesCategory from "../../../assets/data/themes/themesCategories";

export default function CandidateProfile({ route }) {
  const navigation = useNavigation();

  const candidateRouteDetails = route.params;

  const [candidateDetails, setCandidateDetails] = useState([]);
  const [IDCandidat, setIDCandidat] = useState(0);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState();
  const [groupe, setGroupe] = useState("");
  const [_, setImage] = useState();
  const [imageProfile, setImageProfile] = useState();
  const [favorites, setFavorites] = useState([]);
  const [creditsForPicture, setCreditsForPicture] = useState("");
  const [studies, setStudies] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    /* Trouver les infos du candidat (filtre le tableau avec tous les candidats et ne retient que celui qui doit être affiché) */
    let candidateProfileDetails = candidatesList.filter(
      (d) => d.id == candidateRouteDetails.id
    );
    setCandidateDetails(
      candidateDetails.splice(
        0,
        candidateDetails.length,
        ...candidateProfileDetails
      )
    );

    const candidate = [candidateDetails];

    setIDCandidat(candidate.id);
    setFirstname(candidate.firstname);
    setLastname(candidate.lastname);
    setAge(candidate.age);
    setGroupe(candidate.groupe);
    setImage(candidate.image);
    setImageProfile(candidate.imageProfile);
    setFavorites(candidate.favorites);
    setCreditsForPicture(candidate.pictureCredits);
    setStudies(candidate.studies);

    /* On peut afficher les infos quand elles sont chargées */
    setIsLoaded(true);

    /* Pour chaque thème, filtrer uniquement ses propositions */
  }, []);

  return (
    <View style={styles.container}>
      <BackButton />
      {isLoaded ? (
        <ImageHeaderScrollView
          maxHeight={Dimensions.get("window").height * 0.3}
          minHeight={Dimensions.get("window").height * 0.14}
          headerImage={imageProfile}
          showsVerticalScrollIndicator={false}
        >
          <TriggeringView>
            <ScrollView style={{ zIndex: 10 }}>
              <View style={[styles.upTextContainer, { marginLeft: 25 }]}>
                <Text style={styles.nameText}>
                  {firstname} {lastname}
                </Text>
                <Text style={styles.ageText}>{age}</Text>
              </View>
              <View style={[styles.groupDetailsContainer, { marginLeft: 25 }]}>
                <Feather name={"map-pin"} size={24} color={"gray"} />
                <Text style={styles.groupText}>{groupe}</Text>
              </View>

              {studies ? (
                <View
                  style={[
                    styles.groupDetailsContainer,
                    { marginLeft: 25, alignItems: "flex-start" },
                  ]}
                >
                  <Ionicons name={"school-outline"} size={24} color={"gray"} />
                  <Text style={styles.groupText}>{studies}</Text>
                </View>
              ) : null}

              <FlatList
                contentContainerStyle={{ paddingLeft: 26 }}
                showsHorizontalScrollIndicator={false}
                snapToInterval={Dimensions.get("window").width * 0.8}
                snapToAlignment={"start"}
                decelerationRate={"fast"}
                style={{ marginTop: 12 }}
                data={favorites}
                keyExtractor={(item) => item.id}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                  <FavoriteCardForCandidates item={item} />
                )}
              />

              <View style={styles.separationBar} />

              <FlatList
                data={themesCategory}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                  <View>
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                      onPress={() =>
                        navigation.navigate("ThemeByCandidate", {
                          idCandidat: IDCandidat,
                          idTheme: item.id,
                          candidateLastName: lastname,
                          candidateFirstName: firstname,
                        })
                      }
                    >
                      <Text numberOfLines={1} style={styles.themeText}>
                        {item.emoji} {item.title}
                      </Text>
                      <View style={styles.themeContainer}>
                        <Entypo
                          name={"chevron-right"}
                          color={"white"}
                          size={15}
                        />
                      </View>
                    </TouchableOpacity>

                    <View style={styles.themeBottomBar} />
                  </View>
                )}
              />

              <Text
                style={{
                  marginTop: 15,
                  marginLeft: 25,
                  marginBottom: 30,
                  color: "gray",
                  fontSize: 12,
                  width: '80%'
                }}
              >
                Crédit photo du candidat : {creditsForPicture}
              </Text>
            </ScrollView>
          </TriggeringView>
        </ImageHeaderScrollView>
      ) : (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <ActivityIndicator style={{ alignSelf: "center" }} size={"large"} />
        </View>
      )}
    </View>
  );
}
