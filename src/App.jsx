import { useState } from "react";
import searchIcon from "./assets/searchimage.jfif";
import sunIcon from "./assets/sunimage.jfif";
import sunrise from "./assets/sunriseimage.jfif";
import snowIcon from "./assets/snowimage.jfif";
import huminity from "./assets/water.png";
import wind from "./assets/wind.png";
import n01 from "./assets/01n.jfif";
import d3n3 from "./assets/3dand3n.png";
import d9n9 from "./assets/9dand9n.jfif";
import d10 from "./assets/10d.jfif";
import n10 from "./assets/10n.jfif";
import d11n11 from "./assets/11dand11n.jfif";
import n2 from "./assets/2n.jfif";

const WeatherDetails = ({ icon, temp, city, con, lat, log, hum, speed }) => {
  return (
    <>
      <div className="image">
        <img src={icon} className="images" alt="weather" />
      </div>
      <div className="temp">{temp}°C</div>
      <div className="city">{city}</div>
      <div className="con">{con}</div>
      <div className="card">
        <div>
          <span className="lat">Latitude</span>
          <span>{lat}</span>
        </div>
        <div>
          <span className="log">Longitude</span>
          <span>{log}</span>
        </div>
      </div>
      <div className="datacontain">
        <div className="element">
          <img src={huminity} alt="Humidity" className="water" />
          <div className="data">
            <div className="percent">{hum}%</div>
            <div className="text">Humidity</div>
          </div>
        </div>
        <div className="element">
          <img src={wind} alt="Wind Speed" className="water" />
          <div className="data">
            <div className="percent">{speed} km/h</div>
            <div className="text">Wind Speed</div>
          </div>
        </div>
      </div>
    </>
  );
};

function App() {
  let apikey = "0dfeefa3e94b8007f73b489b88954012";
  const [text, setText] = useState("");
  const [icon, setIcon] = useState(snowIcon);
  const [temp, setTemp] = useState(0);
  const [city, setCity] = useState("");
  const [con, setCon] = useState("");
  const [lat, setLat] = useState(0);
  const [log, setLog] = useState(0);
  const [hum, setHum] = useState(35);
  const [speed, setSpeed] = useState(5);
  const [loading, setLoad] = useState(false);
  const [cityNotFound, setNotFound] = useState(false);

  const weatherIcon = {
    "01d": sunIcon,
    "01n": n01,
    "02d": sunrise,
    "02n": n2,
    "03d": d3n3,
    "03n": d3n3,
    "04d": d3n3,
    "04n": d3n3,
    "09d": d9n9,
    "09n": d9n9,
    "10d": d10,
    "10n": n10,
    "11d": d11n11,
    "11n": d11n11,
    "13d": snowIcon,
    "13n": snowIcon
  };

  const search = async () => {
    setLoad(true);
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=${apikey}&units=metric`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      console.log(data);

      if (data.cod === "404") {
        alert("City not found");
        setNotFound(true);
        setLoad(false);
        return;
      }

      setHum(data.main?.humidity);
      setSpeed(data.wind?.speed);
      setCon(data.sys?.country);
      setTemp(data.main?.temp);
      setLat(data.coord?.lat);
      setLog(data.coord?.lon);
      setCity(data.name);

      const weatherCode = data.weather?.[0]?.icon;
      setIcon(weatherIcon[weatherCode] || snowIcon); 

      setNotFound(false);
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoad(false);
    }
  };

  const handle = (e) => {
    setText(e.target.value);
  };

  const enterKey = (e) => {
    if (e.key === "Enter") {
      search();
    }
  };

  return (
    <div className="container">
      <div className="input-con">
        <input
          type="text"
          placeholder="Search city"
          className="searchtext"
          onChange={handle}
          value={text}
          onKeyDown={enterKey} 
        />
        <div className="search-img-div" onClick={search}>
          <img src={searchIcon} alt="search" className="search" />
        </div>
      </div>
      <WeatherDetails
        icon={icon}
        temp={temp}
        city={city}
        con={con}
        lat={lat}
        log={log}
        speed={speed}
        hum={hum}
      />
    </div>
  );
}

export default App;
