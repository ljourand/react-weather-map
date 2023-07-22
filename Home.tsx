import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { getWeatherOfCity } from './api';
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';

import { vw, vh } from 'react-native-expo-viewport-units';
import { BACKGROUND_COLOR, GRADIENT_1_COLOR, GRADIENT_2_COLOR, PRIMARY_COLOR } from './colors';

export default function Home({navigation}) {
    const [text, setText] = useState('');
    const [errorMsg, setErrorMsg] = useState(null);

    return (
        <View style={styles.container}>
            <View style={styles.page}>
                <Text style={styles.title}>
                    MÉTÉO APP
                </Text>
                <TextInput
                    style={styles.cityInput}
                    placeholder="Entre une ville"
                    onChangeText={newText => setText(newText)}
                    defaultValue={text}
                />
                <LinearGradient
                    colors={[GRADIENT_1_COLOR, GRADIENT_2_COLOR]}
                    start={{x: 1, y: -1}}
                    end={{x: 0, y: 0}}
                    style={{borderRadius: 5}}
                >
                    <Pressable
                        onPress={() => {
                            getWeatherOfCity(text).then((data) => {
                                setErrorMsg(null);
                                setText('');
                                navigation.navigate('data', {data: data})
                            })
                            .catch((error) => {
                                setErrorMsg(error.message);
                            })
                        }}
                        style={styles.buttonApi}
                    >
                        <Text style={{fontWeight: "bold", fontSize: 15}}>QUEL TEMPS FAIT-IL ?</Text>
                    </Pressable>
                </LinearGradient>
                <Text style={styles.errorText}>{errorMsg}</Text>
                <StatusBar style="auto" />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        justifyContent: 'center',
    },
    page: {
        flex: 1,
        gap: vh(5),
        alignItems: 'center',
        height: vh(100),
        paddingTop: vh(15),
        paddingLeft: vw(10),
        paddingRight: vw(10),
    },
    title: {
        // fontFamily: "Roboto",
        color: PRIMARY_COLOR,
        fontSize: 70,
        fontWeight: "bold",
        textAlign: "center"
    },
    cityInput: {
        height: 40,
        borderWidth: 0,
        borderRadius: 5,
        backgroundColor: "white",
        width: Dimensions.get("window").width * 0.7,
        paddingLeft: 15
    },
    errorText: {
        color: "red"
    },
    buttonApi: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 20,
        paddingRight: 20,
    },
});
