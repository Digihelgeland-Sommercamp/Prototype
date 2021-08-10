import React, { useState } from 'react'

import { PAGE_POINTER } from '../../pagePointer.js';

import { useRecoilState, selector } from 'recoil'
import IntrodctionRadioButtons from '../../components/IntroductionRadioButtons/IntroductionRadioButtons'
import ProgressBar from '../../components/ProgressBar/ProgressBar'


import styles from './Situation.module.css'
import NextButton from '../../components/NextButton/NextButton.js';

const page = selector({
    key: 'page', 
});

const progressSelector = selector({
    key: 'progress'
})


export default function Situation(props) {    
    const [, changePage] = useRecoilState(page)
    const [progress, setProgress] = useRecoilState(progressSelector)

    const [noClick, setNoClick] = useState(true)

    const handler = () => {
        setNoClick(false)
    }

    return (
        <>
            <ProgressBar
                filled={2}
                elements={[{}, {}, {}, {}, {}, {}]} />
            <div className={styles.container}>
                
                <h1>Hei, {props.name}!</h1>
                <p>Hvilken situasjon gjelder deg?</p>
                <IntrodctionRadioButtons onChange={handler} />
                <NextButton 
                    isClickable={!noClick}
                    callback={() => {
                        if(progress < 3) {
                            setProgress(3)
                        }
                        changePage(PAGE_POINTER.household)
                    }}/>
            </div>
        </>
    );
}
