import React, {useState} from 'react';
import ReactDOM from 'react-dom';


const round = num => Math.round(num * 100) / 100


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



const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>Give feedback</h2>
      <div>
        <button onClick={() => {setGood(good + 1)}}>good</button>
        <button onClick={() => {setNeutral(neutral + 1)}}>neutral</button>
        <button onClick={() => {setBad(bad + 1)}}>bad</button>
      </div>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>

    </div>
  )
}



ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById('root')
);

