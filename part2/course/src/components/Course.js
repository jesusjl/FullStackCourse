import React from 'react'

const Header = ({course}) =>  <h2>{course.name}</h2>
  
const Total = ({course}) => {
  return (
    <p> Total of {course.parts.reduce((total, x)=> total + x.exercises, 0)} </p>
    )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>    
  )
}

const Content = ({course}) => {
  return (
    <div>
    {course.parts.map((part) => {
      return(
        <Part key={part.id} part={part} />
      )
    }
    )}
    </div>
  )
}

const Course = ({course}) => {
  return (
    <div>
      <Header course={course} />
      <Content course={course}/ >
      <Total course={course}/ >
    </div>
  )
} 



export default Course