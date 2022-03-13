import React from "react";
import { Dimensions, StyleSheet } from "react-native";

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 20,
    },
    teamTitle: {
        fontSize: width*0.09,
        marginBottom: 15,
        marginTop: 30,
        fontWeight: 'bold'
    }
});

export default styles;
