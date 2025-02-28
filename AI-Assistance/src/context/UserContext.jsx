import React, { createContext, useState } from 'react'
import run from '../gemini';
export const datacontext = createContext()

export default function UserContext({children}) {


let [speaking, setSpeaking] = useState(false) //When We Speak

let [recText, setrecText] = useState("Listening...") //When It will Listen


let [response, setResponse] = useState(false) //When it Respones

function takeCommand(command)
{
  if(command.includes("open") && command.includes("youtube"))
  {
    window.open("https://www.youtube.com/" , "_blank")
    speak("opening youtube...")

    
    setTimeout( () =>
      {

        setSpeaking(false)
       

      },5000)

      
  }

        
    else if(command.includes("open") && command.includes("instagram"))
      {
        window.open("https://www.instagram.com/" , "_blank")
        speak("opening instagram...")
    
        
        setTimeout( () =>
          {
    
            setSpeaking(false)
           
    
          },5000)
    
          
      }

      else if(command.includes("open") && command.includes("x"))
        {
          window.open("https://www.x.com/" , "_blank")
          speak("opening x...")
      
          
          setTimeout( () =>
            {
      
              setSpeaking(false)
             
      
            },5000)
      
            
        }


        else if(command.includes("open") && command.includes("facebook"))
          {
            window.open("https://www.facebook.com/" , "_blank")
            speak("opening facebook...")
        
            
            setTimeout( () =>
              {
        
                setSpeaking(false)
               
        
              },5000)
        
              
          }

          else if(command.includes("open") && command.includes("whatsapp"))
            {
              window.open("https://web.whatsapp.com/" , "_blank")
              speak("opening whatsapp...")
          
              
              setTimeout( () =>
                {
          
                  setSpeaking(false)
                 
          
                },5000)
          
                
            }


            else if(command.includes("open") && command.includes("linkedin"))
              {
                window.open("https://www.linkedin.com/" , "_blank")
                speak("opening linkedin...")
            
                
                setTimeout( () =>
                  {
            
                    setSpeaking(false)
                   
            
                  },5000)
            
                  
              }

  else if(command.includes("open") && command.includes("google"))
    {
      window.open("https://www.google.co.in/" , "_blank")
      speak("opening google...")
  
      
      setTimeout( () =>
        {
  
          setSpeaking(false)
         
  
        },5000)
  
        
    }

  else aiResponse(transcript)
}

    function speak(text)
    {

      /*
        let TextSpeak = new SpeechSynthesisUtterance(text)
        TextSpeak.volume =5;
        TextSpeak.rate=1;
        TextSpeak.pitch=1;
        TextSpeak.lang = "hi-GB";
        window.speechSynthesis.speak(TextSpeak)



        const synth = window.speechSynthesis;
      const utterance = new SpeechSynthesisUtterance(text);
      
     
      const voices = synth.getVoices();
      utterance.voice = voices.find(voice => voice.name.includes("Female") || voice.name.includes("Google UK English Female")) || voices[0];
  
      utterance.pitch = 1.2; // Slightly higher pitch for a more feminine sound
      utterance.rate = 1; // Normal speed
      synth.speak(utterance);
*/

const synth = window.speechSynthesis;
const utterance = new SpeechSynthesisUtterance(text);

function setVoice() {
    const voices = synth.getVoices();

    // Manually select a female voice from the list
    const femaleVoices = voices.filter(voice =>
        voice.name.toLowerCase().includes("female") || 
        voice.name.toLowerCase().includes("zira") || 
        voice.name.toLowerCase().includes("samantha") || 
        voice.name.toLowerCase().includes("eva") || 
        voice.name.toLowerCase().includes("Google हिन्दी female")
    );

    utterance.voice = femaleVoices[0] || voices.find(v => v.lang.includes("en")) || voices[0];

    utterance.volume = 3;
    utterance.pitch = 1.3; // Higher pitch for femininity
    utterance.rate = 1; // Normal speed
    synth.speak(utterance);
}

if (synth.getVoices().length > 0) {
    setVoice();
} else {
    synth.onvoiceschanged = setVoice;
}

        
    }
    

    async function aiResponse(prompt)
    {
       let text =  await run(prompt)
       let newText = text.split("*")&& text.split("**") && 
       text.replace("google", "Mr. AMIT Kiran Kar")&&
        text.replace("Google","AmitKiran Kar")&&
        
         text.replace("a large language model" , "AmIty")&&
         text.replace("Google","Amit KiranKar")
      
       setrecText(newText)
       speak(newText)
       setResponse(true)

       setTimeout( () =>
      {

        setSpeaking(false)
        setResponse(true)

      },5000)

     
      
    }





    let SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  let recognition = new SpeechRecognition();
  recognition.continuous = true; // Keeps listening until manually stopped
  recognition.interimResults = false; // Only final results
  recognition.lang = "en-US"; // Change language as needed

  recognition.onresult = (e) => {
    let currentIndex = e.resultIndex;
    let transcript = e.results[currentIndex][0].transcript; // Fixed error
    setrecText(transcript)
    aiResponse(transcript)
    takeCommand(transcript.toLowerCase())
  };

  let value = {  recognition ,
    speaking,
    setSpeaking,
    recText,
    setrecText,
    response,
    setResponse
  };


  return (
    <div>
        <datacontext.Provider value={value}> 
            {children}

        </datacontext.Provider>
     
    </div>
  )
}



