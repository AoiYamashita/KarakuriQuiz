import React from 'react'
import { useState, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { GearGameData } from './GearGameData';

import SetLevels from './SetLevels';
import Game from './Game';
import GearResult from './GearResult';

const GearGame = () => {
    const [Level,setLevel] = useState(-1);
    const [State,setState] = useState(false);
    const [UsingGears,setUsingGears] = useState(State ? [GearGameData[Level].answer.filter(i => i === 0).length,
                                                        GearGameData[Level].answer.filter(i => i === 1).length,
                                                        GearGameData[Level].answer.filter(i => i === 2).length,
                                                        GearGameData[Level].answer.filter(i => i === 3).length] : [])
    const [GearsState,setGearsState] = useState(UsingGears.map(
        (value,key) => {
            const ref = []
            for(var i = 0;i < value;i++)
                ref.push({gearNum : key,key:i,setStake:false,stakeNum:-1,Correct:false})
            return ref
        }));
    const setLvState = (newlv,newstate) => {
        setLevel(newlv);
        setState(newstate);
        setUsingGears(newstate ? [GearGameData[newlv].answer.filter(i => i === 0).length-2,
                        GearGameData[newlv].answer.filter(i => i === 1).length,
                        GearGameData[newlv].answer.filter(i => i === 2).length,
                        GearGameData[newlv].answer.filter(i => i === 3).length] : [])
        setGearsState((newstate ? [GearGameData[newlv].answer.filter(i => i === 0).length-2,
                        GearGameData[newlv].answer.filter(i => i === 1).length,
                        GearGameData[newlv].answer.filter(i => i === 2).length,
                        GearGameData[newlv].answer.filter(i => i === 3).length] : []).map(
                            (value,key) => {
                                const ref = []
                                for(var i = 0;i < value;i++)
                                    ref.push({gearNum : key,key:i,setStake:false,stakeNum:-1,Correct:false})
                                return ref
                            }));
        }
    return (
        <motion.div className='GearGameDiv'
            initial={{
                opacity:0
            }}
            animate={{
                opacity:1
            }}
        >
            <Game state={State} lv={Level} UsingGears = {UsingGears} setUsingGears = {setUsingGears}setGearsState={setGearsState} GearsState={GearsState} setLvState={setLvState}/>
            <SetLevels state={State} setState={setState} setLevelHandle={setLevel} setGears={setUsingGears} setGearsState={setGearsState}/>
        </motion.div>
    )
}

export default GearGame