import react from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default resetData = async () => {

  await AsyncStorage.removeItem("@passed_propositions");

  for (let i = 1 ; i < 17 ; i++){
    await AsyncStorage.removeItem("@likeListCandidate_" + i);
    await AsyncStorage.removeItem("@dislikeListCandidate_" + i);
    await AsyncStorage.removeItem("@superLikeListCandidate_" + i);
    await AsyncStorage.removeItem("@score_candidat_" + i);
    await AsyncStorage.removeItem("@scoreDislike_candidat_" + i);
  }
};