import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {
  return (
  <button onClick={props.clickHandler}>{props.label}</button>
  )
}

const App = () => {
  const [selected, setSelected] = useState(0)
  
  const randomAnecdote = () => {
    let randomInt = Math.round(Math.random() * (anecdotes.length - 1))
    return (
      setSelected(randomInt)
    )
  }

  return (
    <>
      <h2>Anecdote of the Day</h2>
      <div>
        {anecdotes[selected]}
      </div>
      <div>has {copy[selected]} votes</div>
      <Button clickHandler={() => copy[selected] += 1 } label="vote"/>
      <Button clickHandler={randomAnecdote} label="next anecdote"/>
      <h2>Anecdotes with most votes</h2>
      <div>
        {anecdotes[copy.indexOf(Math.max(...copy))]}
      </div>

    </>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const points = new Array(anecdotes.length+1).join('0').split('').map(parseFloat)
const copy = [...points]

ReactDOM.render( <App anecdotes={anecdotes} />, document.getElementById('root'));

