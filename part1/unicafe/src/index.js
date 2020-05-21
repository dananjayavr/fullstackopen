import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Button = (props) => (
    <button onClick={props.handleClick}>
      {props.label}
    </button>
  )

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => {setGood(good + 1)}} label="good"/>
      <Button handleClick={() => {setNeutral(neutral + 1)}} label="neutral"/>
      <Button handleClick={() => {setBad(bad+ 1)}} label="bad"/>
      <h2>Statistics</h2>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {good + neutral + bad}</div>
      <div>average {((good * 1) + (bad * -1)) / (good + bad + neutral) }</div>
      <div>positive {(good / (good + neutral + bad) * 100)}%</div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)