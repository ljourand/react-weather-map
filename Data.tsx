import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { WeatherData, CONFIG } from './api';
import { Dimensions } from 'react-native'
import GradientText from './GradientText';

function getWeatherPrompt(weather: WeatherData | null): string {
    if (!weather) {
      return "";
    }
    const cityName = weather.name;
    const temperature = weather.main.temp;
    const humidity = weather.main.humidity;
    let unit = "°C";
    switch (CONFIG.UNITS) {
      case "standard":
        unit = "K";
        break;
      case "imperial":
        unit = "°F"
        break;
      case "metric":
        unit = "°C"
        break;
    }
    return (`A ${cityName} la température est de ${temperature}${unit} est l'humidité est de ${humidity}%.`)
  }

export default function Data({navigation, route}) {
    const data: WeatherData = route.params.data;

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => {
                    navigation.navigate("home");
                }}
            >
                <Text style={styles.backButton}>go back</Text>
            </Pressable>
            <View style={styles.page}>
                <GradientText colors={['#C3AB11', '#EFDA52']} style={styles.title}>
                    {data.name}
                </GradientText>
                {/* <Text style={styles.title}>{data.name}</Text> */}
                <Text style={{color: "white"}}>{getWeatherPrompt(data)}</Text>
                <StatusBar style="auto" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        color: "yellow",
        fontSize: 30,
        textAlign: "center"
    },
    container: {
        flex: 1,
        backgroundColor: '#2A2A2A',
        // alignItems: 'center',
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
        color: "white",
    }
});
