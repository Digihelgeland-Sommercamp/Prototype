import React, { useState } from 'react'

import { PAGE_POINTER } from '../../pagePointer.js';

import { useRecoilState } from 'recoil'
import IntrodctionRadioButtons from '../../components/IntroductionRadioButtons/IntroductionRadioButtons'
import ProgressBar from '../../components/ProgressBar/ProgressBar'


import styles from './Situation.module.css'
import NextButton from '../../components/NextButton/NextButton.js';
import { page, progressSelector } from '../../atoms.js';

export default function Situation(props) {    
    const [, changePage] = useRecoilState(page)
    const [progress, setProgress] = useRecoilState(progressSelector)

    const [noClick, setNoClick] = useState(true)

    const handler = () => {
        setNoClick(false)
    }

    return (
        <>  
            <div className="wrapper">
                <ProgressBar
                    filled={2}
                    elements={[{}, {}, {}, {}, {}, {}]} />
                <div className={styles.container}>
                    
                    <h1>Hei, {props.name}!</h1>
                    <p className={styles.question}>Hvilken situasjon gjelder deg?</p>
                    <IntrodctionRadioButtons onChange={handler} />
                    
                </div>
            </div>
            <NextButton 
                isClickable={!noClick}
                callback={() => {
                    if(progress < 3) {
                        setProgress(3)
                    }
                    changePage(PAGE_POINTER.household)
                }}/>
            
        </>
    );
}
