import React from 'react'
import "./QuizText.css"

const QuizText = ({text}) => {
    return (
        <div className='quiztext'>
            <p>{text}</p>
        </div>
    )
}

export default QuizText