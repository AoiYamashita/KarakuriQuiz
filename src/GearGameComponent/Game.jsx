import React from 'react'
import { useState} from "react";
import { GearGameData } from './GearGameData';
import { motion } from 'framer-motion'
import "./GearGame.css"
import stakeImg from './stakeImg.png'
import gear10 from './gear10.png'
import gear14 from './gear14.png'
import gear18 from './gear18.png'
import gear20 from './gear20.png'

const Game = ({state,lv}) => {
    const Gears = [10,14,18,20].map((value) => {return value*5})

    const [UsingGear,setUsingGear] = useState({id:0});

    const makeStakes = () => {
       
        if(!state){
            return [];
        }

        const GameConfig = GearGameData[lv];
    
        const startArg = GameConfig.arg;
        const space = 10;    

        const stakes = [...GameConfig.answer];
        const FirstLength = Gears[stakes[0]]+Gears[stakes[1]];
        const StakeCoord = [[0,0],[FirstLength*Math.cos(startArg),FirstLength*Math.sin(startArg)]];
        for(var i = 2;i < stakes.length;i++){
            const a = Gears[stakes[i-2]]+Gears[stakes[i-1]];
            const b = Gears[stakes[i-1]]+Gears[stakes[i]];
            const c = Gears[stakes[i-2]]+Gears[stakes[i]] + space;
            const s = (a + b + c)/2.0;
            const S = Math.sqrt(s*(s-c)*(s-b)*(s-a));
            const theta = Math.asin(2*S/(a*b)) + Math.atan((StakeCoord[StakeCoord.length-2][1]-StakeCoord[StakeCoord.length-1][1])/(StakeCoord[StakeCoord.length-2][0]-StakeCoord[StakeCoord.length-1][0]));

            StakeCoord.push([StakeCoord[StakeCoord.length-1][0]+b*Math.cos(theta),StakeCoord[StakeCoord.length-1][1]+b*Math.sin(theta)]);
        }
        return StakeCoord.map(
                (i,key) => {
                    return <motion.img 
                            className='stakes'
                            key={key} 
                            initial ={{
                                x:0,
                                y:0
                            }}
                            animate={{
                                x:i[0],
                                y:i[1],
                            }
                            }
                            transition={{
                                duration:0.001
                            }
                            }
                            src = {stakeImg}
                            width= "30"
                            height = "30"
                        />
            });
    }

    const makeGears = () => {
        if(!state){
            return;
        }
        const GearImgNum = [gear10,gear14,gear18,gear20]
        return GearImgNum.map((value ,key) => {
            return <motion.img 
                className='Gears'
                drag
                style={{
                    position:'absolute',
                    aspectRatio: '1/1',
                    width : 2*Gears[key]+10
                }}
                src = {value}
                key={key}
                />
            })
    }

    return (
        <motion.div className='Game'
                initial ={{
                    opacity:0,
                    visibility:'hidden'
                }}
                animate ={{
                    opacity: state ? 1 : 0,
                    visibility: state ? 'visible' : 'hidden'
                }}
            >
            <div className='stakesDiv'>
                {makeStakes()}
            </div>
            <div className='GearsDiv'>
                {makeGears()}
            </div>
            
        </motion.div>
    )
}

export default Game