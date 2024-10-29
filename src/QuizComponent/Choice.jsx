import React from 'react'
import { useState, useRef } from "react";

const Choice = ({item,ButtonStyle,ClickHandle}) => {
    const Choice = item.text;
    const onClickHandle = () => {
        ClickHandle(item.id);
    }
    return (
        <div className = "choicebutton">
            <button  style = {ButtonStyle[item.id]} onClick={onClickHandle} key={item.id}>{Choice}</button>
        </div>
    )
}

export default Choice