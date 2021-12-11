import React, {useState} from 'react'


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
  console.log(persons.filter((person) => person.name.startsWith('A')))

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
  : persons.filter((person) => person.name.startsWith(filterNames))

  return (
    <div>
      <h2>Phonebook</h2>
        filter show with
        <input value={filterNames} onChange={handleFilterByPersonChange}/>
        <form onSubmit={addPerson}>
        <div>
          name: <input value={newName}  onChange={handlePersonChange}/>
        </div>
        <div>number: <input value={newPhone}  onChange={handlePhoneChange} /></div>
        <div>
          <button type='submit'>Add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
      {startsWithLetters.map( (person) => 
        <li key={person.id}> {person.name} {person.phone} </li> )}

      </ul>
    </div>
  )
}


export default App;
