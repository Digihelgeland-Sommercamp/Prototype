import React, { useState } from 'react'
import { selector, useRecoilState, useRecoilValue } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer';

import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { Button } from '@material-ui/core';
import RadioBoxGroup from '../../components/radioBox/RadioBoxGroup';
import InfoButtonText from '../../components/InfoButtonText/InfoButtonText';

import styles from './Household.module.css'
import Form from '../../components/Form/Form';

const page = selector({
    key: 'page',
});

const lastPage = selector({
    key: 'lastPage',
});

export default function Household() {
    const [currentPage, setPage] = useRecoilState(page)
    const [, setLastPage] = useRecoilState(lastPage)

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
        setAnswer(radioTextList[id])
    }

    const yesNoList = [
        "Ja",
        "Nei"
    ]
    const yesNoRadioGroupCallback = (id) => {
        setChosenYesNo(yesNoList[id])
    }

    function fetchPartner() {
        //TODO: Fetch partner from folkreg

        if(partner === "")
        {
            let tempPartner = {
                "fornavn": "Kari",
                "etternavn": "Nordmann",
                "personidentifikator": "23568945586" 
                };
            setPartner(tempPartner);
        }
        return partner['fornavn'] + " " + partner["etternavn"];
    }

    const handleYesNoClick = () => {
        if(chosenYesNo === "Nei"){
            setYesNo(false)
            setAskQuestion(true)
        }
        else if (chosenYesNo === "Ja") {
            setLastPage(currentPage)
            goToNextPage();
        }
    }
    function addPartner(){

        // console.log(partnerDict);
    }

    function goToNextPage() {
        let partnerDict = {
            "partner": {
                partner
            }
        }

        localStorage.setItem("partner", JSON.stringify(partner));
        console.log(localStorage.getItem("partner"));
        setPage(PAGE_POINTER.kids)
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
            <ProgressBar filled={2} elements={[{}, {}, {}, {}, {}]} />
            <div>
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
                            variant='contained'
                            style={{ margin: "20px 0" }}
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
                            style={{ margin: "20px 0" }}
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
                            style={{ margin: "20px 0" }}
                            onClick={() => {
                                addPartner()
                                setLastPage(currentPage)
                                goToNextPage();
                            }}>
                            Legg til
                        </Button>
                    </>
                }

            </div>
        </>
    )
}
