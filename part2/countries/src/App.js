import React, {useState, useEffect} from 'react';
import axios from 'axios'
import './App.css';
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
        //console.log(response.data)
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
  console.log(startsWithLetters)
  useEffect(hook, [])

    return (
      <div>
        <Filter value = {filterNames} onChange={handleFilterByCountryNameChange} />
        <div>
        {startsWithLetters.length>10?
        <span>Too many matches</span>
        : startsWithLetters.length<=10 && startsWithLetters.length>1?
        startsWithLetters.map((country) => 
        <Countries value= {filterNames} onclick={HandleShowCountryClick} key={country.cca2} name={country.name.common} />)
        :startsWithLetters.map((country) => 
        <Country 
          key={country.cca2} 
          name={country.name.common} 
          capital={country.capital[0]}
          population={country.population}
          languages={country.languages}
          flags={country.flags}/>)}
        </div>
      </div>
    )
}

export default App;

