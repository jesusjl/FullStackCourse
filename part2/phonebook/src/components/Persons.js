import React from "react";

const Persons = ({person, onClick}) => {

    return (
    <div>
        {person.name} {person.phone} <button onClick={onClick}>delete</button>
    </div>
    )
}

export default Persons