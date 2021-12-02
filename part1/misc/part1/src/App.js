import React from 'react'

/* const App = () => {
  const now = new Date()
  const a = 10
  const b = 20

  return (
    <div>
      <p>Hello world, it is now {now.toString()}</p>
      <p>
        {a} plus {b} is {a+b}
      </p>
    </div>
    )

} */

const Hello = (props) => {
  return (
    <div>
      <p>Hello {props.name}</p>
    </div>
  )
}


const Footer = (props) => {
  return (
    <div>
      greeting app created by <a href='https://github.com/mluukai'>mluukai</a>
    </div>
  )
}

const App = () => {

    const name = 'Peter'
    const age = 10

  return (
    <>
      <h1>Greetings</h1>
      <Hello name="Maya" age={26 + 10}/>
      <Hello name="{name} age= {age}"/>
      <Footer />
    </>
  )
  }

export default App;
