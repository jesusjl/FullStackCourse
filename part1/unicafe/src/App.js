import React, {useState} from 'react';

const Button = (props) => {

  return <button onClick={props.onClick}> {props.text} </button>

}

const StatisticLine = ({text, value}) => {
  return <tr><td>{text}</td><td> {value}</td></tr>
}

const Statistics = (props) => {
  if(props.value['all'] === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
    <tbody>
    <StatisticLine text='good' value={props.value['good']}/>
    <StatisticLine text='neutral' value={props.value['neutral']} />
    <StatisticLine text='bad' value={props.value['bad']} />
    <StatisticLine text='all' value={props.value['all']} />
    <StatisticLine text='average' value= {props.value['average']} />
    <StatisticLine text='positive' value= {props.value['positive']} />
    </tbody>
    </table>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good + neutral + bad
  const average = (good * 1 + neutral * 0 + bad * (-1)) / (good + neutral + bad)
  const positive = ((good / (good + neutral + bad)) *100) + (' %')
  
  const value = {

    'good': good,
    'neutral': neutral, 
    'bad': bad, 
    'all': all,
    'average': average,
    'positive': positive

  }

  return (

    <div>

      <h2>give feedback</h2>
      <Button  onClick={()=>setGood(good + 1)} text="Good"/>
      <Button  onClick={()=>setNeutral(neutral + 1)} text="Neutral"/>
      <Button  onClick={()=>setBad(bad + 1)} text="Bad"/>

      <h2>Statistics</h2>

      <Statistics value={value}/>

    </div>
  )
}

export default App;
