import React from 'react';

const PersonForm = (props) => {
    return (
        <form>
            <div>
                name: <input onChange={props.handlerNewName} value={props.nameValue} />
            </div>
            <div>
                number: <input onChange={props.handlerNewNumber} value={props.numberValue} />
            </div>
            <div>
                <button type="submit" onClick={props.submitHandler}>add</button>
            </div>
        </form>
    )
}

export default PersonForm