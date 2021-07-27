import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import { useRecoilState, selector } from 'recoil'
import IntrodctionRadioButtons from '../../components/IntroductionRadioButtons/IntroductionRadioButtons'

import './Situation.css'

const page = selector({
    key: 'page', 
});

export default function Situation(props) {
    
    const [, changePage] = useRecoilState(page)

    const [noClick, setNoClick] = useState(true)

    const handler = () => {
        setNoClick(false)
    }


    return (
        <div className="wrapper">
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
