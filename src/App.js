import './App.css';
import { useState, useRef } from "react";
import Question from "./QuizData.json"
import Choice from "./Choice"
import QuizText from "./QuizText"
import {v4 as uuidv4} from "uuid";


function App() {
  const [Choices,setChoices] = useState([]);

  const ChoiceNum = 4;
  const QuestionId = Math.floor(Math.random()*5);

  const Quiz = Question["Question"+QuestionId];
  var QuizChoice = [...Quiz["choice"]];
  var ansFlag = Math.floor(Math.random()*ChoiceNum);
  for(var i = 0;i < ChoiceNum;i++){
    const randomNum = Math.floor(Math.random()*(QuizChoice.length));
    if(i === ansFlag){
      Choices.push({text:Quiz["ans"] , isAns:true , id:uuidv4()});
    }
    else{
      Choices.push({text:QuizChoice[randomNum] , isAns:false , id:uuidv4()});
      QuizChoice.splice(randomNum,1);
    }
  }
  return (
    <div className="App">
      <QuizText text={Quiz["text"]}/>
      <Choice item={Choices[0]}/>
      <Choice item={Choices[1]}/>
      <Choice item={Choices[2]}/>
      <Choice item={Choices[3]}/>
    </div>
  );
}

export default App;
