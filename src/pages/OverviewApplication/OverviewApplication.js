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

    return (
        <div>
            <BackButton />
            <h1 className={styles.title}>{"Søknad om redusert foreldrebetaling"}</h1>
            <h2 className={styles.status}>{applicationData.status}</h2>
            <button className={styles.action}>{applicationData.action}</button>
            <ProgressBar filled={applicationData.filled}/>
            <TitleWithChildren title="Foresatte:" people={applicationData.firstInfo} />
            <TitleWithChildren title="Søkt for:" people={applicationData.secondInfo} />
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