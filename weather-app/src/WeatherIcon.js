import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';

const WeatherIcon = ({ weatherIcon }) => {
  let icon = null;

  switch (weatherIcon) {
    case 'clear-day':
      icon = <FontAwesomeIcon icon={faSun} />;
      break;
    case 'clear-night':
      icon = <FontAwesomeIcon icon={faCloud} />;
      break;
    case 'partly-cloudy-day':
      icon = <FontAwesomeIcon icon={faCloudSun} />;
      break;
    case 'partly-cloudy-night':
      icon = <FontAwesomeIcon icon={faCloud} />;
      break;
    case 'cloudy':
      icon = <FontAwesomeIcon icon={faCloud} />;
      break;
    case 'rain':
      icon = <FontAwesomeIcon icon={faCloudRain} />;
      break;
    case 'snow':
      icon = <FontAwesomeIcon icon={faSnowflake} />;
      break;
    default:
      break;
  }

  return <div className="weather-icon">{icon}</div>;
};

export default WeatherIcon;
