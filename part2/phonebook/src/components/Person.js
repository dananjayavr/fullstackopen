import React from 'react';

const Person = (props) => {
    return (
        <div>
            <div>{props.person.name} {props.person.number}</div>
        </div>
    )
}

export default Person