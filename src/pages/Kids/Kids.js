import React, { useState, useEffect } from 'react'
import { selector, useRecoilState } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer.js';

import InformationBox from '../../components/information/InformationBox'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Form from '../../components/Form/Form.js';

import styles from './Kids.module.css'
import AddChildren from '../../components/AddChildren/AddChildren.js';
import CheckBoxGroup from '../../components/checkBoxField/CheckBoxGroup.js';
import ErrorBlob from '../../components/Form/ErrorBlob.js';
import axios from 'axios';
import NextButton from '../../components/NextButton/NextButton.js';


const page = selector({
    key: "page"
})
const lastPage = selector({
    key: "lastPage"
})


export default function Kids() {
    const [currentPage, setPage] = useRecoilState(page)
    const [previousPage, setLastPage] = useRecoilState(lastPage)

    const [formError, setFormError] = useState(true)
    const [showError, setShowError] = useState(false)

    const [addingChild, setAddingChild] = useState(false)
    const [newChild, setNewChild] = useState({ name: "", birth: "" })
    const [form, setForm] = useState({fornavn:"", etternavn:"",personidentifikator:""})

    const [selectedChildren, setSelectedChildren] = useState([]); // List of the selected kids objects
        
    //TODO: Get kids from userID
    const [kids, setKids] = useState(sessionStorage.getItem("kids") ? JSON.parse(sessionStorage.getItem("kids")) : [])
    const [selectedChildElements, setSelectedChildElements] = useState([]) 
    
    const saveChildren = (childrenToSave) => {
        console.log("Saving children");
        console.log(childrenToSave);
        setKids(childrenToSave);
        sessionStorage.setItem("kids", JSON.stringify(childrenToSave))
    }

    useEffect(() => {
        let applicantIdentifier = sessionStorage.getItem("applicantIdentifier");
        console.log("Checking if kids already exists")

        console.log(sessionStorage.getItem("kids"))            
        if(sessionStorage.getItem("kids") || !applicantIdentifier)
            return;
        console.log("Getting kids from hub")

        // let applicantIdentifier = tempApplicant[""]
        let url = "http://51.107.208.107/get_children/"+applicantIdentifier;
        axios.get(url).then((response) => {saveChildren(response.data);})
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
        // TODO: Make sure this does not add children prematurely
        let tempSelectedChildren = []
        for(let i=0; i<kids.length; i++)
        {
            console.log("Selected element list in kids: "+selectedElementList)

            if(selectedElementList[i] === true)
                tempSelectedChildren.push(kids[i])
        }
        setSelectedChildren(tempSelectedChildren);
        setSelectedChildElements(selectedElementList);
    }

    const handleAddChild = () => {
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
    }

    function goToNextPage() {
        sessionStorage.setItem("children", JSON.stringify(selectedChildren)) // Only send in selected kids
        sessionStorage.setItem("kids", JSON.stringify(kids));
        console.log(kids)

        setLastPage(currentPage)

        previousPage === PAGE_POINTER.reviewApplication ? 
            setPage(PAGE_POINTER.reviewApplication) : 
            setPage(PAGE_POINTER.income);
    }


    if(previousPage === PAGE_POINTER.reviewApplication && selectedChildElements.length === 0)
        findSelectedKids();
    return (
        <>
            <ProgressBar
                filled={4}
                elements={[{}, {}, {}, {}, {}, {}]} />
            <div className={styles.container}>

                <h1 className={styles.title}>Barn</h1>
                {addingChild 
                    ? 
                    <>
                        <Form handleFormChange={handleFormChange} />
                        {showError && <ErrorBlob firstText="Feil navn eller fødselsnummer/D-nummer." secondText="Sjekk at du har skrevet riktig."/>}
                        <NextButton 
                            text="Legg til"
                            isClickable
                            callback={handleAddChild}/>
                    </>
                    :
                    <>
                    <p className={styles.information}>Vi fant opplysninger om barn i Folkeregisteret. Hvilke barn vil du søke for?</p>
                    
                    <CheckBoxGroup personList={kids} checkboxCallback={childrenCallback} selectedElements={selectedChildElements}/>
                    
                    {/* <Button variant="outlined" style={{ margin: "20px 0 50px 0" }} onClick={() => setAddingChild(true)}>Legg til barn</Button> */}
                    {/* <AddChildren callback={() => setAddingChild(true)}/> */}
                    <div style={{marginTop: "50px"}}/>
                    {/* <InformationBox
                        text="Barn det søkes for må være registrert på samme adresse som forelder som søker." /> */}
                    {/* <div style={{marginTop: "50px"}}/> */}

                    <NextButton 
                        isClickable
                        callback={() => {
                            setLastPage(currentPage)
                            goToNextPage();
                        }}/> {/*TODO Make this appear at the bottom. Do the same for similar pages */}
                </>
                }

            </div>
        </>
    )
}
