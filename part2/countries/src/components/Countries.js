import React from "react"

const Button = (props) => {
   return <button name={props.name} name={props.country} onClick={props.onclick}> Show </button>
}

const Countries = (props) => {
    return <li>{props.name} <Button onclick={props.onclick} name={props.name} country={props.name}/> </li>
    
}

export default Countries