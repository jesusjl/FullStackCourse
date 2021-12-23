import React from "react";

const Persons = ({person, onClick}) => {

    return (
    <div>
        {person.name} {person.number} <button onClick={onClick}>delete</button>
    </div>
    )
}

export default Persons