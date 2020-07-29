import React, {useState} from 'react';
import ReactDOM from 'react-dom';



const getRandom = items => Math.floor(Math.random() * items.length);





const App = props => {
  const data = props.anecdotes

  const [randomNumber, setRandomNumber] = useState(getRandom(data))
  const [points, setPoint] = useState(Array(data.length).fill(0))
  const mostVotes = points.findIndex(point => point === Math.max(...points))

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

