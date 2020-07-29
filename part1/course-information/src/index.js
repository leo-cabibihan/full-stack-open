import React from 'react';
import ReactDOM from 'react-dom';




const Header = props => (
  <h2>{props.course}</h2>
) 

const Part = props => (
  <p> {props.part} {props.exercise} </p>
)

const Course = props => props.parts.map(part => <Part part={part.name} exercise={part.exercises}></Part> )

const Total = props => (
  <p>
    Number of courses {props.total.reduce((acc, cur)=> acc + cur.exercises,0)}
  </p>
)

const App = props => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
  return (
    <div>
      <div>
        <Header course={course}></Header>
        <Course parts={parts}></Course>
        <Total total={parts}></Total>
      </div>
    </div>
  )
}


ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

