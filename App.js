import React, { useState, useEffect, useRef } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
} from "react-native";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

import { FontAwesome5, Octicons, Entypo } from "@expo/vector-icons";
import colors from "./assets/colors/colors";
import * as Haptics from "expo-haptics";
import * as Device from "expo-device";

import Onboarding from "react-native-onboarding-swiper";

import Home from "./src/screens/Home";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enableScreens } from "react-native-screens";

import Article from "./src/screens/Article";
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

import Team from "./src/screens/Team";
import FirstScreen from "./src/screens/Set-upScreens/First";
import SecondScreen from "./src/screens/Set-upScreens/Second";
import FavoritesPropositions from "./src/screens/FavoritesPropositions";
import ShareToSocial from "./src/screens/Share";
import Eligible from "./src/screens/Eligible";
import ThirdScreen from "./src/screens/Set-upScreens/Third";

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
        tabBarIcon: ({ color, size }) => (
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
        tabBarIcon: ({ color, size }) => (
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
        tabBarIcon: ({ color, size }) => (
          <Octicons name={"tasklist"} color={color} size={35} />
        ),
      }}
    />
    {/* <Tab.Screen
      name={"Election"}
      component={Election}
      listeners={() => ({
        tabPress: () => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        },
      })}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name={"how-to-vote"} color={color} size={35} />
        ),
      }}
    /> */}
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
              name={"Article"}
              component={Article}
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
            <Stack.Screen
              name={"FavoritesPropositions"}
              component={FavoritesPropositions}
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
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name={"Team"}
                component={Team}
                options={{ headerShown: false }}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name={"Share"}
                component={ShareToSocial}
                options={{ headerShown: false }}
              />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: "modal" }}>
              <Stack.Screen
                name={"Eligible"}
                component={Eligible}
                options={{ headerShown: false }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  } else {
    const toggleDoneSetUp = async () => {
      try {
        await AsyncStorage.setItem("@isSetUp2", "true").then(async () => {
          setIsSetUp(true);
          // Utilisateur inscrit
        });
      } catch (e) {
        Alert.alert(
          "Oups 😖",
          "Une erreur est survenue, réessaye dans quelques instants"
        );
      }
    };

    return (
      <Onboarding
        onDone={() => toggleDoneSetUp()}
        pages={[
          {
            backgroundColor: "#DE3D59",
            image: <FirstScreen />,
            title: null,
            subtitle: null,
          },
          {
            backgroundColor: "#63A5C1",
            image: <SecondScreen />,
            title: null,
            subtitle: null,
          },
          {
            backgroundColor: "#4F3AA8",
            image: <ThirdScreen />,
            title: null,
            subtitle: null,
          },
          {
            backgroundColor: "#DE3D59",
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
                  🤝
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
                  Avant de commencer
                </Text>

                <Text
                  style={{
                    paddingHorizontal: 30,
                    textAlign: "center",
                    color: "white",
                    fontWeight: "500",
                    marginTop: -10,
                    fontSize: 20,
                  }}
                >
                  Aucune donnée n'est collectée par ELYZE lors de l'utilisation
                  de l'app 🕵️
                </Text>

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
        nextLabel={
          <View
            style={{
              width: 35,
              height: 35,
              backgroundColor: "white",
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Entypo name={"chevron-right"} size={24} color={colors.primary} />
          </View>
        }
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
    paddingHorizontal: Dimensions.get("window").width * 0.19,
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
