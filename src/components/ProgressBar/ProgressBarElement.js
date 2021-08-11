import React from 'react'

import styles from './ProgressBar.module.css'
import { useRecoilState, useRecoilValue } from 'recoil'
import { PAGE_POINTER } from '../../pagePointer'
import { page, progressSelector } from '../../atoms'


export default function ProgressBarElement(props) {
    const progress = useRecoilValue(progressSelector)
    const [, setPage] = useRecoilState(page)

    const pages = {
        1: PAGE_POINTER.invoice,
        2: PAGE_POINTER.situation,
        3: PAGE_POINTER.household,
        4: PAGE_POINTER.kids,
        5: PAGE_POINTER.income,
        6: PAGE_POINTER.reviewApplication,
    }

    return (
        <div 
            className={styles.elementWrapper} 
            style={{
                width: props.selected && "50px",
                height: props.selected && "50px",
                borderColor: (props.fill  || props.selected || progress>=props.num ) && "#676766",
                background: props.fill  ? "#676766" : "white", 
                color: props.fill  ? "white" : "black", }} 
            onClick={() => {
                if(progress >= props.num){
                    setPage(pages[props.num])
                }}
            }>
                {props.num}
        </div>
            
    )
}
