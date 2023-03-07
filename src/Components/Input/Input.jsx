import React from 'react'
import "./Input.css"

const Input = ({inputValue,setInputValue,param}) => {
  var placeholderValue = "";
  if(param === "Grammar"){
      placeholderValue = "I will correct grammar in your sentences, please type here . . ."
  }
  else if(param === "Rephrase"){
    placeholderValue = "I will try to rewire your sentence, please type here . . ."
  }
  else if(param === "Summary"){
    placeholderValue = "I will try to generate summary, paste your paragraph here . . ."
  }
  return (
    <div className='inputContainer'>
      <textarea spellCheck="false" 
      onChange={(e)=>setInputValue(e.target.value)}
      className='inputTextArea' 
      placeholder={placeholderValue}>

      </textarea>
    </div>
  )
}

export default Input
