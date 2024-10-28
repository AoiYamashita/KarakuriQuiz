import './App.css';
import Quiz from "./QuizComponent/Quiz"
import Home from './Home/Home';
import SideBar from './SideBar/SideBar';
import {AnimatePresence, motion } from "framer-motion"

import {useLocation ,Route ,Routes} from "react-router-dom";


function App() {
    const location = useLocation()
    return (
        <AnimatePresence>
            <motion.div className='MainDiv'>
                <Routes locations={location} key={location.pathname}>
                    <Route path="/" element={<Home />}/>
                    <Route path="/quiz" element={<Quiz />} />
                </Routes>
                <SideBar />
            </motion.div>
        </AnimatePresence>
    );
}

export default App;
