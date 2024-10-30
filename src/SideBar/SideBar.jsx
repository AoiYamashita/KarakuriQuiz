import React from 'react'
import { useState} from "react";
import {SideBarData} from './SideBarData'
import { Link } from 'react-router-dom';
import { delay, motion } from 'framer-motion';

import "./SideBar.css"

const SideBar = () => {
    const [Visible,setBisible] = useState({state: false});
    const visibleHandle = () => {setBisible({state:!Visible.state});}
    return (
        <motion.div className='SideBarDiv'
            initial={{
                width : "100%",
                height:"20%",
                backgroundColor:" rgba(9, 9, 160,0)"}}
            animate={
                Visible.state ? 
                {width:"200px",height:"100%",backgroundColor:" rgb(9, 9, 160)"} : 
                {width:"100px",height:"20%",backgroundColor:" rgba(9, 9, 160,0)"}}
            transition={{
                delay: (Visible.state ? 0 :0.2 ),
                duration: 0.1,
                case:"linear"
            }
            }
        >
            <p onClick={visibleHandle} className='hedder'>
                MENU
            </p>
            <motion.div
                className='SideBar'
                initial={
                    {
                        opacity : 0,
                        x:-100
                    }
                }
                animate={
                {
                    opacity : Visible.state ? 1 : 0,
                    x : Visible.state ? 0 : -100
                }
                }
                transition={{
                    delay: (Visible.state ? 0.2 : 0),
                    duration: 0.1,
                    ease: "linear"
                }
                }
                exit={{opacity:0}}
            >
                <ul>
                    {
                    SideBarData.map(
                    (value ,key) => {
                        return (
                        <li onClick={visibleHandle} key = {key}>
                            <Link className='SideLink' to={value.path}>
                                {value.text}
                            </Link>
                        </li>
                        );
                    }
                    )
                    
                    }
                </ul>
                
            </motion.div>
        </motion.div>
    )
}

export default SideBar