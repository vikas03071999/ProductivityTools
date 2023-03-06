import React from 'react'
import "./Home.css"

const Home = () => {
  return (
    <div className='homeContainer'>
      <div className="homeWrapper">
        <h1 className="homeHeading">
            Stay productive and impeccable at work
        </h1>
        <div className="homeTools">
          <a className='homeTool' href="/Code" style={{textDecoration:"none",color:"white"}}>Code</a>
          <a className='homeTool' href="/GrammarPerfect" style={{textDecoration:"none",color:"white"}}>Grammar perfect</a>
          <a className='homeTool' href="/EmailGenerator" style={{textDecoration:"none",color:"white"}}>Email writer</a>
          <a className='homeTool' href="/SummaryExtractor" style={{textDecoration:"none",color:"white"}}>In short</a>
          <a className='homeTool' href="/Recapitulator" style={{textDecoration:"none",color:"white"}}>Recapitualte</a>
          <a className='homeTool' href="/ChatGPTlite" style={{textDecoration:"none",color:"white"}}>ChatGPT lite</a>
        </div>
      </div>
    </div>
  )
}

export default Home
