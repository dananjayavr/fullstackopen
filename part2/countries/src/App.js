import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ country, display }) => {

  const [temperature, setTemperature] = useState(0)
  const [wind, setWind] = useState('')
  const [icon, setIcon] = useState('')
  const [weatherDescription, setWeatherDescription] = useState('')

  const hook = () => {
    const params = {
      access_key: process.env.REACT_APP_WEATHERSTACK_API_KEY,
      query: country.capital
    }

    axios.get('http://api.weatherstack.com/current', { params })
      .then(response => {
        setTemperature(response.data.current.temperature);
        setWind(response.data.current.wind_speed + ' kph direction ' + response.data.current.wind_dir )
        setIcon(response.data.current.weather_icons[0])
        setWeatherDescription(response.data.current.weather_descriptions[0])
      }).catch(error => {
        console.log(error);
      });
  }

  useEffect(hook,[])

  return (
    <div style={{ display: display }}>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h4>languages</h4>
      <ul>
        {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} style={{ width: 200 + 'px' }} alt={country.name + ' flag'}/>
      <h4>Weather in {country.capital}</h4>
      <div><strong>temperature:</strong> {temperature} Celsius</div>
      <img src={icon} style={{ width: 50 + 'px' }} alt={weatherDescription}/>
      <div><strong>wind:</strong> {wind}</div>
    </div>
  )
}

const App = () => {

  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])
  
  const handleQuery = (event) => {
    setQuery(event.target.value)
  }

  const [showCountry, setShowCountry] = useState(false)

  const showHandler = (event) => {
    event.preventDefault()
    setShowCountry(!showCountry)
  }


  const hook = () => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  useEffect(hook, [])

  const results = countries.filter(country => country.name.toLowerCase().includes(query.toLowerCase()))

  if (results.length > 10) {
    return (
      <>
        <div>
          find countries <input value={query} onChange={handleQuery} />
        </div>
        <div>Too many matches, specify another filter</div>
      </>
    )
  } else if (results.length === 1) {
    return (
      <>
        <div>
          find countries <input value={query} onChange={handleQuery} />
        </div>
        <Country country={results[0]} />
      </>
    )
  } else if (results.length === 0) {
    return (
      <>
        <div>
          find countries <input value={query} onChange={handleQuery} />
        </div>
        <div>No results found</div>
      </>
    )
  } else {
    return (
      <>
        <div>
          find countries <input value={query} onChange={handleQuery} />
        </div>
        {results.map(country => <div key={country.name}>{country.name} <button onClick={showHandler} value={country.name}>show</button><Country country={country} display={showCountry ? "block" : "none" }/></div>)}
      </>
    )
  }
}

export default App;
