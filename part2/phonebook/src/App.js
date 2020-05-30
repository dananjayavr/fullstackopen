import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Person from './components/Person'
import Notification from './components/Notification'
import Error from './components/Error'
import ContactService from './services/contact'

import './index.css';

const App = () => {

  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [nameFilter, setNameFilter] = useState('')
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const deleteContact = (id) => {
    if(window.confirm(`Delete ${persons.filter(person => person.id === id).pop().name}?`)) {
      ContactService
      .deleteContact(id)
      .then(response => {
        setPersons(persons.map(person => person.id !== id ? person : {name:null,number:null,id:null}))
      }).catch(error => {
        setErrorMessage(`Information of ${persons.filter(person => person.id === id).pop().name} has already been removed from server`)
      })
    } else {

    }
  }

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
      const personToUpdate = persons.map(person => {
        if(person.name === newName) {
          return {name:person.name,number:newNumber,id:person.id}
        } else {
          return null
        }
      }).filter(id => id !== null).pop()

      if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
        ContactService
          .updateNumber(personToUpdate.id, personToUpdate)
          .then(returnedValue => {
            persons.map((person,i) => {
              console.log(i)
              if(i === personToUpdate.id-1) {
                person.number = newNumber
                return true
              } else {
                return false
              }
            })
            setPersons(persons)
            setNotification(`Updated ${returnedValue.name}`)
          }).catch(error => {
            setErrorMessage(`Information of ${newName} has already been removed from server`)
          })
      }
    } else {
      ContactService
        .create(latestName)
        .then(returnedContact => {
          setPersons(persons.concat(returnedContact))
          setNotification(`Added ${returnedContact.name}`)
        })
    }

    setNewNumber('')
    setNewName('')

    setTimeout(() => {
      setNotification(null)
    }, 3000)
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
      <Notification message={notification}/>
      <Error message={errorMessage}/>
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
      {persons.map((person, i) => {
        if(person.name !== null) {
          if (person.name.toLowerCase().includes(nameFilter.toLowerCase())) {
            return (
              <Person person={person} key={i} deleteContact={() => deleteContact(person.id)}/>
            )
          } else {
            return false
          }
        } else {
          return false
        }
      })}
    </div>
  )
}

export default App
