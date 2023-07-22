# react-weather-map

![Alt text](images/home.PNG?raw=true "Home")

![Alt text](images/info.PNG?raw=true "Title")

This is a simple react App that ask the user to enter a city and output the current temperature and humidity at this place.

The app is using the open weather map api: https://openweathermap.org/

# Requirements

You should have an open weather map api key and replace the variable API_KEY in the "api.ts" file

You can also set the unit for the temperature in the "api.ts" file with the variable UNITS, the possible values are:
- "standard" for kelvins
- "metric" for celsius
- "imperial" for fahrenheit

You also need node and npm to be installed

# Run the program

Run ```npm i``` to install dependencies.

Run ```npx expo start``` then you can press 'w' to open in a browser or scan the QR code in the expo go app on your phone.
