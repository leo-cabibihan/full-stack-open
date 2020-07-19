import React, {useState} from 'react'
import Courses from './Courses.js'
import PhoneBook from './PhoneBook.js'


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


const App = props => {
  
  const data = props.anecdotes
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [randomNumber, setRandomNumber] = useState(getRandom(data))
  const [points, setPoint] = useState(Array(data.length).fill(0))
  const mostVotes = points.findIndex(point => point === Math.max(...points))
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  

  return (
    <div>
      <PhoneBook></PhoneBook>
      <h2>Anecdote of the day</h2>
      <p> {data[randomNumber]} has {points[randomNumber]} votes </p>
      <div>
        <button onClick={() => {setPoint(points.map((point,i) => i === randomNumber ? point + 1: point))}}>vote</button>
        <button onClick={() => {setRandomNumber(getRandom(data))}}>next anecdote</button>
      </div>
      <h2>Anecdote with the most votes</h2>
      <p> {props.anecdotes[mostVotes]} has {points[mostVotes]} </p>
      <h2>Give feedback</h2>
      <div>
        <button onClick={() => {setGood(good + 1)}}>good</button>
        <button onClick={() => {setNeutral(neutral + 1)}}>neutral</button>
        <button onClick={() => {setBad(bad + 1)}}>bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
      <Courses data={courses}></Courses>
      
    </div>
  )
}

export default App