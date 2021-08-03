import React from 'react'

import styles from './ProgressBar.module.css'
import { selector, useRecoilState } from 'recoil'

const page = selector({
    key: 'page'
})


export default function ProgressBarElement(props) {
    const [, setPage] = useRecoilState(page)

    const numberWidth = (1/props.numElem)*100
    const strWidth = String(numberWidth)+"%"

    return (
        <div className={styles.elementWrapper} style={{ width:strWidth}} onClick={() => setPage(props.num)}>
            <div className={styles.fill} style={{background: props.fill  ? "grey" : "lightgrey", color: props.fill  ? "white" : "black"}}>{props.num}</div>
            {//<p className={styles.elementText}>{props.text}</p>
            }
        </div>
    )
}
