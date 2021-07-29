import React, { useState } from 'react'
import { selector, useRecoilState } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer.js';

import { Button, TextField } from '@material-ui/core'
import InformationBox from '../../components/InformationBox/InformationBox'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import Kid from './Kid'

import styles from './Kids.module.css'

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
    const [currentAddingChild, setCurrentAddingChild] = useState({ name: "", born: "" })

    //TODO: Get kids from userID
    const [kids, setKids] = useState([
        {
            name: "Karl",
            born: "20.05.2015"
        },
        {
            name: "Karl",
            born: "20.05.2015"
        }
    ])
    const changeKids = (child) => {
        let currentKids = kids
        currentKids.push(child)
        setKids(currentKids)

    }

    const handleAddingChildChange = (key, value) => {
        let currentChild = currentAddingChild
        currentChild.name = key === "name" ? value : currentChild.name
        currentChild.born = key === "born" ? value : currentChild.born
        setCurrentAddingChild(currentChild)
    }

    const handleAddingChildClick = () => {
        if (currentAddingChild.name !== "" && currentAddingChild.born !== "") {
            changeKids(currentAddingChild)
            setCurrentAddingChild({ name: "", born: "" })
            setAddingChild(false)
        }
        else setAddingChild(true)
    }

    return (
        <>
            <ProgressBar
                filled={3}
                elements={[{}, {}, {}, {}, {}]} />
            <div className={styles.container}>

                <h1 className={styles.title}>Barn</h1>
                <p className={styles.information}>Vi fant opplysninger om barn i Folkeregisteret. Hvilke barn vil du søke for?</p>
                {kids.map((kid, _) => {
                    return <Kid name={kid.name} born={kid.born} />
                })}
                {
                    addingChild && (
                        <form className={styles.childForm} noValidate autoComplete="off">
                            <TextField style={{ margin: "5px" }} fullWidth id="child-name" label="Barnets navn" onChange={(e) => handleAddingChildChange("name", e.target.value)} />
                            <TextField style={{ margin: "5px" }} fullWidth id="child-date" label="Barnets fødselsdato" onChange={(e) => handleAddingChildChange("born", e.target.value)} />
                        </form>
                    )
                }
                <Button variant="outlined" style={{ margin: "20px 0 50px 0" }} onClick={() => handleAddingChildClick()}>Legg til barn</Button>

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

            </div>
        </>
    )
}
