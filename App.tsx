import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

const LANG: string = "en";
const UNITS: string = "metric";
const API_KEY: string = "YOUR_API_KEY";

function getWeatherPrompt(weather: any): string | null {
  if (!weather) {
    return "";
  }
  let cityName = weather["name"]
  let temperature = weather["main"]["temp"]
  let humidity = weather["main"]["humidity"]
  let unit = "°C"
  switch (UNITS) {
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
  return (`In ${cityName} the temperature is ${temperature}${unit} and the humidity is ${humidity}%.`)
}

function getWeatherOfCity(cityName) {
  return new Promise((resolve, reject) => {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=${LANG}&units=${UNITS}&appid=${API_KEY}`;
    let request = fetch(url);
    request.then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          resolve(data);
        })
      }
      else {
        response.json().then((data) => {
          reject(data);
        })
      }
    })
  })
}

export default function App() {
  const [text, setText] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  return (
    <View style={styles.container}>
      <Text>Météo app</Text>
      <TextInput
        style={{
          height: 40,
          borderColor: 'gray',
          borderWidth: 1,
        }}
        placeholder="Entre une ville"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Button
        onPress={() => {
          getWeatherOfCity(text).then((data) => {
            setWeather(data);
            setError(null);
          })
          .catch((error) => {
            setWeather(null);
            setError(error);
          })
        }} title="quel temps fait-il ?"
      />
      <Text>{getWeatherPrompt(weather)}</Text>
      <Text style={
        {color: "red"}
      }>{error?.message}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
