import React from 'react'
import { useState , useRef} from "react";
import { GearGameData } from './GearGameData';
import { motion } from 'framer-motion'
import "./GearGame.css"

import {useWindowSize} from 'react-use';

import stakeImg from './stakeImg.png'
import gear10 from './gear10.png'
import gear14 from './gear14.png'
import gear18 from './gear18.png'
import gear20 from './gear20.png'
import { button } from 'framer-motion/client';
import GearControll from './GearControll';

const Game = ({state,lv,UsingGears,setUsingGears,setGearsState,GearsState}) => {
    const stakeRef = useRef();
    const GearRef = useRef();
  
    const { width, height } = useWindowSize();

    const stakeArea = 30*height/183;
    
    const Gears = [10,14,18,20].map((value) => {return value*height/183})

    const [ChoiceGear,setChoiceGear] = useState({id:0});
    const [StakeState,setStakeState] = useState([]);
    const [CoordFix,setCoordFix] = useState([]);

    var stakesCoord;

    const setPosition = () => {
        if (stakeRef.current) {
            const rect = stakeRef.current.getBoundingClientRect();
            setStakeState({
                x: rect.x+rect.width/2,    // x座標
                y: rect.y,    // y座標
            });
        }
    }

    const makeStakes = () => {
        if(!state){
            return [];

        }

        const GameConfig = GearGameData[lv];
    
        const startArg = GameConfig.arg;
        const space = 15;    

        const stakes = [...GameConfig.answer];
    
        const FirstLength = Gears[stakes[0]]+Gears[stakes[1]];
        const StakeCoord = [[0,30],[FirstLength*Math.cos(startArg),30+FirstLength*Math.sin(startArg)]];
        for(var i = 2;i < stakes.length;i++){
            const a = Gears[stakes[i-2]]+Gears[stakes[i-1]];
            const b = Gears[stakes[i-1]]+Gears[stakes[i]];
            const c = Gears[stakes[i-2]]+Gears[stakes[i]] + space;
            const s = (a + b + c)/2.0;
            const S = Math.sqrt(s*(s-c)*(s-b)*(s-a));
            const theta = Math.asin(2*S/(a*b)) + Math.atan((StakeCoord[StakeCoord.length-2][1]-StakeCoord[StakeCoord.length-1][1])/(StakeCoord[StakeCoord.length-2][0]-StakeCoord[StakeCoord.length-1][0]));

            StakeCoord.push([StakeCoord[StakeCoord.length-1][0]+b*Math.cos(theta),StakeCoord[StakeCoord.length-1][1]+b*Math.sin(theta)]);
        }
        stakesCoord = StakeCoord
        return StakeCoord.map(
            (i,key) => {
                return <motion.img 
                        onAnimationComplete={setPosition}
                        className='stakes'
                        key={key} 
                        initial ={{
                            x:0,
                            y:0
                        }}
                        animate={{
                            x:i[0]+"px",
                            y:i[1]+"px",
                        }
                        }
                        transition={{
                            duration:0.001
                        }
                        }
                        src = {stakeImg}
                        width= {10*height/183}
                        height = {10*height/183}
                    />
            })

    }

    const nextGears = () => {
        const newId = ChoiceGear.id + 1
        if(newId <= 3)
            setChoiceGear({id:newId})
    }
    const prevGears = () => {
        const newId = ChoiceGear.id - 1
        if(newId >= 0)
            setChoiceGear({id:newId})
    }

    const DragEndHandle = (key,key_) => (e) => {
        const prefStatus = GearsState[key][key_];
        const NewGearsState = [...GearsState]
        if (GearRef.current) {
            const rect = GearRef.current.getBoundingClientRect();
            const fix = {
                x: 0,    // x座標
                y:- StakeState.y - rect.y,    // y座標
            };
            console.log(StakeState.y,rect.y)
            setCoordFix(fix);
            var flag = true;
            var mini = stakeArea;
            for(var i = 0;i < GearGameData[lv].answer.length;i++){
                if(Math.sqrt((stakesCoord[i][0]-e.x+StakeState.x)*(stakesCoord[i][0]-e.x+StakeState.x) + (stakesCoord[i][1]-e.y+StakeState.y)*(stakesCoord[i][1]-e.y+StakeState.y)) < mini){
                    NewGearsState[key][key_] = {gearNum : prefStatus.gearNum,key:prefStatus.key,setStake:true,stakeNum:i,Moved:false};
                    mini = Math.sqrt((stakesCoord[i][0]-e.x+StakeState.x)*(stakesCoord[i][0]-e.x+StakeState.x) + (stakesCoord[i][1]-e.y+StakeState.y)*(stakesCoord[i][1]-e.y+StakeState.y))
                    flag = false;
                }
            }
        }
        if(flag)
            NewGearsState[key][key_] = {gearNum : prefStatus.gearNum,key:prefStatus.key,setStake:false,stakeNum:-1,Moved:false};
        setGearsState(NewGearsState)
    }

    const DragStartHandle = (key,key_) => (e) => {
        const prefStatus = GearsState[key][key_];
        const NewGearsState = [...GearsState]
        
        NewGearsState[key][key_] = {gearNum : prefStatus.gearNum,key:prefStatus.key,setStake:false,stakeNum:-1,Moved:false};
        setGearsState(NewGearsState)
    }

    const makeGears = () => {
        if(!state){
            return;
        }
        const GearsStateCopy = [...GearsState]
        const GearImgNum = [gear10,gear14,gear18,gear20]
        const Gearstree = GearsStateCopy.map((value_ ,key) => {
                    return value_.map((value,key_) => {
                        return <motion.img 
                                className='Gears'
                                onDragEnd={DragEndHandle(key,key_)}
                                onDragEnter={DragStartHandle(key,key_)}
                                drag
                                style={{
                                    position:'absolute',
                                    aspectRatio: '1/1',
                                    width : (2*Gears[key]+10+"px")
                                }}
                                initial = {{
                                    x : value.setStake ? stakesCoord[value.stakeNum][0]+CoordFix.x : 0,
                                    y : value.setStake ? stakesCoord[value.stakeNum][1]+CoordFix.y : 0,
                                    opacity:0
                                }
                                }
                                animate = {{
                                    x : value.setStake ? stakesCoord[value.stakeNum][0]+CoordFix.x : (ChoiceGear.id === key ? 0 : (ChoiceGear.id < key ? 1000 : -1000)),
                                    y : value.setStake ? stakesCoord[value.stakeNum][1]+CoordFix.y : 0,
                                    opacity:value.setStake ? 1 : (ChoiceGear.id === key ? 1 : 0)
                                }
                                }
                                transition= {{
                                    type:'spring',
                                    damping:10
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
            <div className='stakesDiv' ref={stakeRef}>
                {makeStakes()}
            </div>
            <div className='GearsDiv' ref = {GearRef}>
                {makeGears()}
                <p className='UsingGearsP'>{UsingGears[ChoiceGear.id]}</p>
            </div>
            
        </motion.div>
    )
}

export default Game