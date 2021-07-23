import React from 'react'
import BackButton from '../../components/BackButton/BackButton'
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import TitleWithChildren from '../../components/TitleWithChildren/TitleWithChildren'

import styles from './OverviewApplication.module.css'

export default function OverviewApplication(props) {    

    return (
        <div>
            <BackButton />
            <h1 className={styles.title}>{props.title}</h1>
            <h2 className={styles.status}>{props.status}</h2>
            <a className={styles.action}>{props.action}</a>
            <ProgressBar filled={1}/>
            <TitleWithChildren title="Foresatte:" people={props.firstInfo} />
            <TitleWithChildren title="Søkt for:" people={props.secondInfo} />
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