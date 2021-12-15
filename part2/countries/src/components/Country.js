import React, {useState}  from "react"

const Name=(props)=> {
    return(
        <h2>{props.name}</h2>
    )
}

const Flag=(props) => <img src={props.flags.png}></img>

const Languages = (props) => {
    return (
        <>{Object.values(props.languages).map((k,v)=><li>{k}</li>)}</>
    )
  }

const Country = (props)  => {

    const x = 0
    const keyIncrement = (x) => (x+1)

    console.log(props)
    return (
        <>
        <Name name={props.name}/>
         <ul>
            <li>capital {props.capital}</li>
            <li>population {props.population}</li>
         </ul>
         <h3>Languages</h3>
         <Languages key={keyIncrement(x)} languages={props.languages} />
         <Flag flags={props.flags} />
         </>
    )
}

export default Country

