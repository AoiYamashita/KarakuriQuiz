import React from 'react'

import gear10 from './gear10.png'
import gear14 from './gear14.png'
import gear18 from './gear18.png'
import gear20 from './gear20.png'
import { motion } from 'framer-motion'


const makeGears = (state,GearsState,DragEndHandle,Gears,stakesCoord,ChoiceGear,prevGears,nextGears) => {
    if(!state){
        return;
    }
    const GearImgNum = [gear10,gear14,gear18,gear20]
    const Gearstree = GearsState.map((value_ ,key) => {
                return value_.map((value,key_) => {
                    return <motion.img 
                            className='Gears'
                            onDragEnd={DragEndHandle(key,key_)}
                            drag
                            style={{
                                position:'absolute',
                                aspectRatio: '1/1',
                                width : (2*Gears[key]+10+"px")
                            }}
                            initial = {{
                                x:value.setstake ? stakesCoord[value.stakeNum][0] : 0,
                                y:value.setstake ? stakesCoord[value.stakeNum][1] : 0,
                                opacity:0
                            }
                            }
                            animate = {{
                                x:value.setstake ? stakesCoord[value.stakeNum][0] : (ChoiceGear.id === key ? 0 : (ChoiceGear.id < key ? 1000 : -1000)),
                                y:value.setstake ? stakesCoord[value.stakeNum][1] : 0,
                                opacity:ChoiceGear.id === key ? 1 : 0
                            }
                            }
                            src = {GearImgNum[key]}
                            key={key+10*key_}
                            />})
                    
        });
    const madeGears = [...Gearstree[0],...Gearstree[1],...Gearstree[2],...Gearstree[3]]
    return [
    <motion.button className="PrevGearButton" key="prevButton" onClick={prevGears}
    initial={{opacity:1,visibility:"visible"}}
    animate={{
        opacity:ChoiceGear.id > 0 ? 1 : 0,
        visibility:ChoiceGear.id > 0 ? "visible" : "hidden"
    }}
    >{"<"}</motion.button>,
    <div key = "madeGearDiv" className='ChoiceGears'>{[...madeGears]}</div>,
    <motion.button className="NextGearButton" key="nextButton" onClick={nextGears}
    initial={{opacity:1,visibility:"visible"}}
    animate={{
        opacity:ChoiceGear.id < 3 ? 1 : 0,
        visibility:ChoiceGear.id < 3 ? "visible" : "hidden"
    }}
    >{">"}</motion.button>]
}

export default makeGears