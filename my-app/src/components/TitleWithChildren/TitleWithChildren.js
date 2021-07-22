import React from 'react'
import ChangeButton from '../ChangeButton'
import InfoButton from '../InfoButton'
import PersonWithId from './PersonWithId'

function TitleWithChildren(props) {
    return (
        <div style={{padding:"20px"}}> 
            <div style={{display:"flex"}}>
                <h1>{props.title}</h1>
                <InfoButton />
            </div>
            
            {props.people.map((person, i) => {
                return (
                    <PersonWithId
                        name={person.name}
                        id={person.id}
                        extraInformation={person.extraInformation}
                    />
                )
            })}
            <ChangeButton/>
        </div>
    )
}

export default TitleWithChildren