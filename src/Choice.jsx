import React from 'react'
import { useState, useRef } from "react";
import "./ChoiceButton.css"

const Choice = ({item}) => {
    const [ButtonStyle,SetButtonStyle] = useState({backgroundColor:"whitegray"});
    const Choice = item.text;
    const OnClickHandle = () => {
        if(item.isAns)
            SetButtonStyle({backgroundColor:"blue"});
        else
            SetButtonStyle({backgroundColor:"red"});
    }
    return (
        <div>
            <button style = {ButtonStyle} onClick={OnClickHandle}>{Choice}</button>
        </div>
    )
}

export default Choice