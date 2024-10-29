import React from 'react'

const Submit = ({onClick,text}) => {
    const onClickHandle = () => {
        onClick();
    }
    return (
        <div className= "SubmitButton" >
            <button onClick={onClickHandle}>
                {text}
            </button>
        </div>
    )
}

export default Submit