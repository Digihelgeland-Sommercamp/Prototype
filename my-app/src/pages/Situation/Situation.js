import { Button } from '@material-ui/core'
import React, { useState } from 'react'
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
    
    const [currentPage, changePage] = useRecoilState(page)

    const [noClick, setNoClick] = useState(true)

    const handler = (value) => {
        setNoClick(false)
    }


    return (
        <div className="wrapper">
            <ProgressBar filled={applicationData.filled}/>
            <h1>Hei, {props.name}!</h1>
            <p>Hvilken situasjon gjelder deg?</p>
            <IntrodctionRadioButtons onChange={handler} />
            <Button
                variant='contained'
                disabled={noClick}
                className="nextButton"
                onClick={() => changePage(2)}>
                Neste
            </Button>
        </div>
    );
}
