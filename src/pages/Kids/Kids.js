import React, { useState } from 'react'
import { selector, useRecoilState } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer.js';

import { Button } from '@material-ui/core'
import InformationBox from '../../components/InformationBox/InformationBox'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Kid from './Kid'
import Form from '../../components/Form/Form.js';

import styles from './Kids.module.css'
import { stringify } from 'querystring';


const page = selector({
    key: "page"
})
const lastPage = selector({
    key: "lastPage"
})


export default function Kids(props) {
    const [currentPage, setPage] = useRecoilState(page)
    const [, setLastPage] = useRecoilState(lastPage)

    const [addingChild, setAddingChild] = useState(false)
    const [newChild, setNewChild] = useState({ name: "", born: "" })
    const [form, setForm] = useState({fornavn:"", etternavn:"",personidentifikator:""})

    //TODO: Get kids from userID
    const [kids, setKids] = useState([
        {
            name: "Karl Karlsrud",
            born: "20.05.2015",
        },
        {
            name: "Karl Karlsrud",
            born: "20.05.2015",
        }
    ])
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
            born: personid
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

    return (
        <>
            <ProgressBar
                filled={3}
                elements={[{}, {}, {}, {}, {}]} />
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
                    {kids.map((kid, _) => {
                        return <Kid name={kid.name} born={kid.born} />
                    })}
                    
                    <Button variant="outlined" style={{ margin: "20px 0 50px 0" }} onClick={() => setAddingChild(true)}>Legg til barn</Button>

                    <InformationBox
                        text="Barn det søkes for må være registrert på samme adresse som forelder som søker." />
                    <Button
                        variant='contained'
                        style={{ margin: "20px 0" }}
                        onClick={() => {
                            setLastPage(currentPage)
                            setPage(PAGE_POINTER.income)
                        }}>
                        Neste
                    </Button>
                </>
                }

            </div>
        </>
    )
}
