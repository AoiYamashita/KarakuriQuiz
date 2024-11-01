import React from 'react'
import {motion} from 'framer-motion'
import "./Home.css"
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className='Home'>
      <h1 className='title'>
        ようこそ<br/>
        からくりサークル<br/>
        ゲームコーナーへ
      </h1>
      <p className='mainContent'>
        ここではからくりサークルに関するクイズやからくりサークルメンバーが作ったゲームをプレイして遊ぶことができるよ<br/>
        からくりサークルクイズのヒントや答えは夢科学展示の中に隠れているよ。<br/>
        全問正解して景品をもらおう<br/>
      </p>
      <div className='Links'>
        <Link className='QuizLink' to={"/quiz"}>からくりサークルクイズ</Link>
        <Link className='GearLink' to={"/gear"}>ギアゲーム</Link>
      </div>
    </div>
  )
}

export default Home