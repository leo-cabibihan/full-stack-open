import React, { useState, useEffect } from "react";
import axios from "axios";
const countriesEndpoint = "https://restcountries.eu/rest/v2/all";

const Weather = ({ country }) => {
  const [weatherData, setWeatherData] = useState();
  useEffect(() => {
    const cancelToken = axios.CancelToken;
    const source = cancelToken.source();
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country}`
      );
      setWeatherData(data);
    };
    fetchData().catch((error) => console.log(error));
    return () => {
      source.cancel();
    };
  }, []);
  console.log(weatherData);
  return !!weatherData ? (
    <>
      <h3>Weather in {country}</h3>
      <p>
        {" "}
        <b> temperature: </b> {weatherData.current.temperature}{" "}
      </p>
      <img src={weatherData.current.weather_icons[0]} alt={"meh"} />
      <p>
        {" "}
        <b>wind:</b> {weatherData.current.wind_speed} direction{" "}
        {weatherData.current.wind_speed}{" "}
      </p>
    </>
  ) : null;
};

const CountryView = ({ name, capital, population, languages, flag }) => (
  <section>
    <h1> {name} </h1>
    <p>capital {capital}</p>
    <p> population {population}</p>
    <h3> Languages </h3>
    <ul>
      {languages.map((language) => (
        <li key={language.name}>{language.name}</li>
      ))}
    </ul>
    <img src={flag} alt={`the flag of ${name}`}></img>
    <Weather country={name} />
  </section>
);

const ShowCountry = ({ country }) => {
  const [shouldRender, setShouldRender] = useState(false);
  return (
    <div>
      {" "}
      {country.name}{" "}
      <button
        onClick={() => {
          setShouldRender(!!shouldRender ? false : true);
        }}
      >
        Show
      </button>{" "}
      {shouldRender && true ? <CountryView {...country} /> : null}
    </div>
  );
};

const RenderCountries = ({ countries }) => {
  if (countries.length > 10) {
    return <div> Too many matches, specify another filter </div>;
  } else if (countries.length === 1) {
    const [country] = countries;
    return <CountryView {...country} />;
  } else if (countries.length <= 10) {
    return (
      <div>
        {" "}
        {countries.map((country) => (
          <ShowCountry key={country.name} country={country} />
        ))}
      </div>
    );
  } else {
    return <div> Nothing </div>;
  }
};

function App() {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(countriesEndpoint);
      setCountries(data);
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <input
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
      />
      <RenderCountries
        countries={countries.filter((country) =>
          country.name.toLowerCase().includes(query.toLowerCase())
        )}
      />
    </div>
  );
}

export default App;
