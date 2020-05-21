import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.label}
  </button>
)

/* const Statistics = ({good, neutral, bad}) => {
  if(good !== 0 || neutral !== 0 || bad !== 0) {
    return (<>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
      <div>all {good + neutral + bad}</div>
      <div>average {((good * 1) + (bad * -1)) / (good + bad + neutral)}</div>
      <div>positive {(good / (good + neutral + bad) * 100)}%</div>
    </>)
  }

  return (
    <div>
      No feedback given
    </div>
  )
    
} */

/* const Statistic = (props) => {
  return (
    <div>{props.text} {props.value}</div>
  )
} */

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  if(good !== 0 || bad !== 0 || neutral !== 0) {
    return (
      <div>
        <h2>Give feedback</h2>
        <Button handleClick={() => {setGood(good + 1)}} label="good"/>
        <Button handleClick={() => {setNeutral(neutral + 1)}} label="neutral"/>
        <Button handleClick={() => {setBad(bad+ 1)}} label="bad"/>
        <h2>Statistics</h2>
        {/* <Statistics good={good} neutral={neutral} bad={bad}/> */}
        <table>
          <thead></thead>
          <tbody>
            <tr>
              <td>good</td>
              <td>{good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{bad}</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{good + neutral + bad}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{((good * 1) + (bad * -1)) / (good + bad + neutral)}</td>
            </tr>
            <tr>
              <td>positive</td>
              <td>{(good / (good + neutral + bad) * 100)}%</td>
            </tr>
          </tbody>
        </table>
        {/* <Statistic text="good" value={good}/>
        <Statistic text="neutral" value={neutral}/>
        <Statistic text="bad" value={bad}/>
        <Statistic text="all" value={good + neutral + bad}/>
        <Statistic text="average" value={((good * 1) + (bad * -1)) / (good + bad + neutral)}/>
        <Statistic text="positive" value={(good / (good + neutral + bad) * 100) + "%"}/> */}
      </div>
    )
  }

  return (
    <div>
      <h2>Give feedback</h2>
      <Button handleClick={() => {setGood(good + 1)}} label="good"/>
      <Button handleClick={() => {setNeutral(neutral + 1)}} label="neutral"/>
      <Button handleClick={() => {setBad(bad+ 1)}} label="bad"/>
      <h2>Statistics</h2>
      <div>No feedback given</div>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)