import React, { useState } from 'react'
import Input from '../../Components/Input/Input'
import Output from '../../Components/Output/Output'
import "./Grammar.css"
import axios from 'axios'
import { API_KEY } from "../../key"
import { FiClipboard } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import copy from "copy-to-clipboard";

const Grammar = () => {

  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("Response will appear here . . .");
  const [loading, setLoading] = useState(false);
  const [showCopyIcon, setShowCopyIcon] = useState(true);
  const [showCheckIcon, setShowCheckIcon] = useState(false);

  const handleCorrection = async () => {
    if (inputValue.trim() === "") {
      return;
    }
    setOutputValue("")
    setLoading(true)
    try {
      // Make api call to open AI model here and show the output in output div
      const client = axios.create({
        headers: {
          Authorization: "Bearer " + API_KEY
        }
      })

      const params = {
        prompt: `Correct the grammar in - ${inputValue}`,
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
    <div className='grammarContainer'>
      <FiClipboard className='clipboardIcon' onClick={copyToClipboard} style={{display: showCopyIcon ? "block" : "none"}} />
      <AiOutlineCheck className='clipboardIcon' style={{ display: showCheckIcon ? "block" : "none" }} />
      <div className="grammarWrapper">
        <Input inputValue={inputValue} setInputValue={setInputValue} />
        <button className='correctGrammarBtn' onClick={handleCorrection} style={{ pointerEvents: loading ? "none" : "all" }}>
          {loading ? "loading" : "Correct"}
        </button>
        <Output outputValue={outputValue} />
      </div>
    </div>
  )
}

export default Grammar
