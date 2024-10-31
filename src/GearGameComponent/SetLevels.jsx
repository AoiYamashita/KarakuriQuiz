import { motion } from 'framer-motion'
import React from 'react'
import { GearGameData } from './GearGameData'
import "./GearGame.css"

const SetLevels = ({state,setState,setLevelHandle,setGears}) => {
    const Size = GearGameData.length;
    const GearGameDataCopy = [...GearGameData];
    const StartGearSize = 10;
    const EndGearSize = 10;
    return (
        <motion.div className='setLevels'
            initial ={{
                opacity:0,
                visibility:'hidden'
            }}
            animate ={{
                opacity: state ? 0 : 1,
                visibility: state ? 'hidden' : 'visible'
            }}
        >
        <p className='title'>
            ゲームレベルを選んでください
        </p>
        <ul>
            {GearGameDataCopy.map(
                (value,key) => {
                    return (
                    <li onClick={() => {
                        const newLv = key;
                        const newState = true
                        setLevelHandle(newLv);
                        setState(newState);
                        setGears([GearGameData[newLv].answer.filter(i => i === 0).length,
                                    GearGameData[newLv].answer.filter(i => i === 1).length,
                                    GearGameData[newLv].answer.filter(i => i === 2).length,
                                    GearGameData[newLv].answer.filter(i => i === 3).length]);
                    }} key={key}>
                        LEVEL{key}
                    </li>
                    );
                }
            )
            }
        </ul>
            
        </motion.div>
    )
}

export default SetLevels