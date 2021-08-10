import React from 'react'

import styles from './ProgressBar.module.css'
import ProgressBarElement from './ProgressBarElement'

export default function ProgressBar(props) {

    const numberWidth = (1/props.elements.length)*80 *props.filled
    const strWidth = String(numberWidth)+"%"
    return (
        <>
            <div className={styles.container} >
                {props.elements.map((element, i) => {
                    return <ProgressBarElement
                        selected={i+1 === props.filled}
                        key={i}
                        num={i+1} 
                        fill={i<props.filled-1}
                        text={element.text}
                        numElem={props.elements.length}
                    />
                })}
            </div>
            <div style={{
                position:'absolute', 
                width:strWidth,
                height:"3px",
                top:"35px",
                left:0,
                background:"grey",
                zIndex:-2}}></div>
        </>
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