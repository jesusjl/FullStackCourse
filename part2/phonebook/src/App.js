import React, {useState} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {

const [persons, setPersons] = useState([
  { name: 'Arto Hellas', number: '040-123456', id: 1 },
  { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
  { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
  { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
])

const [newName, setNewName] = useState('')
const [newPhone, setNewPhone] = useState('')
const [filterNames, setFilterNames] = useState('')


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
