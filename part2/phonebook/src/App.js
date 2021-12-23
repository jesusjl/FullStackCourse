import React, {useState, useEffect} from 'react'

import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import Notification from './components/Notifications'
import ErrorNotification from './components/ErrorNotification'
import phoneService from './services/Phones'

import './index.css'

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [filterNames, setFilterNames] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(()=> {
    phoneService
      .getAll()
      .then(initialPhones=> {
        setPersons(initialPhones)
      })
    }, [])

  const addUpdatePerson = (event) => {

    event.preventDefault()
    
    if (persons.find(person => person.name === newName &  person.number === newPhone)){
      alert(`${newName} is already added to phonebook`)
    } else if (persons.find(person => person.name === newName &  person.number !== newPhone)) {
        const person = persons.find(person => person.name === newName &  person.number !== newPhone)
        const response = window.confirm(`${person.name} is already added to the notebook, replace the old number with a new one?`)
        if(response) {
          const changedPersonPhone = { ...person, number: newPhone }

          phoneService
            .update(changedPersonPhone.id, changedPersonPhone)
            .then(returnedPerson => {
              setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
              setSuccessMessage(`Updated '${changedPersonPhone.name}' phone to '${changedPersonPhone.number}'`)
              setTimeout(()=> {
                setSuccessMessage(null)
              }, 5000)
            })
            .catch(error => {
              setErrorMessage( `Information of '${changedPersonPhone.name}' has already been removed from server`)
              setTimeout(()=> {
                setErrorMessage(null)
              }, 5000)
              setPersons(persons.filter(n => n.id !== changedPersonPhone.id))
            })
        }
      } else {
      const personObject = {
        name : newName,
        number: newPhone
      }

      phoneService
        .create(personObject)
        .then(returnedPhone => {
          setPersons(persons.concat(returnedPhone))
          setNewPhone('')
          setNewName('')
          setSuccessMessage(`Added '${returnedPhone.name}'`)
          setTimeout(()=> {
            setSuccessMessage(null)
          }, 5000)
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
          <Notification message={successMessage} />
          <ErrorNotification message={errorMessage} />
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
