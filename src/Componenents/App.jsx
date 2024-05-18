import React, {useEffect, useState} from 'react';

import questionData from "./question.json";
const App = () => {

  const [currentQuestion, setCurrentQuestion]=
  useState(0);
  const [score, setScore]= useState(0);
  const [showScore ,setShowScore]=useState(false);
  const [timer,setTimer]=useState(10);

  useEffect(()=>{
let interval;
if(timer>0 && !showScore){
  interval=setInterval(()=>{
    setTimer((prevTimer)=> prevTimer -1);

  },1000);
} else{
  clearInterval(interval);
  setShowScore(true);
}
return ()=>clearInterval(interval);

  },[timer,showScore])

  const handleAnswerClick =( selectedAnswerChoices)=>{
    if(selectedAnswerChoices===questionData[currentQuestion].correctIndex){
      setScore((prevScore) => prevScore+1)
    }
    if(currentQuestion<questionData.length-1)
    {
      setCurrentQuestion((pervQuestion)=>
    pervQuestion +1);
    setTimer(10);
    }
    else{
      setShowScore(true)
    }
  };

  const handlerestartQuiz = ()=>{
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setTimer(10);
  }
  return (
    <>

    <div>
     
     <div className='quiz-app'>

      {showScore ? (<div className="score-section" >
      <h2>Your Score : {score}/{questionData.length}</h2>
      <button className='btn' onClick={handlerestartQuiz}>Restart</button>
        </div>):(    
     <div className='question-section'>
      <h2 >Question {currentQuestion +1}</h2>
      <p>{questionData[currentQuestion].question}</p>
      <div className='answers'>
{questionData[currentQuestion].answers.map((answers,index)=>(
  <button onClick={()=>handleAnswerClick(answers)} className='opt' key={index}>{answers}</button>
))}
      </div>
      <div className='timer'> Time Left: <span>{timer}s</span> </div>
     </div>)}

     </div>
    </div>
    </>
   
  )
}

export default App
