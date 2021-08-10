import React from 'react'

import styles from './ProgressBar.module.css'
import { selector, useRecoilState } from 'recoil'

const page = selector({
    key: 'page'
})


export default function ProgressBarElement(props) {
    const [, setPage] = useRecoilState(page)

    // const numberWidth = (1/props.numElem)*100
    // const strWidth = String(numberWidth)+"%"


    return (
        <div 
            className={styles.elementWrapper} 
            style={{
                width: props.selected && "50px",
                height: props.selected && "50px",
                borderColor: props.fill && "grey" || props.selected && "grey",
                background: props.fill  ? "grey" : "white", 
                color: props.fill  ? "white" : "black", }} 
            onClick={() => setPage(props.num)}>
                {props.num}
        </div>
            
    )
}
