import React, { useState } from 'react'
import Input from '../../Components/Input/Input';
import Output from '../../Components/Output/Output';
import './Summary.css'
import axios from 'axios';
// import { API_KEY } from "../../key"
import { FiClipboard } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import copy from "copy-to-clipboard";


const Summary = () => {
  // State and variable area
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("Response will appear here . . .");
  const [loading, setLoading] = useState(false);
  const [showCopyIcon, setShowCopyIcon] = useState(true);
  const [showCheckIcon, setShowCheckIcon] = useState(false);

  // Function declarationas and definitions goes here
  const generateSummary = async () => {
    if (inputValue.trim() === "") {
      return;
    }
    setOutputValue("")
    setLoading(true)
    try {
      // Make api call to open AI model here and show the output in output div
      const client = axios.create({
        headers: {
          Authorization: "Bearer " + process.env.REACT_APP_API_KEY
        }
      })

      const params = {
        prompt: `Summarize the following - ${inputValue}`,
        model: "text-davinci-003",
        max_tokens: 500,
        temperature: 0,
      }
      var response = await client.post(`https://api.openai.com/v1/completions`, params);
      console.log(response.data.choices[0].text);
      setOutputValue(response.data.choices[0].text.trim());
    }
    catch (err) {
      console.log(err);
    }
    setLoading(false)
  }

  const copyToClipboard = () => {
    if (outputValue === "") {
      return;
    }
    setShowCopyIcon(false);
    setShowCheckIcon(true);
    copy(outputValue);
    setTimeout(() => {
      setShowCheckIcon(false)
      setShowCopyIcon(true)
    }, 2000)
  }

  return (
    <div className='summaryContainer'>
      <FiClipboard className='clipboardIcon' onClick={copyToClipboard} style={{display: showCopyIcon ? "block" : "none"}} />
      <AiOutlineCheck className='clipboardIcon' style={{ display: showCheckIcon ? "block" : "none" }} />
      <div className="summaryWrapper">
        <Input inputValue={inputValue} setInputValue={setInputValue}/>
        <button className='summaryBtn' onClick={generateSummary}>
          {loading ? "loading..." : "Summarize"}
        </button>
        <Output outputValue={outputValue}/>
      </div>
    </div>
  )
}

export default Summary
