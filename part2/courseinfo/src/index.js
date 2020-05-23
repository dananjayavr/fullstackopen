import React from 'react';
import ReactDOM from 'react-dom';

const Header = (course) => {
  return (
    <>
      <h1>{course.name}</h1>
    </>
  )
}

const Part = ({part}) => {
  return (
    <>
      <p>
        {part.name} {part.exercises}
      </p>
    </>
  )
}

const Content = ({parts}) => {
  
  return (
    <>
      {parts.map((part) => <Part key={part.id} part={part} />)}
    </>
  )
}

const Total = ({parts}) => {
  let total = 0;
  parts.map((part) => {
    return total += part.exercises
  })
  return (
    <>
      <h4>total of {total} exercises</h4>
    </>
  )
}

const Course = ({course}) => {
  return (
    <>
      <Header course={course} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  return (
    <>
      <Course course={course} />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))


