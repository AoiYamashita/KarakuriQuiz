import React from 'react'
import { useState, useRef } from "react";
import "./ChoiceButton.css"

const Choice = ({item,ButtonStyle,ClickHandle}) => {
    const Choice = item.text;
    const onClickHandle = () => {
        ClickHandle(item.id);
    }
    return (
        <div>
            <button style = {ButtonStyle[item.id]} onClick={onClickHandle} key={item.id}>{Choice}</button>
        </div>
    )
}

export default Choice