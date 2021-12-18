
import React, { useState, useEffect } from 'react';
import axios from 'axios'

const WeatherTemp = ({temperature}) => <div> <strong>temperature:</strong> {Math.round(temperature.temp -273)} Celsius</div>

const WeatherWind= ({wind}) => {

    const mps2mph =(mps) => {
        const mph = +((2.23694 * mps).toFixed(2));
        return mph;
      }

    const degToCardinal = (deg) => {
        const cardinal = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW']
        const ix = Math.round(deg / (360 / cardinal.length))
        
        return(
            cardinal[ix % cardinal.length]
        )
    }

    const cardinal = degToCardinal(wind.deg)
    console.log(cardinal)

    return(
    <div> <strong>Wind: </strong>{Math.round(mps2mph(wind.speed))} mph direction  {cardinal}</div>
    )
}

const WeatherIcon = (props) =>  {
    console.log('weather: ',props.icon[0].icon)
    const icon = props.icon[0].icon
    const url = `http://openweathermap.org/img/wn/${icon}@2x.png`
    
    return(<><img src={url}></img><br/></>)
}


const Weather = (props) => {
    const [weather, setWeather] = useState([])

    const api_key = process.env.REACT_APP_API_KEY
    const hookW = () => {

        axios
            .get('https://api.openweathermap.org/data/2.5/weather', {
                params: {
                    q: props.capital,
                    appid: api_key
                }
            })
            .then(response => {
                console.log(response.data)
                setWeather(response.data)
            })
    }

    useEffect(hookW, [])
    if(weather.length===0) {
        return <div>no weather</div>
    }
    return (
        <div>
            <h2>Weather in {weather.name}</h2>
            <WeatherTemp visibility={weather.visibility}  temperature={weather.main} />
            <WeatherIcon icon={weather.weather}/>
            <WeatherWind wind={weather.wind} />
        </div>
    )
}
export default Weather
