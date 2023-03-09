import React, { useEffect, useState } from 'react'
import './Chatgpt.css'
import { AiOutlineSend } from "react-icons/ai";
import BOTAvatar from "../../Images/BOTAvatar.PNG";
import MEAvatar from "../../Images/MEAvatar.PNG";
import axios from 'axios';

const Chatgpt = () => {

  const [chat, setChat] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    var objDiv = document.getElementsByClassName("chatgptChatSection");
    if(objDiv.length > 0){
      objDiv[0].scrollTop = objDiv[0].scrollHeight;
    } 
  }, [chat])
  const handleEnterPress = (e) => {
    if (e.key == 'Enter') {
      handleQuery()
    }
  }

  const handleQuery = async () => {
    if (inputValue.trim() === "") {
      return;
    }
    const reqObj = {
      "sender": "user",
      "text": inputValue
    }
    setChat((prevChat) => [...prevChat, reqObj])

    const client = axios.create({
      headers: {
        Authorization: "Bearer " + process.env.REACT_APP_API_KEY
      }
    })

    const params = {
      prompt: inputValue,
      model: "text-davinci-003",
      max_tokens: 500,
      temperature: 0,
    }
    setInputValue("")
    var response = await client.post(`https://api.openai.com/v1/completions`, params);
    console.log(response.data.choices[0].text);
    var refinedResponse = response.data.choices[0].text.trim().split("\n")
    console.log(refinedResponse);
    const resObj = {
      "sender": "bot",
      "text": refinedResponse
    }
    setChat((prevChat) => [...prevChat, resObj])
  }

  console.log(chat)
  return (
    <div className='chatgptContainer'>
      <div className="chatgptWrapper">
        <div className="chatgptChatSection">
          {/* <div className="chatgptSender">
            <img src={MEAvatar} alt="" className="avatarImg" />
            <div className="messageText">Hey, what's up ?</div>
          </div>
          <div className="chatgptBot">
            <img src={BOTAvatar} alt="" className="avatarImg" />
            <div className="messageText">Hi, what can I help you with today ?</div>
          </div> */}
          {
            chat && chat.map(item => {
              return (
                <div className={item.sender === 'user' ? 'chatgptSender' : 'chatgptBot'}>
                  <img src={item.sender === 'user' ? MEAvatar : BOTAvatar} className="avatarImg" />
                  <div className="messageText">{
                    item.sender === 'bot' ? item.text.map(ch => {
                      return (
                        <>
                          {ch}
                          <br />
                        </>
                      )
                    }) : item.text
                  } </div>
                </div>
              )
            })
          }
        </div>
        <div className="chatgptInputSection">
          <input type="text" autoFocus placeholder="Type here and kindly wait for the reply. . ." className="chatgptInput" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={(e) => handleEnterPress(e)} />
          <AiOutlineSend className='chatgptSendIcon' onClick={handleQuery} />
        </div>
      </div>
    </div>
  )
}

export default Chatgpt
