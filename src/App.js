import React from 'react'
import ReactDOM from 'react-dom'
import nextId from "react-id-generator";
import Question from './components/Questions'
import Button from './components/Button'
import {decode} from 'html-entities';
import { SquareIntersection } from 'html-entity-decoder/pairs';
 export default function App(){
   const [questionsState, setQuestionsState] = React.useState([])
   const [buttonState, setButtonState] = React.useState("Start Game")
   const [pointsState, setPointsState] = React.useState(0)
   const [isDone, setIsDone] = React.useState(false)
   const [reset, setRest] = React.useState(false)
    // obj {  question:   , isHeld  ,  isCorrect  }
    //"https://opentdb.com/api.php?amount=5"
    async function getQuestions() {
        const api = "https://opentdb.com/api.php?amount=5"
        const result = await fetch(api)
        const getResult = await result.json()
        return getResult.results
    }


    React.useEffect(async ()=>{
       
       getQuestions().then(data=>{
            
            for(let i =0; i < data.length;i++){
               const arrayAnswers=[]
                const questionObj = {
                    question: decode(data[i].question),
                    key: nextId(),
                    id: decode(data[i].question),
                    isQuestion: true
                }
                setQuestionsState(prevQuestions=>
                    [...prevQuestions, questionObj])
                const answerObj = {
                    answer: decode(data[i].correct_answer),
                    key: nextId(),
                    id: decode(data[i].question),
                    isCorrect: true,
                    isSelected: false,
                    isQuestion: false
                }
                arrayAnswers.push(answerObj)
                for(let l = 0; l < data[i].incorrect_answers.length;l++){
                    const incorrectObj ={
                        answer: decode(data[i].incorrect_answers[l]),
                        key: nextId(),
                        id: decode(data[i].question),
                        isCorrect: false,
                        isSelected: false,
                        isQuestion: false
                    }
                    arrayAnswers.push(incorrectObj)
                    
                }
                const shuffledArray = shuffle(arrayAnswers)
                console.log(shuffledArray)
                for(let j=0; j< shuffledArray.length; j++){
                    setQuestionsState(prevAnswers=>
                        [...prevAnswers, shuffledArray[j]])
                }
               // setQuestionsState(prevAnswers=>
               //     [...prevAnswers, answerObj])
                
                
            }
           
        
       })
    }, [reset])

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle...
        while (currentIndex != 0) {
      
          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
      }

    function selectAnswer(answer, id){
            if(!isDone){

                setQuestionsState(prevAnswers=> prevAnswers.map(data=>{

                    return data.answer == answer && data.id==id?
                    {...data, isSelected: !data.isSelected}: data
                }))
                setQuestionsState(prevAnswers=> prevAnswers.map(data=>{
                    return data.id==id && data.answer != answer?
                    {...data, isSelected:false}: data
                }))


            }
            
    }
    
    const questionElement = questionsState.map(quest=>
         
         (<Question
            key={quest.key}
            question={quest.question}
            id={quest.id}
            answer={quest.answer}
            isQuestion={quest.isQuestion}
            isSelected={quest.isSelected}
            isCorrect={quest.isCorrect}
            selectAnswer={()=>selectAnswer(quest.answer, quest.id)}
            isDone={isDone}
        />)
        
       
    )

    function buttonElement(){ 
            if(buttonState == "Start Game"){
             return (<Button functionButton = {()=> toggleButton(buttonState)} name={buttonState} />)
            }else if(buttonState =="Check Answers"){
                return (<Button functionButton = {()=> checkAnswers(buttonState)} name={buttonState} />)

            }else if(buttonState =="Play Again"){ //place holder
                return (<Button functionButton = {()=> resetGame()} name={buttonState} />)

            }
    }

    function toggleButton(nameState){
        console.log("ACT")
        if(nameState == "Start Game"){
            setPointsState(0)
            setButtonState("Check Answers")
        }else if(nameState == "Check Answers"){
            setButtonState("Play Again")
            
        }else if(nameState == "Play Again"){
            setButtonState("Check Answers")
            setPointsState(0)
        }
    }
    
    function checkAnswers(){
        setButtonState("Play Again")
        setIsDone(prevAnswers=>!prevAnswers)
        setQuestionsState(prevAnswers=> prevAnswers.map(data=>{
            if(data.isSelected==true && data.isCorrect){
                setPointsState(prevPoint=>prevPoint + 1)
            }
            return data
        }))
    }

    function resetGame(){
        setQuestionsState([])
        setIsDone(false)
        setPointsState(0)
        setRest(prev=>!prev)
        setButtonState("Check Answers")
        
    }
    
    return(
        <div className="container">
            {buttonState!="Start Game"?
                questionElement:
                <div><h1>Quizzical</h1><span>Test your knowledge!</span>
            </div>}
            {isDone?<span>{pointsState}</span>:<span></span>}
            {buttonElement()}
        </div> 
    )
    
}
