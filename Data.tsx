import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, TouchableOpacity, Platform, StatusBar } from 'react-native';
import { WeatherData } from './api';
import { Dimensions } from 'react-native'

import { Feather } from '@expo/vector-icons'; 
import Tooltip from "react-native-walkthrough-tooltip";
import { BACKGROUND_COLOR, PRIMARY_COLOR } from './colors';

export default function Data({navigation, route}) {
    const data: WeatherData = route.params.data;
    const [showTipTemp, setTipTemp] = useState(false);
    const [showTipHumidity, setTipHumidity] = useState(false);

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Text style={styles.backButton}>
                    Retour
                </Text>
            </Pressable>
            <View style={styles.page}>
                <Text style={styles.title}>
                    {data.name}
                </Text>
                <View style={styles.info}>
                    <Tooltip
                        isVisible={showTipTemp}
                        content={
                            <Text> Température </Text>
                        }
                        onClose={() => setTipTemp(false)}
                        placement="bottom"
                        topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
                    >
                        <TouchableOpacity
                            style={styles.touchable}
                            onPress={() => setTipTemp(true)}
                        >
                            <View style={styles.card}>
                                <Feather name="thermometer" size={24} color="black" />
                                <Text>
                                    { `${data.main.temp}°C`}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Tooltip>
                    <Tooltip
                        isVisible={showTipHumidity}
                        content={
                            <Text> Humidité </Text>
                        }
                        onClose={() => setTipHumidity(false)}
                        placement="bottom"
                        topAdjustment={Platform.OS === 'android' ? -StatusBar.currentHeight : 0}
                    >
                        <TouchableOpacity
                            style={styles.touchable}
                            onPress={() => setTipHumidity(true)}
                        >
                            <View style={styles.card}>
                                <Feather name="droplet" size={24} color="black" />
                                <Text>
                                    { `${data.main.humidity}%`}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </Tooltip>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: PRIMARY_COLOR,
        fontSize: 30,
        textAlign: "center",
    },
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        justifyContent: 'center',
        paddingTop: 50,
        padding: 20
    },
    page: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        paddingTop: Dimensions.get("window").height * 0.2,
        paddingBottom: Dimensions.get("window").height * 0.2,
        paddingLeft: Dimensions.get("window").width * 0.1,
        paddingRight: Dimensions.get("window").width * 0.1,
    },
    backButton: {
        color: "#D5B626",
    },
    info: {
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-between",
        width: Dimensions.get("window").width * 0.8,
    },
    card: {
        backgroundColor: "rgba(255,255,255,0.2)",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        paddingTop: 30,
        paddingBottom: 30,
    },
    touchable: {
        width: Dimensions.get("window").width * 0.4 - 10
    }
});
