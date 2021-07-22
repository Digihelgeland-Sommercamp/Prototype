import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import IntrodctionRadioButtons from '../../components/IntroductionRadioButtons/IntroductionRadioButtons'

import './Situation.css'

export default function Situation(props) {
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
                className="nextButton">
                    Neste
                    </Button>
        </div>
    );
}
