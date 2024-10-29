import React from 'react'
import { useState, useRef } from "react";
import { Question } from "./QuizData"
import Choice from "./Choice"
import QuizText from "./QuizText"
import Submit from "./Submit"
import "./Quiz.css"
import "./ChoiceButton.css"
import {AnimatePresence, motion } from "framer-motion"
import {v4 as uuidv4} from "uuid";

const Quiz = () => {
    const ChoiceNum = 4;
    const ButtonStateInit = () => {
        const UC = [];
        for(var i = 0;i < ChoiceNum;i++)
            UC.push({backgroundColor:"black"});
        return UC;
    }
    
    const QuestionInit = () => {
        const QuestionId = Math.floor(Math.random()*Question.length);
        const Quiz = Question[QuestionId];
        var QuizChoice = [...Quiz["choice"]];
        var ansFlag = Math.floor(Math.random()*ChoiceNum);

        const ChoiceButttonText = [];

        for(var i = 0;i < ChoiceNum;i++){
            const randomNum = Math.floor(Math.random()*(QuizChoice.length));
            if(i === ansFlag){
                ChoiceButttonText.push({text:Quiz["ans"] , isAns:true , id: i});
            }
            else{
                ChoiceButttonText.push({text:QuizChoice[randomNum] , isAns:false , id: i});
                QuizChoice.splice(randomNum,1);
            }
        }
        return {QuestionText: Quiz["text"],ChoiceButton:ChoiceButttonText,hintText: Quiz["hint"],comment: Quiz["comment"]};
    }

    const [ButtonState,setButtonState] = useState(ButtonStateInit());
    const [Choices,setChoices] = useState(QuestionInit());
    const [Correct,setCorrect] = useState({isAnswerd : false,state:false});

    const UserClickHandle = (id) => {
        const ChoicesButton = [...Choices.ChoiceButton];
        setButtonState(ChoicesButton.map((CC) => CC.id === id ? {backgroundColor:"green"} : {backgroundColor:"black"}));
    };

    const ButtonsGen = () => {
        const Button = [];
        for(var i = 0;i < ChoiceNum;i++)
            Button.push(<Choice item={Choices.ChoiceButton[i]} ButtonStyle={ButtonState} ClickHandle = {UserClickHandle} key={Choices.ChoiceButton[i].id}/>);
        return Button;
    };

    const ClickSubmit = () => {
        if(Correct.isAnswerd){
            setButtonState(ButtonStateInit());
            setChoices(QuestionInit());
            setCorrect({isAnswerd : false,state:false});
            return
        }
        const ChiceTags = [...Choices.ChoiceButton]
        const isCollect = ChiceTags.filter((choice) => (choice.isAns));
        //console.log(ButtonState[isCollect[0].id]);
        if(ButtonState[isCollect[0].id].backgroundColor === "green"){
            setCorrect({isAnswerd : true,state:true});
        }
        else{
            setCorrect({isAnswerd : true,state:false});
        }
    }

    return (
        <motion.div className='QuizDiv'
            initial={{
                opacity:0
            }}
            animate={{
                opacity:1
            }}
        >
            <div className="QuizText">
                <QuizText text={Choices.QuestionText}/>
            </div>
            <div className='Buttons'>
                {ButtonsGen()}
            </div>
            <motion.div className='resultMoniter'
                initial={
                    {
                        visibility:'hidden',
                        opacity:0
                    }
                }
                animate={
                    {   
                        visibility:(Correct.isAnswerd) ?  'visible' : 'hidden' ,
                        opacity:(Correct.isAnswerd) ?  1 : 0,
                    }
                }
                exit={
                    {
                        visibility:'hidden',
                        opacity:0
                    }
                }
            >
                <p className='result'>
                    {(Correct.isAnswerd) ? (Correct.state ? "正解" : "不正解") : ""}
                </p>
                <p className='hint'>
                    {(Correct.isAnswerd) ? (Correct.state ?  Choices.comment: Choices.hintText) : ""}
                </p>
                <div className = "NextButton">
                    <Submit onClick = {ClickSubmit} text = "次の問題"/>
                </div>

            </motion.div>
            <div className = "SubmitButton">
                <Submit onClick = {ClickSubmit} text = "答え合わせ"/>    
            </div>
        </motion.div>
    )
}

export default Quiz