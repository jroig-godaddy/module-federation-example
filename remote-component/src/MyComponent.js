import React, { useState, useEffect } from 'react';
import superagent from 'superagent'; // Import superagent for making HTTP requests


const MyComponent = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const weatherReport = await superagent.get('https://api.weather.gov/gridpoints/PSR/165,59/forecast')
          .timeout({
            response: 5000,  // Wait 5 seconds for the server to start sending,
            deadline: 60000, // but allow 1 minute for the file to finish loading.
          })
        console.log('weatherReport', weatherReport);
        setWeatherData(weatherReport.body.properties.periods[0].detailedForecast);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ border: '1px solid blue', padding: '10px', margin: '10px' }}>
      <h3>Hello from My Component!</h3>
      <p>This component is being exposed via Module Federation.</p>
      {weatherData && <p>Scottsdale weather: {weatherData}</p>}
    </div>
  );
};

export default MyComponent;