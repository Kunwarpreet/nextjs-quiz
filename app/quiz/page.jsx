'use client'
import React, { useState } from 'react'
import {quiz} from '../data.js'

const page = () => {
  const [activeQuestion,setActiveQuestion] = useState(0)
  const [selectedAnswer,setSelectedAnswer] = useState(null)
  const [selectedAnswerIndex,setSelectedAnswerIndex] = useState(null)
  const [showResult,setShowResult] = useState(false)
  const [checked,setChecked] = useState(false)

  const {questions} = quiz;
  const {question,answers,correctAnswer} = questions[activeQuestion];

  const [result,setResult] = useState({
    score:0,
    correctAnswers:0,
    wrongAnswers:0
  })

  const onAnswerSelected = (answer,idx)=>{
    setChecked(true);
    setSelectedAnswerIndex(idx)
    if(answer===correctAnswer){
      setSelectedAnswer(true)
    }else{
      setSelectedAnswer(false)
    }
  }

  const nextQuestion = ()=>{
    setSelectedAnswerIndex(null)
    setChecked(false)
    setResult((prev)=>
    selectedAnswer?{
        ...prev,
      score:prev.score+5,
      correctAnswers:prev.correctAnswers+1}
    :{
      ...prev,
      wrongAnswers:prev.wrongAnswers+1,
    })


    if(activeQuestion!==questions.length-1){
      setActiveQuestion((prev)=>prev+1)
    }
    else{
      setShowResult(true)
      setActiveQuestion(0)
    };
    
  }

  return (
    <div className='container'>
      <h1>Quiz Game</h1>
      <h2>Questions {activeQuestion+1}/{questions.length}</h2>
      <div>
        {!showResult?(<div className='quiz-container'>
          <h3>{questions[activeQuestion].question}</h3>
          {answers.map((answer,idx)=>(
            <li onClick={()=>onAnswerSelected(answer,idx)} key={idx} 
            className={selectedAnswerIndex===idx?'li-selected' : 'li-hover'}>{answer}</li>
          ))}

          {checked?<button onClick={nextQuestion} className='btn'>{activeQuestion===question.length-1?'finish':'next'}</button>
          :
          <button disabled onClick={nextQuestion} className='btn-disabled'>{activeQuestion===question.length-1?'finish':'next'}</button>}

        </div>)

        :

        (<div className='quiz-container'>
          <p>Total Score: {result.score}</p>
          <h3>Overall % : <span>{(result.score/25)*100}%</span></h3>

          <p>Correct Answers:{result.correctAnswers}/{questions.length}
          </p>

          <p>Wrong Answers:{result.wrongAnswers}/{questions.length}
          </p>

          <button className='btn' onClick={()=>window.location.reload()}>Restart</button>
        </div>)}

      </div>
    </div>
  )
}

export default page