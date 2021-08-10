import React, { useState } from 'react'

import { PAGE_POINTER } from '../../pagePointer.js';

import { useRecoilState, selector } from 'recoil'
import ProgressBar from '../../components/ProgressBar/ProgressBar'


import styles from './Invoice.module.css'
import RadioBoxGroup from '../../components/radioBox/RadioBoxGroup.js';
import NextButton from '../../components/NextButton/NextButton.js';
import InformationLink from '../../components/information/InformationLink.js';

const page = selector({
    key: 'page', 
});

const progressSelector = selector({
    key: 'progress'
})


// TODO: Check for children here, if none is found show an error or something 
export default function Invoice() {
    const [progress, setProgress] = useRecoilState(progressSelector)

    const [, changePage] = useRecoilState(page)

    const [noClick, setNoClick] = useState(true)
    const [, setChosenInvoice] = useState("")

    const textForRadioButtons = [
        "Jeg blir fakturert av barnehage eller SFO.",
        "Noen andre i husholdningen blir fakturert av barnehage eller SFO."
    ]
    const handler = (id) => {
        setChosenInvoice(textForRadioButtons[id])
        setNoClick(false)
    }

    const info = {
        text: "Hva menes med husholdning?",
        modalTitle: "Husholdning",
        modalTextBody: "Husholdning er deg og din ektefelle, registrerte partner eller samboer. Samboere med felles barn regnes som en husholdning. \n\nDersom du og din samboer ikke har felles barn vil dere regnes som en husholdning hvis dere har bodd sammen i minst 12 av de siste 18 månedene.",
        modalButtonText: "OK"
    }

    return (
        <>
            <ProgressBar
                filled={1}
                elements={[{}, {}, {}, {}, {}, {}]} />
            <div className={styles.container}>
                <h1>Fakturering</h1>
                <p>Hvem i husholdningen din blir fakturert av barnehagen eller SFO?</p>
                <RadioBoxGroup radioTextList={textForRadioButtons} radioGroupCallback={handler}/>
                <InformationLink 
                    linkText={info.text}
                    modalTitle={info.modalTitle}
                    modalTextBody={info.modalTextBody}
                    modalButtonText={info.modalButtonText}/>
                <NextButton 
                    isClickable={!noClick}
                    callback={() => {
                        if(progress < 2) {
                            setProgress(2)
                        }
                        changePage(PAGE_POINTER.situation)
                    }}/>
            </div>
        </>
    );
}
