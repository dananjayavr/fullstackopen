import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', number:'040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ nameFilter, setNameFilter ] = useState('')

  const addNewPerson = (event) => {
    event.preventDefault()
    const latestName = {
      name: newName,
      number: newNumber
    }

    if(persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(latestName))
    }
    setNewNumber('')
    setNewName('')
  }

  const handleAddNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleAddNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    setNameFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input onChange={handleNameFilter} />
      </div>
      <h2>add a new</h2>
      <form>
        <div>
          name: <input onChange={handleAddNewName} value={newName}/>
        </div>
        <div>
          number: <input onChange={handleAddNewNumber} value={newNumber}/>
        </div>
        <div>
          <button type="submit" onClick={addNewPerson}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => {
        if(person.name.toLowerCase().includes(nameFilter.toLowerCase())) {
          return (
          <div key={person.name}>
            <div>{person.name} {person.number}</div>
          </div>
          )
        } else {
          return false
        }
      })}
    </div>
  )
}

export default App
