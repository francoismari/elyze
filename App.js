import Amplify from "aws-amplify";
import { API, graphqlOperation } from "aws-amplify";

import config from "./src/aws-exports";

Amplify.register(API);

Amplify.configure(config);

import React, { useState, useEffect, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  Switch,
} from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

import {
  FontAwesome5,
  Octicons,
} from "@expo/vector-icons";
import colors from "./assets/colors/colors";
import * as Haptics from "expo-haptics";

import Onboarding from "react-native-onboarding-swiper";

import Home from "./src/screens/Home";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from "react-native-screens";

import Propositions from "./src/screens/Propositions";
import ListPropositions from "./src/screens/ListPropositions";
import CandidateProfile from "./src/screens/CandidateProfile";
import Results from "./src/screens/Results";
import PropositionDetails from "./src/screens/PropositionDetails";
import Settings from "./src/screens/Settings";
import AllThemesList from "./src/screens/AllThemesList";
import { SafeAreaProvider } from "react-native-safe-area-context";
import ThemeByCandidate from "./src/screens/ThemeByCandidate";
import CandidatesResults from "./src/screens/CandidatesResults";
import AsyncStorage from "@react-native-async-storage/async-storage";

import * as Linking from "expo-linking";

enableScreens();
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarStyle: styles.tabBar,
      tabBarActiveTintColor: colors.newPrimary,
      tabBarShowLabel: false,
      headerShown: false,
    }}
  >
    <Tab.Screen
      name={"Home"}
      component={Home}
      listeners={() => ({
        tabPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      })}
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name={"vote-yea"} color={color} size={35} />
        ),
      }}
    />
    <Tab.Screen
      name={"Resultats"}
      component={Results}
      listeners={() => ({
        tabPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      })}
      options={{
        tabBarIcon: ({ color }) => (
          <FontAwesome5 name={"award"} color={color} size={35} />
        ),
      }}
    />
    <Tab.Screen
      name={"Propositions"}
      component={Propositions}
      listeners={() => ({
        tabPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      })}
      options={{
        tabBarIcon: ({ color }) => (
          <Octicons name={"tasklist"} color={color} size={35} />
        ),
      }}
    />
  </Tab.Navigator>
);

