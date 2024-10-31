import React from 'react'
import { useState, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import { GearGameData } from './GearGameData';

import SetLevels from './SetLevels';
import Game from './Game';

const GearGame = () => {
    const [Level,setLevel] = useState(-1);
    const [State,setState] = useState(false);
    const [UsingGears,setUsingGears] = useState(State ? [GearGameData[Level].answer.filter(i => i === 0).length,
                                                        GearGameData[Level].answer.filter(i => i === 1).length,
                                                        GearGameData[Level].answer.filter(i => i === 2).length,
                                                        GearGameData[Level].answer.filter(i => i === 3).length] : [])
    return (
        <motion.div className='GearGameDiv'
            initial={{
                opacity:0
            }}
            animate={{
                opacity:1
            }}
        >
            <Game state={State} lv={Level} UsingGears = {UsingGears} setUsingGears = {setUsingGears}/>
            <SetLevels state={State} setState={setState} setLevelHandle={setLevel} setGears={setUsingGears}/>
        </motion.div>
    )
}

export default GearGame