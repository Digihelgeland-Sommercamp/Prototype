import React from 'react'
import { selector, useRecoilState } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer';

import InformationBox from '../../components/information/InformationBox'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import UploadArea from '../../components/fileUpload/UploadArea'

import styles from './Income.module.css'
import NextButton from '../../components/NextButton/NextButton';

const page = selector({
    key: "page"
})
const lastPage = selector({
    key: "lastPage"
})
const progressSelector = selector({
    key: 'progress'
})



export default function Income() {
    const [currentPage, changePage] = useRecoilState(page)
    const [, setLastPage] = useRecoilState(lastPage)
    const [progress, setProgress] = useRecoilState(progressSelector)


    const partner = sessionStorage.getItem("partner") ? JSON.parse(sessionStorage.getItem("partner")) : null;
    const applicant = sessionStorage.getItem("applicant") ? JSON.parse(sessionStorage.getItem("applicant")) : null

    console.log(partner)
    const getName = (person) => {
        let fornavn = typeof person["navn"] !=="undefined" && person["navn"]["fornavn"]
                        ? person["navn"]["fornavn"] : "";
        let mellomnavn = typeof person["navn"] !=="undefined" && person["navn"]["mellomnavn"] !== null 
                        ? person["navn"]["mellomnavn"] + " " : "";
        let etternavn = typeof person["navn"] !=="undefined" && person["navn"]["etternavn"] !== null
                        ? person["navn"]["etternavn"] : "";
        return fornavn + " " + mellomnavn + etternavn;
    }

    return (
        <>
            <ProgressBar filled={5} elements={[{}, {}, {}, {}, {}, {}]} />
            <div className={styles.container}>

                <h1 className={styles.title}>Inntekt</h1>
                <div className={styles.info}>
                    <p >Vi beregner anslått inntekt i år basert på siste oppdaterte skatteopplysninger.</p>
                    <p >Søknaden blir behandlet på bakgrunn av inntekten til:</p>
                    <ul>
                        <li className={styles.person}>{getName(applicant)}</li>
                        <li className={styles.person}>{getName(partner)}</li>
                    </ul>
                </div>

                <InformationBox
                    text="Dersom noen i husholdningen har hatt nedgang i inntekt siden forrige skattemelding,
                    må dette dokumenteres."
                    link="Liste over gyldig dokumentasjon" 
                    modalTitle = "Forslag til dokumentasjon"
                    modalTextBody = ""
                    modalTextBodyList = {[
                        "Siste skattemelding",
                        "Lønnsslipp eller inntektsopplysninger fra a-meldingenfra de siste to månedene",
                        "Utbetalingsoversikt fra NAV",
                        "Bekreftelse på permisjon/avskjedigelse fra arbeidsgiver",
                        "Studentbevis eller bekreftelse på skoleplass"
                    ]}
                    modalButtonText = "OK"/>
                    
                <UploadArea />

                <NextButton 
                    isClickable
                    callback={() => {
                        if(progress < 6) {
                            setProgress(6)
                        }
                        setLastPage(currentPage)
                        changePage(PAGE_POINTER.reviewApplication)
                    }}/>
            </div>
        </>
    )
}
