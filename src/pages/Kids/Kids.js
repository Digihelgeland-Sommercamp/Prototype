import React, { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer.js';


import ProgressBar from '../../components/ProgressBar/ProgressBar'

import styles from './Kids.module.css'
import CheckBoxGroup from '../../components/checkBoxField/CheckBoxGroup.js';
import axios from 'axios';
import NextButton from '../../components/NextButton/NextButton.js';
import { lastPage, page, progressSelector } from '../../atoms.js';

/* 
Imports for adding children
import AddChildren from '../../components/AddChildren/AddChildren.js';
import Form from '../../components/Form/Form.js';
import InformationBox from '../../components/information/InformationBox'
import ErrorBlob from '../../components/Form/ErrorBlob.js'; */

export default function Kids() {
    const [currentPage, setPage] = useRecoilState(page)
    const [previousPage, setLastPage] = useRecoilState(lastPage)
    const [progress, setProgress] = useRecoilState(progressSelector)

    /* 
    States for adding children
    const [formError, setFormError] = useState(true)
    const [showError, setShowError] = useState(false)
    const [addingChild, setAddingChild] = useState(false)
    const [newChild, setNewChild] = useState({ name: "", birth: "" })
    const [form, setForm] = useState({fornavn:"", etternavn:"",personidentifikator:""}) 
    */

    const [selectedChildren, setSelectedChildren] = useState([]); // List of the selected kids objects
        
    //TODO: Get kids from userID
    const [kids, setKids] = useState(sessionStorage.getItem("kids") ? JSON.parse(sessionStorage.getItem("kids")) : [])
    const [selectedChildElements, setSelectedChildElements] = useState([]) 

    const [clickable, setClickable] = useState(false)
    
    const saveChildren = (childrenToSave) => {
        setKids(childrenToSave);
        sessionStorage.setItem("kids", JSON.stringify(childrenToSave))
    }

    useEffect(() => {
        let applicantIdentifier = sessionStorage.getItem("applicantIdentifier");
          
        if(sessionStorage.getItem("kids") || !applicantIdentifier)
            return;

        // let applicantIdentifier = tempApplicant[""]
        let url = "http://51.107.208.107/get_children/"+applicantIdentifier;
        axios.get(url).then((response) => {
            saveChildren(response.data);
        })
        
    }, [])

    // Gets the children from storage and compares to the available kids. Saving matches as selected
    const findSelectedKids = () => {
        let children = sessionStorage.getItem("children") ? JSON.parse(sessionStorage.getItem("children")) : null;
        let tempSelectedChildElements = new Array(kids.length).fill(false);

        if (!children)
            return;
        
        for(let i=0; i<children.length; i++)
        {
            for(let j=0; j<kids.length; j++)
            {
                if(children[i]["personidentifikator"] === kids[j]["personidentifikator"])
                {
                    tempSelectedChildElements[j] = true;
                    break;
                }
            }
        }
        childrenCallback(tempSelectedChildElements);
    }

    const childrenCallback = (selectedElementList) => {
        let flag = false

        // TODO: Make sure this does not add children prematurely
        let tempSelectedChildren = []
        for(let i=0; i<kids.length; i++)
        {
            if(selectedElementList[i] === true){
                tempSelectedChildren.push(kids[i])
                flag = true
            } 
        }
        setSelectedChildren(tempSelectedChildren);
        setSelectedChildElements(selectedElementList);
    
        setClickable(flag)
    }

    /* const handleAddChild = () => {
        if(!formError){
            let currentKids = kids
            currentKids.push(newChild)
            setKids(currentKids)
            setAddingChild(false)
            setShowError(false)                
        }
        else{
            setShowError(true)
        }
                
    }

    const handleFormChange = (newForm, error) => {
        setForm(newForm)
        setFormError(error)
        const personid = form.personidentifikator
        const child = {
            navn: {
            fornavn: form.fornavn,
            mellomnavn: "",
            etternavn: form.etternavn,
            },
            foedsel: personid ? personid.substr(0, 6) : "",
            personidentifikator: personid
        }
        setNewChild(child) 
    } */

    function goToNextPage() {
        sessionStorage.setItem("children", JSON.stringify(selectedChildren)) // Only send in selected kids
        sessionStorage.setItem("kids", JSON.stringify(kids));

        if(progress < 5) {
            setProgress(5)
        }
        setLastPage(currentPage)
        previousPage === PAGE_POINTER.reviewApplication ? 
            setPage(PAGE_POINTER.reviewApplication) : 
            setPage(PAGE_POINTER.income);
    }


    if(previousPage === PAGE_POINTER.reviewApplication && selectedChildElements.length === 0)
        findSelectedKids();
    return (
        <>
            <div className="wrapper">
                <ProgressBar
                    filled={4}
                    elements={[{}, {}, {}, {}, {}, {}]} />
                <div className={styles.container}>

                    <h1 className={styles.title}>Barn</h1>
                    {/* {addingChild 
                        ? 
                        <>
                            <Form handleFormChange={handleFormChange} />
                            {showError && <ErrorBlob firstText="Feil navn eller fødselsnummer/D-nummer." secondText="Sjekk at du har skrevet riktig."/>}
                            <NextButton 
                                text="Legg til"
                                isClickable
                                callback={handleAddChild}/>
                        </> */}
                        
                    <p className={styles.information}>Vi fant opplysninger om barn i Folkeregisteret. Hvilke barn vil du søke for?</p>
                    
                    <CheckBoxGroup personList={kids} checkboxCallback={childrenCallback} selectedElements={selectedChildElements}/>
                    {/* <AddChildren callback={() => setAddingChild(true)}/> */}
                    <div style={{marginTop: "50px"}}/>
                    {/* <InformationBox
                        text="Barn det søkes for må være registrert på samme adresse som forelder som søker." /> */}
                </div>
            </div>
            
            <NextButton 
                isClickable={clickable}
                callback={() => {
                    setLastPage(currentPage)
                    goToNextPage();
                }}/> 
            
        </>
    )
}
