import React from 'react'
import "./QuizText.css"

const QuizText = ({text}) => {
    return (
        <div>
            <p className='quiztext'>{text}</p>
        </div>
    )
}

export default QuizText