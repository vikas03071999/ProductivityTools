import React from 'react'
import "./Output.css"

const Output = ({outputValue}) => {
  return (
    <div className='outputContainer'>
      <div className="ouputDiv" style={{color: outputValue === "Response will appear here . . ." ? "gray":"white"}}>
        {outputValue}
      </div>
    </div>
  )
}

export default Output
