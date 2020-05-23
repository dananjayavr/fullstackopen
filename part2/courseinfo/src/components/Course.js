import React from 'react';

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
  
    const exercises = parts.map((part) => part.exercises)
    let total = exercises.reduce((a,c) => a + c)
  
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

  export default Course