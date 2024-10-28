import React from 'react'

const Submit = ({onClick,text}) => {
    const onClickHandle = () => {
        onClick();
    }
    return (
        <div>
            <button className= "SubmitButton" onClick={onClickHandle}>
                {text}
            </button>
        </div>
    )
}

export default Submit