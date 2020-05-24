import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

import './App.css';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')

  const hook = () => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook,[])

  const addNewPerson = (event) => {
    event.preventDefault()
    const latestName = {
      name: newName,
      number: newNumber
    }

    if (persons.find(person => person.name === newName)) {
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
      <Filter handler={handleNameFilter} />
      <h2>add a new</h2>

      <PersonForm
        handlerNewName={handleAddNewName}
        nameValue={newName}
        handlerNewNumber={handleAddNewNumber}
        numberValue={newNumber}
        submitHandler={addNewPerson}
      />

      <h2>Numbers</h2>
      {persons.map((person) => {
        if (person.name.toLowerCase().includes(nameFilter.toLowerCase())) {
          return (
            <Person person={person} key={person.name}/>
          )
        } else {
          return false
        }
      })}
    </div>
  )
}

export default App