import React, { useState } from 'react'

import { PAGE_POINTER } from '../../pagePointer.js';

import { Button } from '@material-ui/core'
import { useRecoilState, selector } from 'recoil'
import ProgressBar from '../../components/ProgressBar/ProgressBar'


import styles from './Invoice.module.css'
import RadioBoxGroup from '../../components/radioBox/RadioBoxGroup.js';
import InfoButtonText from '../../components/InfoButtonText/InfoButtonText.js';

const page = selector({
    key: 'page', 
});

export default function Invoice(props) {
    
    const [, changePage] = useRecoilState(page)

    const [noClick, setNoClick] = useState(true)
    const [chosenInvoice, setChosenInvoice] = useState("")

    
    

    const textForRadioButtons = [
        "Jeg blir fakturert av barnehage eller SFO.",
        "Noen andre i husholdningen blir fakturert av barnehage eller SFO."
    ]
    const handler = (id) => {
        setChosenInvoice(textForRadioButtons[id])
        setNoClick(false)
    }

    return (
        <>
            <ProgressBar
                filled={1}
                elements={[{}, {}, {}, {}, {}, {}]} />
            <div className={styles.container}>
                <h1>Fakturering</h1>
                <p>Blir du fakturert av barnehage eller SFO?</p>
                <RadioBoxGroup radioTextList={textForRadioButtons} radioGroupCallback={handler}/>
                <InfoButtonText text="Hva menes med husholdning?"/>
                <Button
                    variant='contained'
                    disabled={noClick}
                    className="nextButton"
                    onClick={() => changePage(PAGE_POINTER.situation)}>
                    Neste
                </Button>
            </div>
        </>
    );
}
