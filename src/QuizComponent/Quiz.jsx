import React from 'react'
import { useState, useRef } from "react";
import Question from "../QuizData.json"
import Choice from "./Choice"
import QuizText from "./QuizText"
import Submit from "./Submit"
import "./Quiz.css"
import {v4 as uuidv4} from "uuid";

const Quiz = () => {
    const ChoiceNum = 4;

    const ButtonStateInit = () => {
        const UC = [];
        for(var i = 0;i < ChoiceNum;i++)
            UC.push({backgroundColor:"aliceblue"});
        return UC;
    }
    
    const QuestionInit = () => {
        const QuestionId = Math.floor(Math.random()*5);
        const Quiz = Question["Question"+QuestionId];
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
        return {QuestionText: Quiz["text"],ChoiceButton:ChoiceButttonText};
    }

    const [ButtonState,setButtonState] = useState(ButtonStateInit());
    const [Choices,setChoices] = useState(QuestionInit());    

    const UserClickHandle = (id) => {
        const ChoicesButton = [...Choices.ChoiceButton];
        setButtonState(ChoicesButton.map((CC) => CC.id === id ? {backgroundColor:"green"} : {backgroundColor:"aliceblue"}));
    };

    const ButtonsGen = () => {
        const Button = [];
        for(var i = 0;i < ChoiceNum;i++)
            Button.push(<Choice item={Choices.ChoiceButton[i]} ButtonStyle={ButtonState} ClickHandle = {UserClickHandle} key={Choices.ChoiceButton[i].id}/>);
        return Button;
    };

    const ClickSubmit = () => {
        const ChiceTags = [...Choices.ChoiceButton]
        const isCollect = ChiceTags.filter((choice) => (choice.isAns));
        console.log(ButtonState[isCollect[0].id]);
        if(ButtonState[isCollect[0].id].backgroundColor === "green"){
            console.log("正解");    
        }
        else{
            console.log("不正解");
        }
    }

    return (
        <div className='QuizDiv'>
            <QuizText text={Choices.QuestionText}/>
            {ButtonsGen()}
            <Submit onClick = {ClickSubmit}/>
        </div>
    )
}

export default Quiz