import React, {useState} from 'react';

const Statistics = (props) => {
  console.log(props)
  return (
    <p>{props.text} {props.feedback}</p>
  )
}

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>

      <h2>give feedback</h2>

      <button onClick={()=>setGood(good + 1)}>Good</button>
      <button onClick={()=>setNeutral(neutral + 1)}>Neutral</button>
      <button onClick={()=>setBad(bad + 1)}>Bad</button>

      <h2>Statistics</h2>

      <Statistics text='good' feedback={good} />
      <Statistics text='neutral' feedback={neutral} />
      <Statistics text='bad' feedback={bad} />
      <Statistics text='average' feedback= {(good * 1 + neutral * 0 + bad * (-1)) / (good + neutral + bad)} />
      <Statistics text='positive' feedback= {((good / (good + neutral + bad)) *100) + (' %')} />
      
    </div>
  )
}

export default App;
