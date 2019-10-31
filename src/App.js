import axios from "axios";
import React, { useEffect, useState } from "react";
import "./style.css";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [capital, setCapital] = useState("");

  useEffect(() => {
    axios
      .get(`https://restcountries.eu/rest/v2/name/${searchName}`)
      .then(response => {
        console.log(`>> Response: ${JSON.stringify(response)}`);

        setCountries(response.data);
      });
  }, [searchName]);

  const handleSearch = event => {
    setSearchName(event.target.value);
  };
  const Country = ({ capital, name, population, languages, flag }) => {
    const [show, setShow] = useState(false);
    return (
      <div>
        <p>
          {name}{" "}
          <button props={countries} onClick={() => setShow(!show)}>
            {show ? "hide" : "show"}
          </button>
          {show && ( // use show flag to conditionally render country info
            <SingleCountry
              name={name}
              capital={capital}
              population={population}
              languages={languages}
              flag={flag}
            />
          )}
        </p>
      </div>
    );
  };

  const SingleCountry = ({ name, capital, population, languages, flag }) => {
    return (
      <div>
        <h3>{name}</h3>
        <p>capital {capital}</p>
        <p>population {population}</p>
        <h2>languages</h2>
        <ul>
          {languages.map(el => (
            <li>{el.name}</li>
          ))}
        </ul>
        <img src={flag} alt="OOPS" class="flag-image" />
        <h2>weather in {capital}</h2>
      </div>
    );
  };
  const Countries = () => {
    if (countries.length === 0) {
      return <span class="results__label"> Search something </span>;
    }
    if (countries.length === 1) {
      setCapital(countries.map(c => c.capital));
      console.log(capital);
      return countries.map(c => (
        <SingleCountry
          name={c.name}
          capital={c.capital}
          population={c.population}
          languages={c.languages}
          flag={c.flag}
        />
      ));
    }

    return (
      <div>
        <span class="results__label"> Search Results: </span>
        <div>
          {countries.map(c => (
            <Country
              name={c.name}
              capital={c.capital}
              population={c.population}
              languages={c.languages}
              flag={c.flag}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2>
        Welcome to my website which shows your information about any country.
      </h2>
      <div style={{ margin: "8px" }}>
        find countries <input onChange={handleSearch} />
      </div>
      <Countries />
      <div />
    </div>
  );
};

export default App;
