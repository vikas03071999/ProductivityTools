import React from 'react'
import "./Output.css"

const Output = ({outputValue,param}) => {
  var defaultVal = "";
  if(param === "Grammar"){
    defaultVal = "Correct grammar will be displayed here . . ."
  }
  else if(param === "Rephrase"){
    defaultVal = "Rewired response will be displayed here . . ."
  }
  else if (param === "Summary"){
    defaultVal = "Summary will be displayed here . . ."
  }
  return (
    <div className='outputContainer'>
      <div className="ouputDiv" style={{color: outputValue === defaultVal ? "gray":"white"}}>
        {outputValue}
      </div>
    </div>
  )
}

export default Output
