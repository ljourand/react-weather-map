import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native';
import { getWeatherOfCity } from './api';
import { Dimensions } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import GradientText from './GradientText';

export default function Home({navigation}) {
  const [text, setText] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  return (
    <View style={styles.container}>
        <View style={styles.page}>
            <GradientText colors={['#C3AB11', '#EFDA52']} style={styles.title}>
                MÉTÉO APP
            </GradientText>
            <TextInput
                style={styles.cityInput}
                placeholder="Entre une ville"
                onChangeText={newText => setText(newText)}
                defaultValue={text}
            />
            <LinearGradient
                colors={['#C3AB11', '#EFDA52']}
                start={{x: 1, y: 0}}
                end={{x: 0, y: 0.1}}
                style={{borderRadius: 5}}
            >
                <Pressable
                    onPress={() => {
                        getWeatherOfCity(text).then((data) => {
                            navigation.navigate('data', {data: data})
                        })
                        .catch((error) => {
                            setErrorMsg(error.message);
                        })
                    }}
                    style={styles.buttonApi}
                >
                    <Text style={{fontWeight: "bold"}}>quel temps fait-il ?</Text>
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
        backgroundColor: '#2A2A2A',
        alignItems: 'center',
        justifyContent: 'center',
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
    title: {
        fontFamily: "Roboto",
        color: "yellow",
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
