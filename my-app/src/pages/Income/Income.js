import { Button } from '@material-ui/core'
import React from 'react'
import { selector, useRecoilValue } from 'recoil'
import InformationBox from '../../components/InformationBox/InformationBox'
import ProgressBar from '../../components/ProgressBar/ProgressBar'

import styles from './Income.module.css'

const incomePeople = selector({
    key: "incomePeople"
})

export default function Income() {

    //TODO: Change to incomepeople set earlier in the progress
    //const currentIncomePeople = useRecoilValue(incomePeople)
    const mockPeople = [{ name: "Ola Normann" }, { name: "Kari Normann" }]

    return (
        <div className={styles.container}>
            <ProgressBar filled={2} elements={[{}, {}, {}, {}, {}]} />
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
                link="Liste over gyldig dokumentasjon"/>

            <div className={styles.button}>
                <Button style={{
                    padding:"20px",
                    border:"1px solid grey",
                    width:"100%"
                }}>Last opp dokumentasjon</Button>
            </div>

            <div className={styles.button}>
                <Button style={{
                    background: "whitesmoke"
                }}>Neste</Button>
            </div>

        </div>
    )
}