export default function App() {
  const [isSetUp, setIsSetUp] = useState(true);
  const [hasAccepted, setHasAccepted] = useState(false);

  useEffect(async () => {
    try {
      await AsyncStorage.getItem("@isSetUp2").then((response) => {
        if (response == null) {
          setIsSetUp(false);
        }
      });
    } catch (e) {
      console.log(e);
    }
  }, []);

  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert(
        "L'appareil ne doit pas être un simulateur pour recevoir les notifications"
      );
    }

    if (Platform.OS === "android") {
      Notifications.setNotificationChannelAsync("default", {
        name: "default",
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: "#FF231F7C",
      });
    }

    return token;
  }

  if (isSetUp) {
    return (
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name={"TabNavigator"}
              component={TabNavigator}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={"ListPropositions"}
              component={ListPropositions}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={"CandidateProfile"}
              component={CandidateProfile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={"AllThemesList"}
              component={AllThemesList}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name={"ThemeByCandidate"}
              component={ThemeByCandidate}
              options={{ headerShown: false }}
            />
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name={"PropositionDetails"}
                component={PropositionDetails}
                options={{ headerShown: false }}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name={"Settings"}
                component={Settings}
                options={{ headerShown: false }}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name={"CandidateResults"}
                component={CandidatesResults}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  } else {
    const toggleDoneSetUp = async () => {
      if (hasAccepted) {
        try {

          await AsyncStorage.setItem("@isSetUp2", "true").then(async () => {
            // Vérifier si l'utilisateur à accepté les CGU et l'ajouter à AWS
            const newUserRequest = `mutation addNewUser {
                createUserInfo(input: {postalCode: "00000"}) {
                  id
                }
              }`;

            try {
              await API.graphql(graphqlOperation(newUserRequest)).then(
                async (response) => {
                  console.log(response);
                  await AsyncStorage.setItem(
                    "@idUser",
                    response.data.createUserInfo.id
                  ).then(() => {
                    setIsSetUp(true);
                    // Utilisateur inscrit
                  });
                }
              );
            } catch (e) {
              console.log();
            }
          });
        } catch (e) {
          console.log(e);
        }
      } else {
        Alert.alert(
          "Erreur",
          "Vous devez accepter nos CGU et notre politique de confidentialité pour pouvoir utiliser Elyze."
        );
      }
    };

    return (
      <Onboarding
        onDone={() => toggleDoneSetUp()}
        pages={[
          {
            backgroundColor: colors.primary,
            image: (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    marginTop: Dimensions.get("window").width * 0.09,
                    fontSize: Dimensions.get("window").width * 0.08,
                    marginHorizontal: 30,
                    color: "white",
                    fontWeight: "bold",
                    marginBottom: Dimensions.get("window").width * 0.08,
                    textAlign: "center",
                  }}
                >
                  Bienvenue sur ELYZE
                </Text>
                <Image
                  style={{
                    height: Dimensions.get("window").width * 0.7,
                    resizeMode: "contain",
                  }}
                  source={require("./assets/images/set-up/step-1.png")}
                />
                <Text
                  style={{
                    marginHorizontal: 45,
                    textAlign: "center",
                    color: "white",
                    fontSize: Dimensions.get("window").width * 0.06,
                    marginBottom: 50,
                    fontWeight: "500",
                    marginTop: Dimensions.get("window").width * 0.08,
                  }}
                >
                  Swipe les propositions et découvre le candidat fait pour toi
                </Text>
              </View>
            ),
            title: null,
            subtitle: null,
          },
          {
            backgroundColor: colors.primary,
            image: (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    marginTop: Dimensions.get("window").width * 0.09,
                    fontSize: Dimensions.get("window").width * 0.08,
                    marginHorizontal: 30,
                    color: "white",
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  🏅
                </Text>
                <Text
                  style={{
                    fontSize: Dimensions.get("window").width * 0.08,
                    marginHorizontal: 30,
                    color: "white",
                    fontWeight: "bold",
                    marginBottom: Dimensions.get("window").width * 0.08,
                    textAlign: "center",
                  }}
                >
                  Accède à un classement détaillé
                </Text>
                <Image
                  style={{
                    height: Dimensions.get("window").width * 0.7,
                    resizeMode: "contain",
                  }}
                  source={require("./assets/images/set-up/step-2.png")}
                />
                <Text
                  style={{
                    marginHorizontal: 45,
                    textAlign: "center",
                    color: "white",
                    fontSize: Dimensions.get("window").width * 0.06,
                    marginBottom: 50,
                    fontWeight: "500",
                    marginTop: Dimensions.get("window").width * 0.08,
                  }}
                >
                  Découvre tes affinités politiques selon tes choix pour chaque
                  candidat
                </Text>
              </View>
            ),
            title: null,
            subtitle: null,
          },
          {
            backgroundColor: colors.primary,
            image: (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Text
                  style={{
                    marginTop: Dimensions.get("window").width * 0.09,
                    fontSize: Dimensions.get("window").width * 0.08,
                    marginHorizontal: 30,
                    color: "white",
                    fontWeight: "bold",
                    marginBottom: 10,
                    textAlign: "center",
                  }}
                >
                  🗳
                </Text>
                <Text
                  style={{
                    fontSize: Dimensions.get("window").width * 0.08,
                    marginHorizontal: 30,
                    color: "white",
                    fontWeight: "bold",
                    marginBottom: Dimensions.get("window").width * 0.08,
                    textAlign: "center",
                  }}
                >
                  Découvre les propositions
                </Text>
                <Image
                  style={{
                    height: Dimensions.get("window").width * 0.7,
                    resizeMode: "contain",
                  }}
                  source={require("./assets/images/set-up/step-3.png")}
                />
                <Text
                  style={{
                    marginHorizontal: 45,
                    textAlign: "center",
                    color: "white",
                    fontSize: Dimensions.get("window").width * 0.06,
                    marginBottom: 50,
                    fontWeight: "500",
                    marginTop: Dimensions.get("window").width * 0.08,
                  }}
                >
                  Explore l'ensemble des propositions, par thème et par candidat
                </Text>
              </View>
            ),
            title: null,
            subtitle: null,
          },
          {
            backgroundColor: colors.primary,
            image: (
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: -25,
                }}
              >
                <Text
                  style={{
                    marginHorizontal: 40,
                    textAlign: "center",
                    color: "white",
                    fontSize: Dimensions.get("window").width * 0.09,
                    marginBottom: Dimensions.get("window").width * 0.2,
                    fontWeight: "bold",
                    marginTop: -60,
                  }}
                >
                  🧙‍♂️
                </Text>
                <Text
                  style={{
                    marginHorizontal: 40,
                    textAlign: "center",
                    color: "white",
                    fontSize: Dimensions.get("window").width * 0.07,
                    marginBottom: Dimensions.get("window").width * 0.08,
                    fontWeight: "bold",
                    marginTop: -60,
                  }}
                >
                  Plus qu'une étape !
                </Text>

                <View
                  style={{
                    alignItems: "center",
                    marginHorizontal: 60,
                    flexDirection: "row",
                    marginTop: 10,
                    justifyContent: "center",
                  }}
                >
                  <Switch
                    style={{ marginTop: 5 }}
                    trackColor={{ false: "#767577", true: "#81b0ff" }}
                    thumbColor={hasAccepted ? "#FFFFFF" : "#f4f3f4"}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={() =>
                      setHasAccepted((previousState) => !previousState)
                    }
                    value={hasAccepted}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      Linking.openURL(
                        "https://nifty-option-15c.notion.site/Politique-de-confidentialit-d-ELYZE-563c3cdb31c9465da8e6749c0c4760d1"
                      )
                    }
                    style={{ marginLeft: 10 }}
                  >
                    <Text
                      style={{
                        color: "white",
                        textAlign: "left",
                        fontSize: Dimensions.get("window").width * 0.041,
                        marginTop: 7,
                      }}
                    >
                      J'accepte
                      <Text>
                        <Text style={{ color: "#0557A3" }}>
                          {" "}
                          les conditions générales d'utilisation et la politique
                          de confidentialité d'ELYZE
                        </Text>
                      </Text>
                    </Text>
                  </TouchableOpacity>
                </View>

                <Text style={{paddingHorizontal: 30, textAlign: 'center', color: 'white', fontWeight: '500', marginTop: 20}}>Aucune donnée personnelle n'est collectée par ELYZE lors de l'utilisation de l'app 🕵️</Text>

                <TouchableOpacity
                  onPress={() => toggleDoneSetUp()}
                  style={styles.endSetUpButton}
                >
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "bold",
                      color: colors.primary,
                    }}
                  >
                    CONTINUER
                  </Text>
                </TouchableOpacity>
              </View>
            ),
            title: null,
            subtitle: null,
          },
        ]}
        showDone={false}
        showSkip={false}
        nextLabel={"Suivant"}
        bottomBarHeight={80}
      />
    );
  }
}

