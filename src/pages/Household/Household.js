import React, { useState, useEffect } from 'react'
import { selector, useRecoilState } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer';

import ProgressBar from '../../components/ProgressBar/ProgressBar';
import RadioBoxGroup from '../../components/radioBox/RadioBoxGroup';
import Form from '../../components/Form/Form';

import styles from './Household.module.css'
import InformationLink from '../../components/information/InformationLink';
import axios from 'axios';
import ErrorBlob from '../../components/Form/ErrorBlob';
import NextButton from '../../components/NextButton/NextButton';


const page = selector({
    key: 'page',
});

const lastPage = selector({
    key: 'lastPage',
});


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
    const [formError, setFormError] = useState(true)
    const [showError, setShowError] = useState(false)

    const [partner, setPartner] = useState({})
    const [yesNo, setYesNo] = useState(true)
    const [askQuestion, setAskQuestion] = useState(false)
    const [addPartnerPage, setAddPartner] = useState(false)

    const [chosenYesNo, setChosenYesNo] = useState("")
    const [, setAnswer] = useState("")

    const [, setApplicant] = useState(null)


    const radioGroupCallback = (id) => {
        setNotClicked(false)
        setAnswer(radioTextList[id])
    }

    const saveApplicant = (applicantToSave) => {
        setApplicant(applicantToSave);
        sessionStorage.setItem("applicant", JSON.stringify(applicantToSave));
        console.log(applicantToSave);
    } 
    
    // Get the applicant from hub
    // TODO: Move this to login
    useEffect(() => {
        let applicantIdentifier = sessionStorage.getItem("applicantIdentifier");

        let url = "http://51.107.208.107/get_applicant/"+applicantIdentifier;
        axios.get(url).then((response) => {
            saveApplicant(response.data); 
            fetchPartner()
        })
    }, [])

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
        console.log(partnerToSave)
        setPartner(tempPartner)
    }

    function fetchPartner() {
        if(typeof partner["personidentifikator"] === "undefined")
        {
            let applicantIdentifier = sessionStorage.getItem("applicantIdentifier");
            let url = "http://51.107.208.107/get_partner/"+applicantIdentifier;
            axios.get(url).then((response) => {savePartner(response.data);})
        }
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

    function goToNextPage() {

        sessionStorage.setItem("partner", JSON.stringify(partner));
        console.log(sessionStorage.getItem("partner"));

        previousPage === PAGE_POINTER.reviewApplication ? 
            setPage(PAGE_POINTER.reviewApplication) : 
            setPage(PAGE_POINTER.kids);
    
        
    }

    const handleFormChange = (form, formError) => {
        setFormError(formError)
        setPartner(form)
    }

    const handleAddPartner = () => {
        if(!formError){
            setLastPage(currentPage)
            goToNextPage();
        }
        else {
            setShowError(true) 
        }
    }
    

    const info = {
        linkText: "Hvem bor du sammen med?",
        modalTitle: "Husholdning",
        modalTextBody: "Husholdning er deg og din ektefelle, registrerte partner eller samboer. Samboere med felles barn regnes som en husholdning. Dersom du og din samboer ikke har felles barn vil dere regnes som en husholdning hvis dere har bodd sammen i minst 12 av de siste 18 månedene.",
        modalButtonText: "OK"
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
                        <NextButton 
                            isClickable={!notClicked}
                            callback={handleYesNoClick}/>
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
                        <NextButton 
                            isClickable={!notClicked}
                            callback={() => {
                                setAskQuestion(false)
                                setAddPartner(true)
                            }}/>
                    </>
                }
                {addPartnerPage &&
                    <>
                        <p>Vi fant ingen ektefelle eller registrert partner i Folkeregisteret.</p>
                        <Form handleFormChange={handleFormChange} />
                        {showError && <ErrorBlob firstText="Feil navn eller fødselsnummer/D-nummer." secondText="Sjekk at du har skrevet riktig."/>}
                        <NextButton 
                            text="Legg til"
                            isClickable={!notClicked}
                            callback={handleAddPartner}/>
                    </>
                }

            </div>
        </>
    )
}
