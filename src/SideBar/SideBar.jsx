import React from 'react'
import { useState} from "react";
import {SideBarData} from './SideBarData'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import "./SideBar.css"

const SideBar = () => {
    const [Visible,setBisible] = useState({state: false});
    const visibleHandle = () => {
        console.log(Visible)
        setBisible({state:!Visible.state});
    }
    return (
        <motion.div className='SideBarDiv'
            initial={{width : "30%",height:"20%"}}
            animate={Visible.state ? {width:"50%",height:"100%"} : {width:"30%",height:"20%"}}
            transition={{
                ease: "linear"
            }
            }
        >
            <p onClick={visibleHandle} className='hedder'>
                MENU
            </p>
            <motion.div
                className='SideBar'
                initial={{x : -200}}
                animate={Visible.state ? {x : 0} : {x : -200}}
                transition={{
                    ease: "linear"
                }
                }
                exit={{x:-100}}
            >
                <ul>
                    {
                    SideBarData.map(
                    (value ,key) => {
                        return (
                        <li key = {key}>
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