const styles = StyleSheet.create({
  tabBar: {
    height: Dimensions.get("window").height * 0.13,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
    paddingHorizontal: Dimensions.get("window").width * 0.18,
  },
  textInputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.07,
    borderRadius: Dimensions.get("window").height * 0.015,
    backgroundColor: "white",
    fontSize: Dimensions.get("window").width * 0.05,
  },
  genreButtonContainer: {
    width: Dimensions.get("window").width * 0.23,
    height: Dimensions.get("window").height * 0.06,
    borderRadius: Dimensions.get("window").height * 0.015,
    alignItems: "center",
    justifyContent: "center",
  },
  textInputContainerForBirth: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: Dimensions.get("window").width * 0.8,
    height: Dimensions.get("window").height * 0.07,
    borderRadius: Dimensions.get("window").height * 0.015,
    backgroundColor: "white",
    fontSize: Dimensions.get("window").width * 0.05,
    borderWidth: 1,
    borderColor: "#D85F71",
  },
  endSetUpButton: {
    position: "absolute",
    bottom: -Dimensions.get("window").height * 0.09,
    height: Dimensions.get("window").width * 0.12,
    width: "75%",
    backgroundColor: "white",
    borderRadius: Dimensions.get("window").height * 0.02,
    justifyContent: "center",
    alignItems: "center",
  },
});
