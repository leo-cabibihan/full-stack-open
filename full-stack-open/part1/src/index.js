import React, {useState} from 'react';
import ReactDOM from 'react-dom';
//import App from './App';
import * as serviceWorker from './serviceWorker';

const round = num => Math.round(num * 100) / 100

const getRandom = items => Math.floor(Math.random() * items.length);

const Statistic = props => {
  const {text, value} = props
  return (
    <tr>
      <td> {text} </td>
      <td> {value} </td>
    </tr>
  )
}

const Statistics = props => {
  const {good,neutral,bad} = props
  const all = good + neutral + bad
  if (all === 0) {return (<p> no feedback given </p>)}
  return (
    <>
      <h2>statistics</h2>
      <table>
        <tbody>
          <Statistic text={"good"} value={good}></Statistic>
          <Statistic text={"neutral"} value={neutral}></Statistic>
          <Statistic text={"bad"} value={bad}></Statistic>
          <tr>
            <td> all </td>
            <td> {all} </td>
          </tr>
          <tr>
            <td> average </td>
            <td> {round((good * 1 + bad * -1)/all)} </td>
          </tr>
          <tr>
            <td> positive </td>
            <td> {round((good/(good + neutral + bad))*100)}% </td>
          </tr>
        </tbody>
      </table>  
    </>
  )
}

const Header = props => (
  <h2>{props.course}</h2>
) 

const Part = props => (
  <p> {props.part} {props.exercise} </p>
)

const Course = props => props.parts.map(part => <Part part={part.name} exercise={part.exercises}></Part> )

const Total = props => (
  <p>
    NUmber of courses {props.total.reduce((acc, cur)=> acc + cur.exercises,0)}
  </p>
)

const App = props => {
  const data = props.anecdotes
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [randomNumber, setRandomNumber] = useState(getRandom(data))
  const [points, setPoint] = useState(Array(data.length).fill(0))
  const mostVotes = points.findIndex(point => point === Math.max(...points))
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
      <h2>Anecdote of the day</h2>
      <p> {data[randomNumber]} has {points[randomNumber]} votes </p>
      <div>
        <button onClick={() => {setPoint(points.map((point,i) => i === randomNumber ? point + 1: point))}}>vote</button>
        <button onClick={() => {setRandomNumber(getRandom(data))}}>next anecdote</button>
      </div>
      <h2>Anecdote with the most votes</h2>
      <p> {anecdotes[mostVotes]} has {points[mostVotes]} </p>
      <h2>Give feedback</h2>
      <div>
        <button onClick={() => {setGood(good + 1)}}>good</button>
        <button onClick={() => {setNeutral(neutral + 1)}}>neutral</button>
        <button onClick={() => {setBad(bad + 1)}}>bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      <div>
        <Header course={course}></Header>
        <Course parts={parts}></Course>
        <Total total={parts}></Total>
      </div>
    </div>
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

ReactDOM.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();