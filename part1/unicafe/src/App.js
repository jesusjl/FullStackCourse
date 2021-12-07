import React, {useState} from 'react';

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
    <p>good {good}</p>
    <p>neutral {neutral}</p>
    <p>bad {bad}</p>
    <p>all {good + neutral + bad}</p>
    <p>average {(good * 1 + neutral * 0 + bad * (-1)) / (good + neutral + bad)}</p>
    <p>positive {(good/ (good + neutral + bad)) *100} </p>
    </div>
  )
}

export default App;
