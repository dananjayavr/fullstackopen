import React from 'react';

const Person = (props) => {
    return (
        <div>
            <div>
                {props.person.name} {props.person.number}
                <button onClick={props.deleteContact}>delete</button>
            </div>
        </div>
    )
}

export default Person