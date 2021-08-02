import React, { useState, useEffect } from 'react'
import { selector, useRecoilState } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer';

import ProgressBar from '../../components/ProgressBar/ProgressBar';
import { Button } from '@material-ui/core';
import RadioBoxGroup from '../../components/radioBox/RadioBoxGroup';
import InfoButtonText from '../../components/InfoButtonText/InfoButtonText';
import Form from '../../components/Form/Form';

import styles from './Household.module.css'
import InformationLink from '../../components/information/InformationLink';
import axios from 'axios';


const page = selector({
    key: 'page',
});

const lastPage = selector({
    key: 'lastPage',
});

const applicantIdentifier = "09838197571"

const radioTextList = [
    "Ektefelle / Registrert partner",
    "Samboer med felles barn",
    "Samboer uten felles barn",
    "Enslig"
]

export default function Household() {
    const [currentPage, setPage] = useRecoilState(page)
    const [previousPage, setLastPage] = useRecoilState(lastPage)
    
    const [notClicked, setNotClicked] = useState(true)
    
    const [partner, setPartner] = useState("")
    const [yesNo, setYesNo] = useState(true)
    const [askQuestion, setAskQuestion] = useState(false)
    const [addPartnerPage, setAddPartner] = useState(false)

    const [chosenYesNo, setChosenYesNo] = useState("")
    const [answer, setAnswer] = useState("")

    const [applicant, setApplicant] = useState(null)


    const radioGroupCallback = (id) => {
        setNotClicked(false)
        setAnswer(radioTextList[id])
    }

    const saveApplicant = (applicantToSave) => {
         setApplicant(applicantToSave);
         console.log(applicantToSave);
    } 

// Get applicant, then get partner, then get kids
    // const fetchApplicant = (identifier) => {
    //     let url = "http://51.107.208.107/get_applicant/"+identifier;
    //     axios.get(url).then((response) => {saveApplicant(response.data)})
    // }
    

    useEffect(() => {
        let url = "http://51.107.208.107/get_applicant/"+applicantIdentifier;
        axios.get(url).then((response) => {saveApplicant(response.data); fetchPartner()})
    }, [])

    // applicant !== null ? fetchApplicant("09838197571") : ()=>{}
    // if(!applicant)
    //     fetchApplicant("09838197571")
    // console.log(applicant);

    const yesNoList = [
        "Ja",
        "Nei"
    ]
    const yesNoRadioGroupCallback = (id) => {
        setNotClicked(false)
        setChosenYesNo(yesNoList[id])
    }

    const savePartner = (partnerToSave) => {
        let tempPartner = {
            "fornavn": partnerToSave["navn"]["fornavn"],
            "etternavn": partnerToSave["navn"]["etternavn"],
            "personidentifikator": partnerToSave["identifikasjonsnummer"]["foedselsEllerDNummer"]
        }

        setPartner(tempPartner)
    }

    function fetchPartner() {
        //TODO: Fetch partner from folkreg

        if(partner === "")
        {
            // let tempPartner = {
            //     "fornavn": "Kari",
            //     "etternavn": "Nordmann",
            //     "personidentifikator": "23568945586" 
            //     };
            let url = "http://51.107.208.107/get_partner/"+applicantIdentifier;
            axios.get(url).then((response) => {savePartner(response.data);})
        }
        // return partner['fornavn'] + " " + partner["etternavn"];
    }

    const handleYesNoClick = () => {
        if(chosenYesNo === "Nei"){
            setYesNo(false)
            setAskQuestion(true)
            setNotClicked(true)
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

        sessionStorage.setItem("partner", JSON.stringify(partner));
        console.log(sessionStorage.getItem("partner"));

        previousPage === PAGE_POINTER.reviewApplication ? 
            setPage(PAGE_POINTER.reviewApplication) : 
            setPage(PAGE_POINTER.kids);
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

    const info = {
        linkText: "Hvem bor du sammen med?",
        modalTitle: "",
        modalTextBody: "",
        modalButtonText: ""
    }

    return (
        <>
            <ProgressBar filled={3} elements={[{}, {}, {}, {}, {}, {}]} />
            <div className={styles.container}>
                <h1 className={styles.title}>Husholdning</h1>
                {yesNo &&
                    <>
                        <h4 className={styles.question}>
                            Stemmer det at du er gift og bor sammen med <span className={styles.partner}>
                                {partner["fornavn"] + " " + partner["etternavn"]}</span>
                        </h4>
                        
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
                        <InformationLink 
                            linkText={info.linkText}
                            modalTitle={info.modalTitle}
                            modalTextBody={info.modalTextBody}
                            modalButtonText={info.modalButtonText}/>
                        <RadioBoxGroup
                            radioTextList={radioTextList}
                            radioGroupCallback={radioGroupCallback}
                        />
                        <Button
                            disabled={notClicked}
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
