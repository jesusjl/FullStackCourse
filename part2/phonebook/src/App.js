import React, {useState, useEffect} from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import phoneService from './services/Phones'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterNames, setFilterNames] = useState('')

  useEffect(()=> {
    phoneService
      .getAll()
      .then(initialPhones=> {
        setPersons(initialPhones)
      })
    }, [])

  const addUpdatePerson = (event) => {

    event.preventDefault()
    
    if (persons.find(person => person.name === newName &  person.phone === newPhone)){
      alert(`${newName} is already added to phonebook`)
    } else if (persons.find(person => person.name === newName &  person.phone !== newPhone)) {
        const person = persons.find(person => person.name === newName &  person.phone !== newPhone)
        const response = window.confirm(`${person.name} is already added to the notebook, replace the old number with a new one?`)
        if(response) {
          const changedPersonPhone = { ...person, phone: newPhone }

          phoneService
            .update(changedPersonPhone.id, changedPersonPhone)
              .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
            })
            .catch(error => {
              alert(
                `the person '${changedPersonPhone.name}' was already deleted from server`
              )
              setPersons(persons.filter(n => n.id !== changedPersonPhone.id))
            })
        }
      } else {
      const personObject = {
        name : newName,
        phone: newPhone
      }

      phoneService
        .create(personObject)
        .then(returnedPhone => {
          setPersons(persons.concat(returnedPhone))
          setNewPhone('')
          setNewName('')
        })
    }
  }

  const handleDeletePerson = (id) => {
    const response = window.confirm("Are you sure?")
    if(response) {
      phoneService
        .deletePerson(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => person.id !== id))
        })
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
          <PersonForm onSubmit = {addUpdatePerson} 
                      valueName={newName} 
                      onChangePerson={handlePersonChange}
                      valuePhone={newPhone}
                      onChangePhone={handlePhoneChange} />

        <h2>Numbers</h2>
      
        {startsWithLetters.map((person) => 
          <Persons key={person.id} person={person} onClick={() => handleDeletePerson(person.id)}/>)}
      </div>
    )
}


export default App;
