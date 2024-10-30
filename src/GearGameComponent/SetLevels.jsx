import { motion } from 'framer-motion'
import React from 'react'
import { GearGameData } from './GearGameData'
import "./GearGame.css"

const SetLevels = ({state,setState,setLevelHandle}) => {
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
                        setLevelHandle(key);
                        setState(true);
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