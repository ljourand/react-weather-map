const LANG: string = "fr";
const UNITS: string = "metric";
const API_KEY: string = "YOUR_API_KEY";

export interface WeatherData {
    name: string;
    main: {
        temp: number
        humidity: number
    }
}

export function getWeatherOfCity(cityName: string): Promise<WeatherData> {
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