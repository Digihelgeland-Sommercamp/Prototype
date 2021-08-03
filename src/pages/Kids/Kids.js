import React, { useState } from 'react'
import { selector, useRecoilState } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer.js';

import { Button } from '@material-ui/core'
import InformationBox from '../../components/InformationBox/InformationBox'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Kid from './Kid'
import Form from '../../components/Form/Form.js';

import styles from './Kids.module.css'
import AddChildren from '../../components/AddChildren/AddChildren.js';
import CheckBoxGroup from '../../components/checkBoxField/CheckBoxGroup.js';


const page = selector({
    key: "page"
})
const lastPage = selector({
    key: "lastPage"
})


export default function Kids(props) {
    const [currentPage, setPage] = useRecoilState(page)
    const [previousPage, setLastPage] = useRecoilState(lastPage)

    const [addingChild, setAddingChild] = useState(false)
    const [newChild, setNewChild] = useState({ name: "", birth: "" })
    const [form, setForm] = useState({fornavn:"", etternavn:"",personidentifikator:""})

    const [selectedChildren, setSelectedChildren] = useState([]); // List of the selected kids objects
        
    //TODO: Get kids from userID
    const [kids, setKids] = useState(sessionStorage.getItem("kids") ? JSON.parse(sessionStorage.getItem("kids")) :
    [
        {
            "name": "Karl Morten",
            "birth": "20.05.2015",
            "personidentifikator": "154623958774"
        },
        {
            "name": "Karl Karlsrud",
            "birth": "20.05.2015",
            "personidentifikator": "19586325477"
        }
    ])
    // List of bools corresponding to selectedChildren
    const [selectedChildElements, setSelectedChildElements] = useState([]) 
    
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
        // setSelectedChildren(tempSelectedChildren);
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
        //TODO: check for faulty child
        
        let currentKids = kids
        currentKids.push(newChild)
        setKids(currentKids)
        setAddingChild(false)
    }

    const handleFormChange = (newForm) => {
        setForm(newForm) 
        const personid = form.personidentifikator
        const childName = `${form.fornavn} ${form.etternavn}`
        const child = {
            name: childName,
            birth: personid ? personid.substr(0, 6) : "",
            personidentifikator: personid
        }
        setNewChild(child) 
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
    // sessionStorage.setItem("kids", []);
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
                        <Form fields={formFields} handleFormChange={handleFormChange} />
                        <Button
                            variant='contained'
                            style={{ margin: "20px 0" }}
                            onClick={handleAddChild}>
                            Legg til
                        </Button>
                    </>
                    :
                    <>
                    <p className={styles.information}>Vi fant opplysninger om barn i Folkeregisteret. Hvilke barn vil du søke for?</p>
                    {/* {kids.map((kid, _) => {
                        return <Kid name={kid.name} born={kid.born} />
                    })} */
                    <CheckBoxGroup personList={kids} checkboxCallback={childrenCallback} selectedElements={selectedChildElements}/>}
                    
                    {/* <Button variant="outlined" style={{ margin: "20px 0 50px 0" }} onClick={() => setAddingChild(true)}>Legg til barn</Button> */}
                    <AddChildren callback={() => setAddingChild(true)}/>
                    <InformationBox
                        text="Barn det søkes for må være registrert på samme adresse som forelder som søker." />
                    <Button
                        variant='contained'
                        style={{ margin: "20px 0" }}
                        onClick={() => {
                            goToNextPage();
                        }}>
                        Neste
                    </Button>
                </>
                }

            </div>
        </>
    )
}
