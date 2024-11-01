import React from 'react'
import { motion, useDragControls } from "framer-motion";

import './GearGame.css'

const GearResult = (Comp) => {
  return (
    <motion.div className='Result'
        initial={{
            opacity: Comp ? 1:0
        }
        }
    >
    <div>
        GearResult
    </div>
    </motion.div>
  )
}

export default GearResult