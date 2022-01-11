import React from 'react'
import ReactDOM from 'react-dom'
import Question from './components/Questions'
export default function App(){
    const [questionsState, setQuestionsState] = React.useState([])
    
    //"https://opentdb.com/api.php?amount=5"
    async function getQuestions() {
        const api = "https://opentdb.com/api.php?amount=5"
        const result = await fetch(api)
        const getResult = await result.json()
        console.log(getResult.results)
        //store data
        return getResult.results
        
        
    }
    React.useEffect(async ()=>{
        getQuestions().then(data=>setQuestionsState(data))
        console.log("rendered")
    },[])
    
    const questionElement = questionsState.map(quest=>{
         return <Question
            type={quest.question}
        />
    })
   
  
    return(
        <div className="container">
            {questionElement}
        </div> 
    )
    
}
