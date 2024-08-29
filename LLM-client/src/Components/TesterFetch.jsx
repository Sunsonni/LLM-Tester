import { useState } from 'react'
import { Button } from 'reactstrap'

const TesterFetch = () => {
    const [ weather, setWeather ] = useState([]);
    const weatherFetch = async () => {
        const weatherResponse = await fetch('http://localhost:5280/weatherforecast');
        if(weatherResponse.ok) {
            const weatherData = await weatherResponse.json();
            setWeather(weatherData);
            console.log(weatherData);
        } else {
            console.log("Couldn't set weather data");
        }
    }

    return (
        <>
        {console.log(weather)}
        <Button onClick={weatherFetch}>Click Here</Button>
        </>
    );
    
}

export default TesterFetch;