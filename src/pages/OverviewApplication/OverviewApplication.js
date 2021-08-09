import React from 'react'
import { selector, useRecoilValue } from 'recoil'
import BackButton from '../../components/BackButton/BackButton'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import TitleWithChildren from '../../components/TitleWithChildren/TitleWithChildren'

import styles from './OverviewApplication.module.css'

const overviewOfApplication = selector({
    key:"overviewOfApplication"
})

export default function OverviewApplication(props) {
    const applicationData = useRecoilValue(overviewOfApplication)    

    const states = {
        "Mottat": 1,
        "Til behandling": 2,
        "Behandlet": 3,
    }

    // const applicant = sessionStorage.getItem("applicant") ? JSON.parse(sessionStorage.getItem("applicant")) : null;
    // const partner = sessionStorage.getItem("partner") ? JSON.parse(sessionStorage.getItem("partner")) : null;
    // const childrenList = sessionStorage.getItem("children") ? JSON.parse(sessionStorage.getItem("children")) : null;

    let getName = (person) => {
        let fornavn = typeof person["navn"] !=="undefined" && person["navn"]["fornavn"]
                    ? person["navn"]["fornavn"] : "";
        let mellomnavn = typeof person["navn"] !=="undefined" && person["navn"]["mellomnavn"] !== null 
                    ? person["navn"]["mellomnavn"] + " " : "";
        let etternavn = typeof person["navn"] !=="undefined" && person["navn"]["etternavn"] !== null
                    ? person["navn"]["etternavn"] : "";
        return fornavn + " " + mellomnavn + etternavn;
    }

    /* let children = []
    for (let child in childrenList) {
        let newChild = {
            name: getName(child),
            id: child["personidentifikator"]
        }
        children.push(newChild)
    }

    let persons = []
    persons.push({
        name: applicant["navn"],
        id: sessionStorage.getItem("applicantIdentifier")
    })
    persons.push({
        name: partner["navn"],
        id: partner["personidentifikator"]
    }) */

    return (
        <div>
            <BackButton />
            <h1 className={styles.title}>{"Søknad om redusert foreldrebetaling"}</h1>
            <h2 className={styles.status}>{applicationData.status}</h2>
            <button className={styles.action}>{applicationData.action}</button>
            <ProgressBar filled={states[(applicationData.status)]}/>
            <TitleWithChildren title="Foresatte:" /* people={persons} */ />
            <TitleWithChildren title="Søkt for:" /* people={children} */ />
        </div>
    )
}

OverviewApplication.defaultProps = {
    title: "Søknadsnavn",
    status: "Søknad ikke sendt",
    action: "",
    firstInfo: [
        {
            name:"Ola Normann"
        },
        {
            name:"Thea Normann"
        }
    ],
    secondInfo: [
        {
            name:"Ola Normann",
            extraInformation:"Salhus SFO"
        },
        {
            name:"Thea Normann",
            extraInformation:"Salhus SFO"
        }
    ]
}