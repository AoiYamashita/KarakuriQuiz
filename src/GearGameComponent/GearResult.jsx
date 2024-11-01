import React from 'react'
import { motion, useDragControls } from "framer-motion";
import { GearGameData } from './GearGameData'

import './GearGame.css'

const GearResult = ({Comp,lv,setLvState,resetGames}) => {

    const goToHome = () => {
        setLvState(-1,false);
        resetGames();

    }

    const goToNext = () => {
        setLvState(lv+1,true);
        resetGames();
    }
    return (
        <motion.div className='Result'
            initial={{
            opacity: Comp ? 1:0,
            visibility:Comp ? "visible":"hidden",
            y :1000
            }
            }
            animate={{
            opacity: Comp ? 1 : 0,
            visibility:Comp ? "visible":"hidden",
            y :0
            }}
            transition={{
            duration:Comp ? 5:0
            }}
        >
        <p className='ClearView'>
            Clear
        </p>
        <div className='ClearButtons'>
        <button className='HomeButton' onClick={goToHome}>Home</button>
        <motion.button className='Nextlv' onClick={goToNext}
            initial={{
                opacity:lv < GearGameData.length-1 ? 1:0,
                visibility:lv < GearGameData.length-1 ? "visible":"hidden",
            }
            }
            animate={{
                opacity:lv < GearGameData.length-1 ? 1:0,
                visibility:lv < GearGameData.length-1 ? "visible":"hidden",
            }
            }
        >NextLv</motion.button>
        </div>
        </motion.div>
    )
}

export default GearResult