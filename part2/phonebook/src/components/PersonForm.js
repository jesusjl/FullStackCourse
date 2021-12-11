import React from "react";

const PersonForm = (props) => {
    return (
        <div>
            <form onSubmit={props.onSubmit}>
                <div>
                    name: <input value={props.valueName}  onChange={props.onChangePerson}/>
                </div>
                <div>
                    number: <input value={props.valuePhone}  onChange={props.onChangePhone} />
                </div>
                <div>
                    <button type='submit'>Add</button>
                </div>
            </form>
        </div>
    )
}

export default PersonForm