import React from 'react'
import { selector, useRecoilState } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer';

import { Button } from '@material-ui/core'
import InformationBox from '../../components/InformationBox/InformationBox'
import ProgressBar from '../../components/ProgressBar/ProgressBar'

import styles from './Income.module.css'

// const incomePeople = atom({
//     key: "incomePeople",
//     default: []
//   })
const page = selector({
    key: "page"
})
const lastPage = selector({
    key: "lastPage"
})


export default function Income() {
    const [currentPage, changePage] = useRecoilState(page)
    const [, setLastPage] = useRecoilState(lastPage)

    //TODO: Change to incomepeople set earlier in the progress
    //const currentIncomePeople = useRecoilValue(incomePeople)
    const mockPeople = [{ name: "Ola Normann" }, { name: "Kari Normann" }]


    return (
        <>
            <ProgressBar filled={5} elements={[{}, {}, {}, {}, {}, {}]} />
            <div className={styles.container}>

                <h1 className={styles.title}>Inntekt</h1>
                <div className={styles.info}>
                    <p >Vi beregner anslått inntekt i år basert på siste oppdaterte skatteopplysninger.</p>
                    <p >Søknaden blir behandlet på bakgrunn av inntekten til:</p>
                    <ul>
                        {mockPeople.map((person, _) => {
                            return (
                                <li>{person.name}</li>
                            )
                        })}
                    </ul>
                </div>



                <InformationBox
                    text="Dersom noen i husholdningen hatt nedgang i inntekt siden forrige skattemelding,
                    må dette dokumenteres."
                    link="Liste over gyldig dokumentasjon" />

                <div className={styles.button}>
                    <Button style={{
                        padding: "20px",
                        border: "1px solid grey",
                        width: "100%"
                    }}>Last opp dokumentasjon</Button>
                </div>

                <div className={styles.button}>
                    <Button
                        variant='contained'
                        style={{background: "whitesmoke" }}
                        onClick={() => {
                            setLastPage(currentPage)
                            changePage(PAGE_POINTER.reviewApplication)
                        }}
                    >Neste</Button>
                </div>

            </div>
        </>
    )
}
