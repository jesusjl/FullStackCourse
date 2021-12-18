import React, {useState, useEffect} from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import Countries from './components/Countries'
import Country from './components/Country'


const App=()=> {

  const [countries ,setCountries] = useState([])
  const [filterNames, setFilterNames] = useState('')


  const hook = () => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }

  const handleFilterByCountryNameChange = (event) => {
    setFilterNames(event.target.value)
  }

  const HandleShowCountryClick = (event) => {
    setFilterNames(event.target.name)
  }


  const startsWithLetters = filterNames === ''
  ? []
  : countries.filter((country) => country.name.common.toUpperCase().startsWith(filterNames.toUpperCase()))

  useEffect(hook, [])
  console.log(startsWithLetters)
    return (
      <div>
        <Filter value = {filterNames} onChange={handleFilterByCountryNameChange} />

        <div>
          {startsWithLetters.length>10?
          <span>Too many matches</span>
          : startsWithLetters.length<=10 && startsWithLetters.length>1?
          startsWithLetters.map((country, v) => 
          <Countries key={country.cca2} value= {filterNames} onclick={HandleShowCountryClick} name={country.name.common} />)
          :startsWithLetters.map((country, v) => 
          <div key={country.cca2}>
            <Country 
            name={country.name.common} 
            capital={country.capital[0]}
            population={country.population}
            languages={country.languages}
            flags={country.flags}/>
          </div> 
            )
          }
        </div>
      </div>
    )
}

export default App;