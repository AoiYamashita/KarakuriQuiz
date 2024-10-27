import './App.css';
import Quiz from "./QuizComponent/Quiz"
import Home from './Home/Home';
import SideBar from './SideBar/SideBar';
import {AnimatePresence, motion } from "framer-motion"

import {Route ,Routes} from "react-router-dom";
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
    const location = useLocation()
    return (
        <AnimatePresence>
            <SideBar />
            <Routes locations={location} key={location.pathname}>
                <Route exact path="./">
                    <Home />
                </Route>
                <Route path="/quiz">
                    <Quiz />
                </Route>
            </Routes>
        </AnimatePresence>
    );
}

export default App;
