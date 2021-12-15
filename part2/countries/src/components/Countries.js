import React from "react"


const Button = (props) => {
   return <button value={props.value} name={props.country} onClick={props.onclick}> 
            Show 
        </button>
}

const Countries = (props) => {
    return (

        <li>{props.name} <Button onclick={props.onclick} value={props.value} country={props.name}/> </li>
    )
}

export default Countries