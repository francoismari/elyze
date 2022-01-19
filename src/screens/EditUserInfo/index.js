import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  AppRegistry,
  Alert,
} from "react-native";
import styles from "./styles";
import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API, graphqlOperation } from "aws-amplify";

export default function EditUserInfo({ route }) {
  const navigation = useNavigation();

  const [dayOfBirth, setDayOfBirth] = useState("");
  const [monthOfBirth, setMonthOfBirth] = useState("");
  const [yearOfBirth, setYearOfBirth] = useState("");

  const [postalCode, setPostalCode] = useState("");
  const [userID, setUserID] = useState("");

  const itemToModifie = route.params.toEdit;

  useEffect(async () => {
    if (itemToModifie == "birthDate") {
      await AsyncStorage.getItem("@userDayOfBirth").then((response) => {
        setDayOfBirth(response);
      });

      await AsyncStorage.getItem("@userMonthOfBirth").then((response) => {
        setMonthOfBirth(response);
      });

      await AsyncStorage.getItem("@userYearOfBirth").then((response) => {
        setYearOfBirth(response);
      });
    } else if (itemToModifie == "postalCode") {
      await AsyncStorage.getItem("@postalCode").then((response) => {
        setPostalCode(response);
      });
    }

    await AsyncStorage.getItem("@idUser").then((response) => {
      setUserID(response);
    });
  }, []);

  const updateData = async (item) => {
    if (item == "birthDate") {
      const newUserAge = 2021 - yearOfBirth;
      console.log(userID);

      if (
        dayOfBirth !== "" &&
        monthOfBirth !== "" &&
        yearOfBirth !== "" &&
        monthOfBirth <= 12 &&
        yearOfBirth > 1900 &&
        newUserAge > 13 &&
        dayOfBirth <= 31
      ) {
        // Mettre à jour AWS

        const updateUserBirthYear =
          `mutation editBirthYear {
        updateUserInfo(input: {id: "` +
          userID +
          `", yearBirth: ` +
          parseInt(yearOfBirth) +
          `, dayBirth: ` +
          parseInt(dayOfBirth) +
          `, monthBirth: ` +
          parseInt(monthOfBirth) +
          `})
      }`;

        console.log(updateUserBirthYear);

        try {
          await API.graphql(graphqlOperation(updateUserBirthYear)).then(
            async () => {
              // Mettre à jour AsyncStorage
              await AsyncStorage.setItem("@userDayOfBirth", dayOfBirth);
              await AsyncStorage.setItem("@userMonthOfBirth", monthOfBirth);
              await AsyncStorage.setItem("@userYearOfBirth", yearOfBirth).then(
                () =>
                  navigation.navigate("UserInfo", {
                    newBirthDay: dayOfBirth,
                    newBirthMonth: monthOfBirth,
                    newBirthYear: yearOfBirth,
                  })
              );
            }
          );
        } catch (e) {
          Alert.alert("Oups 😖", "Une erreur s'est produite.");
          console.log(e);
        }
      } else {
        Alert.alert("Oups 😖", "La date de naissance entrée est invalide.");
      }

      // console.log("Test");
    } else if (item == "postalCode") {
      if (postalCode !== null && postalCode !== "") {
        // Mettre à jour AWS

        const updatePostalCode =
          `mutation updatePostalCode {
        updateUserInfo(input: {id: "` +
          userID +
          `", postalCode: "` +
          postalCode +
          `"}) {
          id
        }
      }`;

        try {
          await API.graphql(graphqlOperation(updatePostalCode)).then(
            async () => {
              // Mettre à jour AsyncStorage
              await AsyncStorage.setItem("@postalCode", postalCode).then(() =>
                navigation.navigate("UserInfo", { newPostalCode: postalCode })
              );
            }
          );
        } catch (e) {
          Alert.alert(
            "Impossible de mettre à jour",
            "Une erreur s'est produite"
          );
        }
      }
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.closeButton}
      >
        <AntDesign name={"close"} size={22} color={"white"} />
      </TouchableOpacity>

      {itemToModifie == "birthDate" ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginHorizontal: 50,
          }}
        >
          <TextInput
            onChangeText={(text) => setDayOfBirth(text)}
            style={styles.editText}
            placeholder={dayOfBirth !== "0" ? dayOfBirth : "Jour"}
            autoCorrect={false}
            autoComplete={false}
            autoFocus={true}
            keyboardType={"numeric"}
            contextMenuHidden={true}
          />
          <TextInput
            onChangeText={(text) => setMonthOfBirth(text)}
            style={styles.editText}
            placeholder={monthOfBirth !== "0" ? monthOfBirth : "Mois"}
            autoCorrect={false}
            autoComplete={false}
            keyboardType={"numeric"}
            contextMenuHidden={true}
          />
          <TextInput
            onChangeText={(text) => setYearOfBirth(text)}
            style={styles.editText}
            placeholder={yearOfBirth !== "0" ? yearOfBirth : "Année"}
            autoCorrect={false}
            autoComplete={false}
            keyboardType={"numeric"}
            contextMenuHidden={true}
          />
        </View>
      ) : itemToModifie == "postalCode" ? (
        <TextInput
          onChangeText={(text) => setPostalCode(text)}
          style={styles.editText}
          placeholder={postalCode}
          autoCorrect={false}
          autoComplete={false}
          autoFocus={true}
          keyboardType={"numeric"}
          contextMenuHidden={true}
        />
      ) : null}

      <TouchableOpacity
        onPress={() => updateData(itemToModifie)}
        style={styles.updateButton}
      >
        <Text style={styles.updateButtonText}>METTRE À JOUR</Text>
      </TouchableOpacity>
    </View>
  );
}
