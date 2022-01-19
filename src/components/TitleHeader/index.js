import React from 'react'
import { View, Text } from 'react-native'
import styles from './styles'

export default function TitleHeader(props) {

    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{props.title}</Text>
        </View>
    )
}
