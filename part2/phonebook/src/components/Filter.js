import React from 'react';

const Filter = (props) => {
    return (<div>
        filter shown with <input onChange={props.handler}/>
    </div>)
}

export default Filter