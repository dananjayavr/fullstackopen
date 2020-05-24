import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Country = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>
      <div>capital {country.capital}</div>
      <div>population {country.population}</div>
      <h4>languages</h4>
      <ul>
        {country.languages.map((language) => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={country.flag} style={{width: 200 + 'px'}}></img>
    </>
  )
}

const App = () => {

  const [query, setQuery] = useState('')
  const [countries, setCountries] = useState([])

  const handleQuery = (event) => {
    setQuery(event.target.value)
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
        <Country country={results[0]}/>
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
        {results.map(country => <div key={country.name}>{country.name}</div>)}
      </>
    )
  }
}

export default App;
