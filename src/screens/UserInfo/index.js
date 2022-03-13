import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Entypo } from "@expo/vector-icons";
import colors from "../../../assets/colors/colors";
import { Picker } from "@react-native-picker/picker";
import { API, graphqlOperation } from "aws-amplify";
import getPropositionDetails from "../../../assets/queries/getPropositionDetails";
import { Feather } from "@expo/vector-icons";
import * as Linking from "expo-linking";
import { isEmpty } from "lodash";

export default function UserInfo({ route }) {
  const navigation = useNavigation();

  const [totalSwipes, setTotalSwipes] = useState(0);
  const [mostLikedPropositionDetails, setMostLikedPropositionDetails] =
    useState([]);

  useEffect(() => {
    if (route.params) {
      const { newBirthDay, newBirthMonth, newBirthYear, newPostalCode } =
        route.params;

      if (newBirthDay) {
        setUserDayOfBirth(newBirthDay);
        setUserMonthOfBirth(newBirthMonth);
        setUserYearOfBirth(newBirthYear);
      } else if (newPostalCode) {
        setPostalCode(newPostalCode);
      }
    }
  }, [route.params]);

  function getMostReccurentResult(arr) {
    return arr
      .sort(
        (a, b) =>
          arr.filter((v) => v === a).length - arr.filter((v) => v === b).length
      )
      .pop();
  }

  const [userDayOfBirth, setUserDayOfBirth] = useState(0);
  const [userMonthOfBirth, setUserMonthOfBirth] = useState(0);
  const [userYearOfBirth, setUserYearOfBirth] = useState(0);

  const [userGenre, setUserGenre] = useState(0);

  const [postalCode, setPostalCode] = useState("");
  const [userID, setUserID] = useState("");

  const [oldVoteDecision, setOldVoteDecision] = useState("");
  const [oldVoteCandidate, setOldVoteCandidate] = useState("");
  const [newVoteCandidate, setNewVoteCandidate] = useState("");

  useEffect(async () => {
    try {
      await AsyncStorage.getItem("@userDayOfBirth").then((response) =>
        setUserDayOfBirth(response)
      );

      await AsyncStorage.getItem("@userMonthOfBirth").then((response) =>
        setUserMonthOfBirth(response)
      );

      await AsyncStorage.getItem("@userYearOfBirth").then((response) =>
        setUserYearOfBirth(response)
      );

      await AsyncStorage.getItem("@userGenre").then((response) =>
        setUserGenre(response)
      );

      await AsyncStorage.getItem("@postalCode").then((response) =>
        setPostalCode(response)
      );
      await AsyncStorage.getItem("@idUser").then(async (responseIDUser) => {
        setUserID(responseIDUser);

        const getUserOldVote =
          `query getUserOldVote {
        getUserInfo(id: "` +
          responseIDUser +
          `") {
          haveVoted
          haveVotedFor
        }
      }`;

        await API.graphql(graphqlOperation(getUserOldVote)).then((response) => {
          if (response.data.getUserInfo.haveVoted !== "") {
            if (response.data.getUserInfo.haveVoted == 1) {
              setOldVoteDecision("haveVoted");
              setOldVoteCandidate(response.data.getUserInfo.haveVotedFor);
            } else if (response.data.getUserInfo.haveVoted == 2) {
              setOldVoteDecision("haventVoted");
            } else if (response.data.getUserInfo.haveVoted == 3) {
              setOldVoteDecision("noRight");
            }
          }
        });
      });

      await AsyncStorage.getItem("@oldVoteDecision").then((response) => {
        if (response == null) {
          console.log("N'a pas encore choisi");
        } else if (response == "noRight") {
          console.log("Il n'avait pas le droit");
        } else if (response == "haveVoted") {
          console.log("Il avait voté");
        } else if (response == "haventVote") {
          console.log("N'avait pas voté");
        }
      });

      await AsyncStorage.getItem("@oldVoteCandidate").then((response) => {
        if (response !== null) {
          setOldVoteCandidate(response);
        }
      });

      await AsyncStorage.getItem("@newVoteCandidate").then((response) => {
        if (response !== null) {
          setNewVoteCandidate(response);
        }
      });
    } catch (e) {
      console.log(e);
    }

    const getTotalSwipeNumber = `query totalNumberSwipes {
          listSwipeStats(limit:1000000) {
            items {
              id
            }
          }
        }`;

    try {
      await API.graphql(graphqlOperation(getTotalSwipeNumber)).then(
        (response) => {
          setTotalSwipes(response.data.listSwipeStats.items.length);
          console.log(response.data.listSwipeStats.items.length);
        }
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
  }, []);

  const updateOldVote = async () => {
    if (oldVoteDecision !== "") {
      if (oldVoteDecision == "haveVoted") {
        if (oldVoteCandidate !== null) {
          // haveVoted : 1 -> Oui, 2 -> Non, 3 -> N'avait pas le droit

          if (oldVoteCandidate == "") {
            setOldVoteCandidate("not-shared");
          }

          // Met à jour AWS

          const updateUserOldVoteCandidate =
            `mutation updateUserOldVote {
                updateUserInfo(input: {id: "` +
            userID +
            `", haveVotedFor: "` +
            oldVoteCandidate +
            `", haveVoted: 1}) {
                  id
                }
              }`;

          try {
            await API.graphql(
              graphqlOperation(updateUserOldVoteCandidate)
            ).then(async () => {
              // Met à jour AsyncStorage
              await AsyncStorage.setItem("@oldVoteDecision", "haveVoted").then(
                () =>
                  Alert.alert(
                    "Informations mises à jour",
                    "Tes informations ont été mises à jour avec succès"
                  )
              );
            });
          } catch (e) {
            Alert.alert(
              "Erreur",
              "Une erreur s'est produite lors de la mise à jour de vos informations"
            );
            console.log(e);
          }
        }
      } else if (oldVoteDecision == "haventVoted") {
        const updateUserOldVoteCandidate =
          `mutation updateUserOldVote {
                updateUserInfo(input: {id: "` +
          userID +
          `", haveVotedFor: "", haveVoted: 2}) {
                  id
                }
              }`;

        try {
          await API.graphql(graphqlOperation(updateUserOldVoteCandidate)).then(
            async () => {
              // Met à jour AsyncStorage
              await AsyncStorage.setItem(
                "@oldVoteDecision",
                "haventVoted"
              ).then(() =>
                Alert.alert(
                  "Informations mises à jour",
                  "Tes informations ont été mises à jour avec succès"
                )
              );
            }
          );
        } catch (e) {
          Alert.alert(
            "Oups 😖",
            "Une erreur s'est produite lors de la mise à jour de tes informations"
          );
          console.log(e);
        }
      } else if (oldVoteDecision == "noRight") {
        const updateUserOldVoteCandidate =
          `mutation updateUserOldVote {
              updateUserInfo(input: {id: "` +
          userID +
          `", haveVotedFor: "", haveVoted: 3}) {
                id
              }
            }`;

        try {
          await API.graphql(graphqlOperation(updateUserOldVoteCandidate)).then(
            async () => {
              // Met à jour AsyncStorage
              await AsyncStorage.setItem("@oldVoteDecision", "noRight").then(
                () =>
                  Alert.alert(
                    "Informations mises à jour",
                    "Tes informations ont été mises à jour avec succès"
                  )
              );
            }
          );
        } catch (e) {
          Alert.alert(
            "Oups 😖",
            "Une erreur s'est produite lors de la mise à jour de tes informations"
          );
          console.log(e);
        }
      }
    }
  };

  const updateNewVoteCandidate = async () => {
    console.log(
      "Mise à jour du candidat pour qui l'utilisateur veut voter en 2022"
    );

    if (newVoteCandidate !== null) {
      // Update AWS

      const updateNewUserVoteRequest =
        `mutation updateNewUserVote {
            updateUserInfo(input: {id: "` +
        userID +
        `", willVoteFor: "` +
        newVoteCandidate +
        `"}) {
              id
            }
          }`;

      try {
        await API.graphql(graphqlOperation(updateNewUserVoteRequest)).then(
          async () => {
            // Update AsyncStorage
            await AsyncStorage.setItem(
              "@newVoteCandidate",
              newVoteCandidate
            ).then(() => {
              Alert.alert(
                "Informations mises à jour",
                "Tes informations ont été mises à jour avec succès"
              );
            });
          }
        );
      } catch (e) {
        Alert.alert("Erreur", "Réessaye dans quelques instants");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.titleHeader}>Mes informations</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          <AntDesign name={"close"} size={22} color={"white"} />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <Text style={styles.settingsCategory}>INFORMATIONS PERSONNELLES</Text>

        <View
          style={{
            width: "90%",
            backgroundColor: "#F0F0F0",
            alignSelf: "center",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15 }}>
            Date de naissance :{" "}
            {userDayOfBirth == 0 &&
            userMonthOfBirth == 0 &&
            userYearOfBirth == 0
              ? "non renseigné"
              : userDayOfBirth.length == 1
              ? "0" +
                userDayOfBirth +
                "/" +
                userMonthOfBirth +
                "/" +
                userYearOfBirth
              : userDayOfBirth + "/" + userMonthOfBirth + "/" + userYearOfBirth}
          </Text>
        </View>

        <View
          style={{
            width: "90%",
            backgroundColor: "#F0F0F0",
            alignSelf: "center",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 15 }}>
            Genre :{" "}
            {userGenre == "0"
              ? "non renseigné"
              : userGenre == "1"
              ? "Homme"
              : userGenre == "2"
              ? "Femme"
              : userGenre == "3"
              ? "ne souhaite pas répondre"
              : null}
          </Text>
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EditUserInfo", {
              toEdit: "postalCode",
            })
          }
          style={{
            width: "90%",
            backgroundColor: "#F0F0F0",
            alignSelf: "center",
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 15,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: 10,
          }}
        >
          <Text style={{ fontSize: 15 }}>
            Code postal : {postalCode == "0" ? "non renseigné" : postalCode}
          </Text>
          <Entypo name={"chevron-right"} size={20} />
        </TouchableOpacity>

        <Text style={styles.settingsCategory}>MES INTENTIONS DE VOTE</Text>

        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "🕵️ Pourquoi ELYZE me demande ces informations ?",
              "Pour te fournir un service davantage personnalisé et efficace, tu peux nous fournir tes intentions de vote pour les élections présidentielles de 2017 et de 2022. Ces données restent anonymes et tu peux les modifier ou les supprimer à tout moment. Pour en savoir plus, tu peux consulter notre politique de confidentialité."
            );
          }}
          style={{
            backgroundColor: "#E1C356",
            width: "90%",
            borderRadius: 10,
            justifyContent: "space-between",
            flexDirection: "row",
            paddingHorizontal: 10,
            paddingVertical: 10,
            alignItems: "center",
            marginBottom: 10,
            alignSelf: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text>💡</Text>
            <Text style={{ marginLeft: 10, color: "white", width: "80%" }}>
              Tu n'es pas obligé de fournir ces informations : ELYZE ne les
              récolte qu'à des fins de statistiques. Appuie pour en savoir plus.
            </Text>
          </View>
          <View style={{ marginRight: 5 }}>
            <AntDesign name={"pluscircle"} size={20} color={"white"} />
          </View>
        </TouchableOpacity>

        <View style={styles.sectionContainer}>
          <Text style={styles.subCategory}>
            As-tu voté aux élections présidentielles de 2017 ?
          </Text>

          <View
            style={{
              alignItems: "center",
              justifyContent: "space-evenly",
              flexDirection: "row",
              marginTop: 10,
            }}
          >
            <TouchableOpacity
              onPress={() => setOldVoteDecision("haveVoted")}
              style={{
                width: "44%",
                height: 50,
                backgroundColor:
                  oldVoteDecision == "haveVoted" ? colors.primary : "white",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>👍</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setOldVoteDecision("haventVoted");
                setOldVoteCandidate("");
              }}
              style={{
                width: "44%",
                height: 50,
                backgroundColor:
                  oldVoteDecision == "haventVoted" ? colors.primary : "white",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text>👎</Text>
            </TouchableOpacity>
          </View>
          <View>
            <TouchableOpacity
              onPress={() => {
                setOldVoteDecision("noRight");
                setOldVoteCandidate("");
              }}
              style={{
                width: "90%",
                height: 50,
                backgroundColor:
                  oldVoteDecision == "noRight" ? colors.primary : "white",
                marginTop: 10,
                alignSelf: "center",
                borderRadius: 10,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: oldVoteDecision == "noRight" ? "white" : "black",
                  fontSize: 15,
                  fontWeight: "bold",
                }}
              >
                JE N'AVAIS PAS LE DROIT 🤷‍♀️
              </Text>
            </TouchableOpacity>
          </View>

          {oldVoteDecision == "haveVoted" ? (
            <View>
              <Picker
                style={{ marginHorizontal: 10 }}
                selectedValue={oldVoteCandidate}
                onValueChange={(itemValue) => {
                  setOldVoteCandidate(itemValue);
                }}
              >
                <Picker.Item
                  label={"Ne souhaite pas répondre"}
                  value={"not-shared"}
                />
                <Picker.Item label={"Nathalie Arthaud"} value={"arthaud"} />
                <Picker.Item
                  label={"François Asselineau"}
                  value={"asselineau"}
                />
                <Picker.Item label={"Jacques Cheminade"} value={"cheminade"} />
                <Picker.Item
                  label={"Nicolas Dupont-Aignan"}
                  value={"dupont-aignan"}
                />
                <Picker.Item label={"François Fillon"} value={"fillon"} />
                <Picker.Item label={"Benoît Hamon"} value={"hamont"} />
                <Picker.Item label={"Jean Lassalle"} value={"lassalle"} />
                <Picker.Item label={"Marine Le Pen"} value={"le-pen"} />
                <Picker.Item label={"Emmanuel Macron"} value={"macron"} />
                <Picker.Item label={"Jean-Luc Mélenchon"} value={"melenchon"} />
                <Picker.Item label={"Philippe Poutou"} value={"poutou"} />
              </Picker>
            </View>
          ) : null}

          <TouchableOpacity
            style={{
              width: "90%",
              height: 50,
              backgroundColor: colors.primary,
              marginTop: 10,
              alignSelf: "center",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => {
              updateOldVote();
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                textTransform: "uppercase",
              }}
            >
              Mettre à jour
            </Text>
          </TouchableOpacity>
        </View>

        <View style={[styles.sectionContainer, { marginTop: 15 }]}>
          <Text style={styles.subCategory}>
            Pour qui penses-tu voter aux élections présidentielles de 2022 ?
          </Text>

          <Picker
            style={{ marginHorizontal: 10 }}
            selectedValue={newVoteCandidate}
            onValueChange={(itemValue) => {
              setNewVoteCandidate(itemValue);
            }}
          >
            <Picker.Item
              label={"Ne souhaite pas répondre"}
              value={"not-shared"}
            />
            <Picker.Item label={"😣 Aucune idée"} value={"no-idea"} />
            <Picker.Item label={"Nathalie Arthaud"} value={"arthaud"} />
            <Picker.Item label={"François Asselineau"} value={"asselineau"} />
            <Picker.Item
              label={"Nicolas Dupont-Aignan"}
              value={"dupont-aignan"}
            />
            <Picker.Item label={"Anne Hidalgo"} value={"hidalgo"} />
            <Picker.Item label={"Yannick Jadot"} value={"jadot"} />
            <Picker.Item label={"Jean Lassalle"} value={"lassalle"} />
            <Picker.Item label={"Marine Le Pen"} value={"le-pen"} />
            <Picker.Item label={"Emmanuel Macron"} value={"macron"} />
            <Picker.Item label={"Jean-Luc Mélenchon"} value={"melenchon"} />
            <Picker.Item label={"Arnaud Montebourg"} value={"montebourg"} />
            <Picker.Item label={"Valérie Pécresse"} value={"pecresse"} />
            <Picker.Item label={"Florian Philippot"} value={"philippot"} />
            <Picker.Item label={"Philippe Poutou"} value={"poutou"} />
            <Picker.Item label={"Fabien Roussel"} value={"roussel"} />
            <Picker.Item label={"Éric Zemmour"} value={"zemmour"} />
          </Picker>

          <TouchableOpacity
            onPress={() => updateNewVoteCandidate()}
            style={{
              width: "90%",
              height: 50,
              backgroundColor: colors.primary,
              marginTop: 10,
              alignSelf: "center",
              borderRadius: 10,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: 20,
                textTransform: "uppercase",
              }}
            >
              Mettre à jour
            </Text>
          </TouchableOpacity>
        </View>

        {/* <Text style={styles.settingsCategory}>STATISTIQUES GLOBALES</Text> */}

        {/* <View
          style={[
            styles.sectionContainer,
            { backgroundColor: "#DCC468", alignItems: "center" },
          ]}
        >
          <Text style={{ fontSize: 35, marginBottom: 10 }}>🗳</Text>
          <Text style={styles.sectionTitle}>
            Nombre total de swipes réalisés sur ELYZE par l'ensemble des
            utilisateurs
          </Text>
          {totalSwipes == 0 ? (
            <ActivityIndicator
              style={{ marginTop: 20, marginBottom: 20 }}
              size={"small"}
              color={"white"}
            />
          ) : (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <Text style={styles.dataText}>
                {totalSwipes == 0 ? "..." : totalSwipes} swipes
              </Text>
              <Text style={{ marginTop: 5, color: "white" }}>
                (depuis le 31/12/2021)
              </Text>
            </View>
          )}
        </View>

        <View
          style={[
            styles.sectionContainer,
            { backgroundColor: "#D85F71", alignItems: "center", marginTop: 15 },
          ]}
        >
          <Text style={{ fontSize: 35, marginBottom: 10 }}>👀</Text>
          <Text style={styles.sectionTitle}>Proposition la plus populaire</Text>
          {mostLikedPropositionDetails.title == "" ? (
            <ActivityIndicator size={"small"} color={"white"} />
          ) : (
            <Text
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: 18,
                marginHorizontal: 20,
                color: "white",
                fontWeight: "300",
              }}
            >
              {mostLikedPropositionDetails.title}
            </Text>
          )}
        </View> */}

        <TouchableOpacity
          onPress={() =>
            Linking.openURL(
              "https://nifty-option-15c.notion.site/Politique-de-confidentialit-d-ELYZE-563c3cdb31c9465da8e6749c0c4760d1"
            )
          }
          style={{
            marginTop: 15,
            marginBottom: 5,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            paddingHorizontal: 20,
          }}
        >
          <Feather name={"external-link"} color={"#2C6EB9"} size={15} />
          <Text style={{ color: "#2C6EB9", marginLeft: 5 }}>
            Politique de confidentialité & CGU
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () =>
            await AsyncStorage.getItem("@idUser").then((res) => Alert.alert('Identifiant unique', res))
          }
          style={{
            marginTop: 5,
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
            if (userID !== "") {
              const deleteDataRequest =
                `mutation deleteUserInfo {
                    updateUserInfo(input: {id: "` +
                userID +
                `", postalCode: "0", willVoteFor: "", haveVotedFor: "", haveVoted: 0, dayBirth: 0, monthBirth: 0, yearBirth: 0, genre: 0}) {
                      id
                    }
                  }
                  `;

              try {
                await API.graphql(graphqlOperation(deleteDataRequest)).then(
                  async () => {
                    await AsyncStorage.setItem("@oldVoteDecision", "");
                    await AsyncStorage.setItem("@oldVoteCandidate", "");
                    await AsyncStorage.setItem("@newVoteCandidate", "");
                    await AsyncStorage.setItem("@postalCode", "0");
                    await AsyncStorage.setItem("@userGenre", "0");
                    await AsyncStorage.setItem("@userDayOfBirth", "0");
                    await AsyncStorage.setItem("@userMonthOfBirth", "0");
                    await AsyncStorage.setItem("@userYearOfBirth", "0").then(
                      () => {
                        Alert.alert(
                          "Données supprimées",
                          "Tes informations ont bien été supprimées de nos serveurs, il est cependant possible que celles-ci s'affichent toujours pendant un cours instant sur ton écran."
                        );
                      }
                    );
                  }
                );
              } catch (e) {
                Alert.alert("Erreur", "Réessaye dans quelques instants");
              }
            } else {
              Alert.alert("Erreur", "Réessaye dans quelques instants");
            }
          }}
          style={{ marginTop: 5, marginBottom: 60, marginHorizontal: 10 }}
        >
          <Text style={{ textAlign: "center", fontSize: 18 }}>
            Supprimer mes données
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
