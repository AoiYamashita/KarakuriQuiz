import React from 'react'
import "./QuizText.css"

const QuizText = ({text}) => {
    return (
        <div>
            <p className='quixtext'>{text}</p>
        </div>
    )
}

export default QuizText