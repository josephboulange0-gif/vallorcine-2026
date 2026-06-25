import React, { useState, useEffect } from 'react';

interface WeatherData {
  temp: number;
  wind: number;
  code: number;
  forecast: {
    date: string;
    maxTemp: number;
    minTemp: number;
    code: number;
  }[];
}

interface LocationWeather {
  name: string;
  data: WeatherData | null;
  loading: boolean;
  error: string | null;
}

const locations = [
  { name: 'Vallorcine (Chalet & Buet)', lat: 46.03, lon: 6.93 },
  { name: 'Trient (Aiguille du Tour)', lat: 46.06, lon: 7.00 },
  { name: 'Les Contamines (Dômes de Miage)', lat: 45.82, lon: 6.73 }
];

// Open-Meteo WMO weather code converter
const getWeatherInfo = (code: number) => {
  if (code === 0) return { label: 'Ciel dégagé', icon: '☀️' };
  if (code === 1 || code === 2 || code === 3) return { label: 'Peu nuageux', icon: '🌤️' };
  if (code === 45 || code === 48) return { label: 'Brouillard', icon: '🌫️' };
  if (code === 51 || code === 53 || code === 55) return { label: 'Bruine', icon: '🌧️' };
  if (code === 61 || code === 63 || code === 65) return { label: 'Pluie', icon: '🌧️' };
  if (code === 71 || code === 73 || code === 75) return { label: 'Chutes de neige', icon: '❄️' };
  if (code === 77) return { label: 'Grisil', icon: '🌨️' };
  if (code === 80 || code === 81 || code === 82) return { label: 'Averses de pluie', icon: '🌦️' };
  if (code === 85 || code === 86) return { label: 'Averses de neige', icon: '🌨️' };
  if (code === 95 || code === 96 || code === 99) return { label: 'Orage', icon: '⚡' };
  return { label: 'Inconnu', icon: '🏔️' };
};

export const WeatherWidget: React.FC = () => {
  const [weatherStates, setWeatherStates] = useState<LocationWeather[]>(
    locations.map(loc => ({ name: loc.name, data: null, loading: true, error: null }))
  );

  const fetchWeather = async () => {
    const updatedStates = [...weatherStates];
    
    for (let i = 0; i < locations.length; i++) {
      const loc = locations[i];
      try {
        const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=Europe/Paris`;
        const res = await fetch(url);
        if (!res.ok) throw new Error('Erreur réseau');
        const data = await res.json();
        
        // Build 3-day forecast
        const forecast = [];
        for (let d = 0; d < 3; d++) {
          if (data.daily && data.daily.time && data.daily.time[d]) {
            forecast.push({
              date: data.daily.time[d],
              maxTemp: Math.round(data.daily.temperature_2m_max[d]),
              minTemp: Math.round(data.daily.temperature_2m_min[d]),
              code: data.daily.weathercode[d]
            });
          }
        }

        updatedStates[i] = {
          name: loc.name,
          data: {
            temp: Math.round(data.current_weather.temperature),
            wind: Math.round(data.current_weather.windspeed),
            code: data.current_weather.weathercode,
            forecast
          },
          loading: false,
          error: null
        };
      } catch (err: any) {
        updatedStates[i] = {
          name: loc.name,
          data: null,
          loading: false,
          error: 'Impossible de charger la météo'
        };
      }
    }
    setWeatherStates(updatedStates);
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  return (
    <div className="weather-section">
      <div className="weather-header">
        <h4 className="section-title">
          <span className="icon">🌦️</span> Météo Montagne en Direct
        </h4>
        <button onClick={fetchWeather} className="btn-refresh">
          Actualiser
        </button>
      </div>

      <div className="weather-grid">
        {weatherStates.map((state, idx) => (
          <div key={idx} className="weather-card">
            <h5 className="weather-loc-name">{state.name}</h5>
            
            {state.loading && (
              <div className="weather-state loading">Chargement...</div>
            )}
            
            {state.error && (
              <div className="weather-state error">⚠️ {state.error}</div>
            )}
            
            {state.data && (
              <div className="weather-info-box">
                <div className="weather-current">
                  <div className="weather-current-main">
                    <span className="weather-icon-large" title={getWeatherInfo(state.data.code).label}>
                      {getWeatherInfo(state.data.code).icon}
                    </span>
                    <span className="weather-temp">{state.data.temp}°C</span>
                  </div>
                  <div className="weather-current-sub">
                    <div className="weather-label">{getWeatherInfo(state.data.code).label}</div>
                    <div className="weather-wind">💨 Vent : {state.data.wind} km/h</div>
                  </div>
                </div>

                <div className="weather-forecast">
                  <h6>Prévisions 3 jours :</h6>
                  <div className="forecast-row-container">
                    {state.data.forecast.map((f, fIdx) => {
                      const dateObj = new Date(f.date);
                      const dayName = dateObj.toLocaleDateString('fr-FR', { weekday: 'short' });
                      const dateStr = dateObj.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
                      
                      return (
                        <div key={fIdx} className="forecast-col">
                          <span className="forecast-day">{dayName} {dateStr}</span>
                          <span className="forecast-icon">{getWeatherInfo(f.code).icon}</span>
                          <span className="forecast-temps">
                            <span className="max">{f.maxTemp}°</span>
                            <span className="min">{f.minTemp}°</span>
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
