import React from 'react'

function PersonWithId(props){
    return (
        <div style={{display:"flex", margin:props.margin}}>
            <div style={{width:"50%"}}>
                <p>{props.name}</p>
                <p>{props.id}</p>
            </div>
            <p style={{width:"50%", textAlign:"right"}}>{props.extraInformation}</p>
        </div>
    )
}

PersonWithId.defaultProps = {
    name:"Kåre Willoch",
    id:"123456789",
    extraInformation:"",
    margin:"10px"
}

export default PersonWithId