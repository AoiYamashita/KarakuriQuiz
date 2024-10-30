import React from 'react'
import { useState, useRef } from "react";
import { motion, useDragControls } from "framer-motion";
import SetLevels from './SetLevels';
import Game from './Game';

const GearGame = () => {
    const [Level,setLevel] = useState(-1);
    const [State,setState] = useState(false);
    return (
        <motion.div className='GearGameDiv'
            initial={{
                opacity:0
            }}
            animate={{
                opacity:1
            }}
        >
            <Game state={State} lv={Level}/>
            <SetLevels state={State} setState={setState} setLevelHandle={setLevel}/>
        </motion.div>
    )
}

export default GearGame