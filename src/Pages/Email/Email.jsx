import React, { useState } from 'react'
import "./Email.css"
import axios from 'axios'
// import { API_KEY } from "../../key"
import { FiClipboard } from "react-icons/fi";
import { AiOutlineCheck } from "react-icons/ai";
import copy from "copy-to-clipboard";

const Email = () => {
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState(["Generated email will appear here . . ."]);
  const [loading, setLoading] = useState(false);
  const [showCopyIcon, setShowCopyIcon] = useState(true);
  const [showCheckIcon, setShowCheckIcon] = useState(false);

  const generteEmail = async () => {
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
        prompt: `Write an email for the following - ${inputValue}`,
        model: "text-davinci-003",
        max_tokens: 500,
        temperature: 0,
      }
      var response = await client.post(`https://api.openai.com/v1/completions`, params);
      var temp = response.data.choices[0].text;
      console.log(temp);
      await setOutputValue(response.data.choices[0].text.trim().split("\n"));
      console.log(outputValue)
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
    <div className='emailContainer'>
      <FiClipboard className='emailClipboardIcon' onClick={copyToClipboard} style={{display: showCopyIcon ? "block" : "none"}} />
      <AiOutlineCheck className='emailClipboardIcon' style={{ display: showCheckIcon ? "block" : "none" }} />
      <div className="emailWrapper">
        <input type="text" autoFocus spellCheck={false} className="emailInput" placeholder='Email purpose here . . .' onChange={(e)=>setInputValue(e.target.value)}/>
        <button className='emailGenerateBtn' onClick={generteEmail}>
          {loading ? "loading..." : "Generate"}
        </button>
        <div className="emailOutput" style={{color: outputValue.length !== 1 ? "white":"gray"}}>
          {
            outputValue && outputValue.map(val => {
              return (
                <>
                  {val}
                  <br />
                </>
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Email
