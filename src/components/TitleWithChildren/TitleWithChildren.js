import React from 'react'

// Components
import PersonWithId from './PersonWithId'

// Style
import styles from './TitleWithChildren.module.css'

function TitleWithChildren(props) {
    return (
        <div style={{padding:props.padding}}> 
            <div style={{display:"flex"}}>
                <h1 className={styles.title} style={{fontSize:props.titleFontSize}}>{props.title}</h1>
            </div>
            
            {props.people.map((person, i) => {
                return (
                    <PersonWithId
                        name={person.name}
                        id={person.id}
                        extraInformation={person.extraInformation}
                        padding="10px"
                        margin="5px"
                    />
                )
            })}
        </div>
    )
}

TitleWithChildren.defaultProps = {
    title: "Tittel",
    people: [
        {
            name: "Rafael",
            id: "123456789",
            extraInformation: "Hei sveis"
        }
    ],
    margin: "20px",
    padding: "10px",
    titleFontSize: "1em"
}

export default TitleWithChildren