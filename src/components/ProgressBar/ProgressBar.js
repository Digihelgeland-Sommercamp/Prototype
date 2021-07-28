import React from 'react'

import styles from './ProgressBar.module.css'
import ProgressBarElement from './ProgressBarElement'

export default function ProgressBar(props) {
    return (
        <div className={styles.container}>
            {props.elements.map((element, i) => {
                return <ProgressBarElement
                    num={i+1} 
                    fill={i<props.filled}
                    text={element.text}
                    numElem={props.elements.length}
                />
            })}
        </div>
    )
}

ProgressBar.defaultProps = {
    filled:1,
    elements:[
        {
            text: "Søknad sendt"
        },
        {
            text: "Søknad behandles"
        },
        {
            text: "Vedtak fattet"
        }
    ]

}