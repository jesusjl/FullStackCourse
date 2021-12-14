import React, {useState, useEffect} from 'react'
import axios from 'axios'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

const [persons, setPersons] = useState([])
const [newName, setNewName] = useState('')
const [newPhone, setNewPhone] = useState('')
const [filterNames, setFilterNames] = useState('')


const hook = () => {
  axios
    .get('http://localhost:3001/persons')
    .then(response=> {
      setPersons(response.data)
    })
}

useEffect(hook, [])

const addPerson = (event) => {

  event.preventDefault()
  if (persons.find(person => person.name === newName)){
    alert(`${newName} is already added to phonebook`)
  } else{

    const personObject = {
      name : newName,
      id: persons.length + 1,
      phone: newPhone
    }

    setPersons(persons.concat(personObject))
    setNewName('')
    
  }
}

const handlePersonChange = (event) => {
  setNewName(event.target.value)
}

const handlePhoneChange = (event) => {
  setNewPhone(event.target.value)
}

const handleFilterByPersonChange = (event) => {
  setFilterNames(event.target.value)
}

const startsWithLetters = filterNames === ''
  ? persons
  : persons.filter((person) => person.name.toUpperCase().startsWith(filterNames.toUpperCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        
        <Filter value = {filterNames} onChange={handleFilterByPersonChange} />
        <PersonForm onSubmit = {addPerson} 
                    valueName={newName} 
                    onChangePerson={handlePersonChange}
                    valuePhone={newPhone}
                    onChangePhone={handlePhoneChange} />

      <h2>Numbers</h2>
    
      {startsWithLetters.map((person) => 
        <Persons key={person.id} name={person.name} phone={person.number} />)}

    </div>
  )
}


export default App;
