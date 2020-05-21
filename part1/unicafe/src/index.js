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

  const Statistic = (props) => (
    <div>{props.stat} {props.value}</div>
  )

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => {setGood(good + 1)}} label="good"/>
      <Button handleClick={() => {setNeutral(neutral + 1)}} label="neutral"/>
      <Button handleClick={() => {setBad(bad+ 1)}} label="bad"/>
      <h2>Statistics</h2>
      <Statistic stat="good" value={good}/>
      <Statistic stat="neutral" value={neutral}/>
      <Statistic stat="bad" value={bad}/>
      <Statistic stat="all" value={good + neutral + bad}/>
      <Statistic stat="average" value={((good * 1) + (bad * -1)) / (good + bad + neutral)}/>
      <Statistic stat="positive" value={(good / (good + neutral + bad) * 100) + "%"}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)