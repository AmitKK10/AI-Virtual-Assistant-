
import React, { useContext } from "react";
import "./App.css";
import { FaMicrophone } from "react-icons/fa";

import Amityimg from "./assets/amiti.jpeg"; // Importing the image correctly

import Amityimg1 from "./assets/amity.jpeg";





import { datacontext } from "./context/userContext";

import speakingGif from "./assets/speak.gif";

import AIVoice from "./assets/aiVoice.gif";



export default function App() {

let {recognition,speaking,setSpeaking,recText,setrecText,response,setResponse} = useContext(datacontext)
  

  return (
    <div className="main">
      <img src={Amityimg1} alt="AI Virtual Assistance" id="AMITI" />
      <span className="description">I'm AmIty , Your AI Assistance </span>
      {!speaking ?
      <button className="mic-button" onClick={ ()=>
        {

          setrecText("Listening...")
          recognition.start()
          setSpeaking(true)

        }
      }>
        Click here <FaMicrophone className="mic-icon" />
      </button >
      :
      <div className="response">
        {!response ?
         <img src={speakingGif} alt="Speaking Gif" id="speak"/>
         :
         <img src={AIVoice} alt="Speaking Gif" id="voice"/> }

<p>{recText}</p>
      </div>
}    
    </div>
  );
}



