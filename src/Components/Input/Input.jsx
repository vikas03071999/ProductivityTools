import React from 'react'
import "./Input.css"

const Input = ({inputValue,setInputValue}) => {
  return (
    <div className='inputContainer'>
      <textarea spellCheck="false" 
      onChange={(e)=>setInputValue(e.target.value)}
      className='inputTextArea' 
      placeholder='Your input here . . .'>

      </textarea>
    </div>
  )
}

export default Input
