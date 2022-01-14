import React from 'react'
import ReactDOM from 'react-dom'

export default function Button(props){
    
    if(props.name == "Check Answers"){

    }else if(props.name == "Play Again"){

    }else if(props.name == "Start Game"){

    }

    return(
        <div className="button">
            <button onClick={props.functionButton}>{props.name}</button>
        </div>
    )
}