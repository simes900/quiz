import { NonBreakingSpace, prop } from 'html-entity-decoder/pairs'
import React from 'react'
import reactDom from 'react-dom'
import ReactDOM from 'react-dom'

export default function Question(props){
    
    const selectstyles ={
        backgroundColor: props.isSelected ? "#D6DBF5": "#F5F7FB",
        border: props.isSelected?'none': '0.5px solid #293264'
        

    }

    

    let donestyles 
       
    if(props.isDone && props.isCorrect){
            donestyles = {
            backgroundColor: "#94D7A2",
            border: 'none'
        }
       
    }else if(props.isDone && !props.isCorrect && props.isSelected){
        donestyles={
            backgroundColor: "#F8BCBC",
            border: 'none'
        }
    }
      

    return(

        
            props.isQuestion?
                <div className="question">{props.question}</div>:
                <div className="answer" onClick={props.selectAnswer} style={props.isDone?donestyles:selectstyles}>{props.answer}</div>
        
        
    )
}