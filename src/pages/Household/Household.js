import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer';

import ProgressBar from '../../components/ProgressBar/ProgressBar';
import RadioBoxGroup from '../../components/radioBox/RadioBoxGroup';
import Form from '../../components/Form/Form';

import styles from './Household.module.css'
import InformationLink from '../../components/information/InformationLink';
import axios from 'axios';
import ErrorBlob from '../../components/Form/ErrorBlob';
import NextButton from '../../components/NextButton/NextButton';
import { lastPage, page, partnerSelector, progressSelector } from '../../atoms';

const radioTextList = [
    "Enslig",
    "Ektefelle/registrert partner",
    "Samboer med felles barn",
    "Samboer uten felles barn"
]

// TODO: Change the text based on if the applicant is married or not
// TODO: The title "Husholdning" should not be the same where you choose if you're single and ready to mingle  

export default function Household() {
    const [currentPage, setPage] = useRecoilState(page)
    const [previousPage, setLastPage] = useRecoilState(lastPage)
    const [progress, setProgress] = useRecoilState(progressSelector)
    
    const [notClicked, setNotClicked] = useState(true)
    const [formError, setFormError] = useState(true)
    const [showError, setShowError] = useState(false)

    const [partner, setPartner] = useRecoilState(partnerSelector)
    const [yesNo, setYesNo] = useState(true)
    const [askQuestion, setAskQuestion] = useState(false)
    const [addPartnerPage, setAddPartner] = useState(false)

    const [chosenYesNo, setChosenYesNo] = useState("")
    const [answer, setAnswer] = useState("")

    const [, setApplicant] = useState(null)


    const radioGroupCallback = (id) => {
        setNotClicked(false)
        setAnswer(radioTextList[id])
    }

    const saveApplicant = (applicantToSave) => {
        setApplicant(applicantToSave);
        sessionStorage.setItem("applicant", JSON.stringify(applicantToSave));
    } 
    
    // Get the applicant from hub
    // TODO: Move this to login
    useEffect(() => {
        function fetchPartner() {
            if(typeof partner["personidentifikator"] === "undefined")
            {
                let applicantIdentifier = sessionStorage.getItem("applicantIdentifier");
                let url = "http://51.107.208.107/get_partner/"+applicantIdentifier;
                axios.get(url).then((response) => {setPartner(response.data);})
            }
            
        }

        let applicantIdentifier = sessionStorage.getItem("applicantIdentifier");

        let url = "http://51.107.208.107/get_applicant/"+applicantIdentifier;
        axios.get(url).then((response) => {
            saveApplicant(response.data); 
            fetchPartner()
        })
    }, [partner, setPartner])

    const yesNoList = [
        "Ja",
        "Nei"
    ]
    const yesNoRadioGroupCallback = (id) => {
        setNotClicked(false)
        setChosenYesNo(yesNoList[id])
    }

    

    const handleYesNoClick = () => {
        if(chosenYesNo === "Nei"){
            setYesNo(false)
            setAskQuestion(true)
            setNotClicked(true)
        }
        else if (chosenYesNo === "Ja") {
            goToNextPage();
        }
    }

    function goToNextPage() {
        
        sessionStorage.setItem("partner", JSON.stringify(partner));

        if(progress < 4) {
            setProgress(4)
        }
        setLastPage(currentPage)
        previousPage === PAGE_POINTER.reviewApplication ? 
            setPage(PAGE_POINTER.reviewApplication) : 
            setPage(PAGE_POINTER.kids);
    
        
    }

    const handleFormChange = (form, formError) => {
        setFormError(formError)
        setShowError(false)
        let newForm = {
            "identifikasjonsnummer": {
                "foedselsEllerDNummer": form.personidentifikator,
                "identifikatortype": "foedselsnummer"
            },
            "navn": {
                "etternavn": form.fornavn,
                "forkortetNavn": `${form.fornavn} ${form.etternavn}`,
                "fornavn": form.etternavn, 
                "mellomnavn": "",
            }
        }
        setPartner(newForm)
    }

    const handleAskQuestion = () => {
        if(answer === "Enslig"){
            setPartner("")
            goToNextPage()
        }
        else{
            setAskQuestion(false)
            setAddPartner(true)
        }
        
    }

    const handleAddPartner = () => {
        if(!formError){
            goToNextPage();
        }
        else {
            setShowError(true) 
        }
    }
    

    const info = {
        linkText: "Hva er en husholdning?",
        modalTitle: "Husholdning",
        modalTextBody: "Husholdning er deg og din ektefelle, registrerte partner eller samboer. Samboere med felles barn regnes som en husholdning. \n\nDersom du og din samboer ikke har felles barn vil dere regnes som en husholdning hvis dere har bodd sammen i minst 12 av de siste 18 m??nedene.",
        modalButtonText: "OK"
    }

    const getPartnerName = () => {
        let fornavn = typeof partner["navn"] !=="undefined" && partner["navn"]["fornavn"]
                ? partner["navn"]["fornavn"] : "";
        let mellomnavn = typeof partner["navn"] !=="undefined" && partner["navn"]["mellomnavn"] !== null 
                ? partner["navn"]["mellomnavn"] + " " : "";
        let etternavn = typeof partner["navn"] !=="undefined" && partner["navn"]["etternavn"] !== null
                ? partner["navn"]["etternavn"] : "";
        return fornavn + " " + mellomnavn + etternavn;
    }
    return (
        <>
            <div className="wrapper">
                <ProgressBar filled={3} elements={[{}, {}, {}, {}, {}, {}]} />
                <div className={styles.container}>
                    <h1 className={styles.title}>Husholdning</h1>
                    {yesNo &&
                        <>
                            <h4 className={styles.question}>
                                Stemmer det at du er gift og bor sammen med <span className={styles.partner}>
                                    {getPartnerName()}</span>
                            </h4>
                            
                            <RadioBoxGroup
                                radioTextList={yesNoList}
                                radioGroupCallback={yesNoRadioGroupCallback}
                            />
                            
                        </>
                    }
                    {askQuestion &&
                        <>  
                            <div className={styles.question}>
                                <InformationLink 
                                linkText={info.linkText}
                                modalTitle={info.modalTitle}
                                modalTextBody={info.modalTextBody}
                                modalButtonText={info.modalButtonText}/>
                            </div>
                            
                            <RadioBoxGroup
                                radioTextList={radioTextList}
                                radioGroupCallback={radioGroupCallback}
                            />
                            
                        </>
                    }
                    {addPartnerPage &&
                        <div >
                            <p className={styles.question}>Dersom du har hatt samboer i minst 12 av de siste 18 m??nedene, legg til personen her.</p>
                            <Form handleFormChange={handleFormChange} />
                            {showError && <ErrorBlob firstText="Feil navn eller f??dselsnummer/D-nummer." secondText="Sjekk at du har skrevet riktig."/>}
                        </div>
                    }

                </div>
            </div>
            {yesNo 
                ? <NextButton 
                    isClickable={!notClicked}
                    callback={handleYesNoClick}/> 
                : askQuestion 
                ? <NextButton 
                    isClickable={!notClicked}
                    callback={handleAskQuestion}/> 
                : addPartnerPage && 
                    <NextButton 
                        text="Legg til"
                        isClickable={!notClicked}
                        callback={handleAddPartner}/>
            }
            
            
            
        </>
    )
}
