import React from 'react'

import styles from './ProgressBar.module.css'
import { selector, useRecoilState, useRecoilValue } from 'recoil'

const page = selector({
    key: 'page'
})


export default function ProgressBarElement(props) {
    const [currentPage, setPage] = useRecoilState(page)

    const numberWidth = (1/props.numElem)*100
    const strWidth = String(numberWidth)+"%"

    return (
        <div className={styles.elementWrapper} style={{ width:strWidth}} onClick={() => setPage(props.num)}>
            <div className={styles.fill} style={{background:props.num <= currentPage  ? "grey" : "lightgrey", color:props.num <= currentPage  ? "white" : "black"}}>{props.num}</div>
            {//<p className={styles.elementText}>{props.text}</p>
            }
            
        </div>
    )
}
