import React, { useState } from 'react'

const Button = (props) => {
  return <button onClick={props.onClick}>{props.text}</button>
}

const Display = (props) => {
  return (
    <div>
      <h1>{props.text}</h1>
      <p>{props.anecdote}</p>
    </div>
  )
}
const DisplayVotes = (props) => {
  return <p>has {props.votes} votes</p>
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
  
  const randomNumber = Math.floor(Math.random() * anecdotes.length)
  
  const [selected, setSelected] = useState(randomNumber)
  const [votes, setVote] = useState(new Uint8Array(anecdotes.length))

  console.log(votes)

  const handleRandomClick = () => {
    const randomNumber  = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomNumber)
  }

  const handleVoteClick = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVote(copy)
  }

  const mostPopular = votes.indexOf(Math.max(...votes))

  return (
    <div>
      <Display text="Anecdote of the day" anecdote={anecdotes[selected]} />
      <DisplayVotes votes={votes[selected]} />
      <Button onClick={handleRandomClick} text='next anecdote'/>
      <Button onClick={handleVoteClick} text='vote'/>
      <Display text="Anecdote with most votes" anecdote={anecdotes[mostPopular]} />

    </div>
  )
}

export default App