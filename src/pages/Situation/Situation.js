import React, { useState } from 'react'

import { PAGE_POINTER } from '../../pagePointer.js';

import { Button } from '@material-ui/core'
import { useRecoilState, selector, useRecoilValue } from 'recoil'
import IntrodctionRadioButtons from '../../components/IntroductionRadioButtons/IntroductionRadioButtons'
import ProgressBar from '../../components/ProgressBar/ProgressBar'


import './Situation.css'

const overviewOfApplication = selector({
    key:"overviewOfApplication"
})

const page = selector({
    key: 'page', 
});

export default function Situation(props) {
    const applicationData = useRecoilValue(overviewOfApplication)
    
    const [, changePage] = useRecoilState(page)

    const [noClick, setNoClick] = useState(true)

    const handler = () => {
        setNoClick(false)
    }


    return (
        <>
            <ProgressBar
                filled={1}
                elements={[{}, {}, {}, {}, {}]} />
            <div className="wrapper">
                
                <h1>Hei, {props.name}!</h1>
                <p>Hvilken situasjon gjelder deg?</p>
                <IntrodctionRadioButtons onChange={handler} />
                <Button
                    variant='contained'
                    disabled={noClick}
                    className="nextButton"
                    onClick={() => changePage(PAGE_POINTER.household)}>
                    Neste
                </Button>
            </div>
        </>
    );
}
