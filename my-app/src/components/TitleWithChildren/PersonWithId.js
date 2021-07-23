import React from 'react'

function PersonWithId(props){
    return (
        <div style={{display:"flex", margin:"15px"}}>
            <div style={{width:"50%"}}>
                <p>{props.name}</p>
                <p>{props.id}</p>
            </div>
            <p style={{width:"50%", textAlign:"right"}}>{props.extraInformation}</p>
        </div>
    )
}

export default PersonWithId