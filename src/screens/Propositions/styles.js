import react from "react";
import { Dimensions, StyleSheet } from "react-native";
import colors from "../../../assets/colors/colors";

const width = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    favoriteButtonContainer: {
        height: 55,
        width: 55,
        backgroundColor: colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        marginRight: 30
    },
    lineContainer: {
        marginTop: 3,
        marginBottom: 14,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    showAllButton: {
        alignSelf: 'center',
        width: width*0.89,
        height: 40,
        borderRadius: 10,
        backgroundColor: colors.primary,
        justifyContent: 'center',
        alignItems: 'center'
    },
    showAllText: {
        fontSize: 17,
        fontWeight: '500',
        color: 'white'
    },
    byPresidentText: {
        marginLeft: 20,
        marginTop: 25,
        marginBottom: 11,
        fontSize: 30,
        fontWeight: 'bold',
    }
});

export default styles;