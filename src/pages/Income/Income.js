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


export default function Income() {
    const [currentPage, changePage] = useRecoilState(page)
    const [, setLastPage] = useRecoilState(lastPage)


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
                        <li>{getName(applicant)}</li>
                        <li>{getName(partner)}</li>
                    </ul>
                </div>

                <InformationBox
                    text="Dersom noen i husholdningen har hatt nedgang i inntekt siden forrige skattemelding,
                    må dette dokumenteres."
                    link="Liste over gyldig dokumentasjon" />
                    
                <UploadArea />

                <NextButton 
                    isClickable
                    callback={() => {
                        setLastPage(currentPage)
                        changePage(PAGE_POINTER.reviewApplication)
                    }}/>
            </div>
        </>
    )
}
