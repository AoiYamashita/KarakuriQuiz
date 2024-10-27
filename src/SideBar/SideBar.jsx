import React from 'react'
import {SideBarData} from './SideBarData'
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

import "./SideBar.css"

const SideBar = () => {
    return (
        <div className='SideBar'>
            <p className='hedder'>MENU</p>
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
            
        </div>
    )
}

export default SideBar