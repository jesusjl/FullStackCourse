import React from 'react';
import Weather from './Weather';
const Name = (props) => <h2>{props.name}</h2>

const Capital = (props) => <div> capital {props.capital}<br /> population {props.population} </div>

const Flag = (props) => <img src={props.flags.png}></img>

const Languages = ({languages}) => {
    return (
        <div>
            <h3>Spoken languages</h3>
            <ul>{Object.keys(languages).map((item, i) => <li key={i}>{languages[item]}</li>)}</ul>
        </div>
    )
}

const Country = (props) => {

    const x = 0
    const keyIncrement = (x) => (x + 1);

    return (
        <>
            <Name name={props.name} />
            <Capital capital={props.capital} population={props.population} />
            <Languages key={keyIncrement(x)} languages={props.languages} />
            <Flag flags={props.flags} />
            <Weather capital={props.capital}   />
           
        </>
    )
}

export default Country