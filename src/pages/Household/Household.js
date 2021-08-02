import React, { useState } from 'react'
import { selector, useRecoilState, useRecoilValue } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer';

import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { Button } from '@material-ui/core';
import RadioBoxGroup from '../../components/radioBox/RadioBoxGroup';
import InfoButtonText from '../../components/InfoButtonText/InfoButtonText';
import Form from '../../components/Form/Form';

import styles from './Household.module.css'


const page = selector({
    key: 'page',
});

const lastPage = selector({
    key: 'lastPage',
});

export default function Household() {
    const [currentPage, setPage] = useRecoilState(page)
    const [, setLastPage] = useRecoilState(lastPage)

    const [notClicked, setNotClicked] = useState(true)
    
    const [partner, setPartner] = useState("")
    const [yesNo, setYesNo] = useState(true)
    const [askQuestion, setAskQuestion] = useState(false)
    const [addPartnerPage, setAddPartner] = useState(false)

    const [chosenYesNo, setChosenYesNo] = useState("")
    const [answer, setAnswer] = useState("")

    const radioTextList = [
        "Ektefelle / Registrert partner",
        "Samboer med felles barn",
        "Samboer uten felles barn",
        "Enslig"
    ]
    const radioGroupCallback = (id) => {
        setNotClicked(false)
        setAnswer(radioTextList[id])
    }

    const yesNoList = [
        "Ja",
        "Nei"
    ]
    const yesNoRadioGroupCallback = (id) => {
        setNotClicked(false)
        setChosenYesNo(yesNoList[id])
    }

    function fetchPartner() {
        //TODO: Fetch partner from folkreg
        return "Kari Normann (f. 30.01.1988)"
    }

    const handleYesNoClick = () => {
        if(chosenYesNo === "Nei"){
            setYesNo(false)
            setAskQuestion(true)
            setNotClicked(true)
        }
        else if (chosenYesNo === "Ja") {
            setLastPage(currentPage)
            setPage(PAGE_POINTER.kids)
            
        }
    }
    function addPartner(){
        return
    }

    const handleFormChange = (form) => {
        setPartner(form)
    }

    const formFields = [
        {
            id: "fornavn",
            label: "Fornavn"
        },
        {
            id: "etternavn",
            label: "Etternavn"
        },
        {
            id: "personidentifikator",
            label: "Fødselsnummer / D-nummer"
        }
    ]

    return (
        <>
            <ProgressBar filled={3} elements={[{}, {}, {}, {}, {}, {}]} />
            <div className={styles.container}>
                <h1 className={styles.title}>Husholdning</h1>
                {yesNo &&
                    <>
                        <h2>Stemmer det at du er gift og bor sammen med</h2>
                        <p>{fetchPartner()}</p>
                        <RadioBoxGroup
                            radioTextList={yesNoList}
                            radioGroupCallback={yesNoRadioGroupCallback}
                        />
                        <Button
                            disabled={notClicked}
                            variant='contained'
                            style={{ margin: "20px 0", width:"100%" }}
                            onClick={handleYesNoClick}>
                            Neste
                        </Button>
                    </>
                }
                {askQuestion &&
                    <>
                        <InfoButtonText text="Hvem bor du sammen med?" />
                        <RadioBoxGroup
                            radioTextList={radioTextList}
                            radioGroupCallback={radioGroupCallback}
                        />
                        <Button
                            variant='contained'
                            style={{ margin: "20px 0", width:"100%" }}
                            onClick={() => {
                                setAskQuestion(false)
                                setAddPartner(true)
                            }}>
                            Neste
                        </Button>
                    </>
                }
                {addPartnerPage &&
                    <>
                        <p>Vi fant ingen ektefelle eller registrert partner i Folkeregisteret.</p>
                        <Form fields={formFields} handleFormChange={handleFormChange} />
                        <Button
                            variant='contained'
                            style={{ margin: "20px 0", width:"100%" }}
                            onClick={() => {
                                addPartner()
                                setLastPage(currentPage)
                                setPage(PAGE_POINTER.kids)
                            }}>
                            Legg til
                        </Button>
                    </>
                }

            </div>
        </>
    )
}
