import React from 'react'
import { atom, selector, useRecoilState, useRecoilValue } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer';

import ApplicationExcerpt from '../../components/ApplicationExcerpt/ApplicationExcerpt'

import styles from './Portal.module.css'
import { Button } from '@material-ui/core';
import InformationLink from '../../components/information/InformationLink';

const overviewOfApplication = atom({
    key: "overviewOfApplication",
    default: {}
  })
  
const page = selector({
    key: "page"
})
const lastPage = selector({
    key: 'lastPage',
});

export default function Portal(props) {
    const [, setApplication] = useRecoilState(overviewOfApplication)
    const [currentPage, setPage] = useRecoilState(page)
    const [, setLastPage] = useRecoilState(lastPage)

    // TODO: fetch applications for currentUser
    const newApplications = [
        {
            applicationName: "Søknad om redusert foreldrebetaling",
            date: "10.10.10",
            changeOrCheck: true,
            changedDate: "11.10.10",
            status: "Søknad ikke sendt",
            action: "",
            filled: 1,
            firstInfo: [
                {
                    name: "Ola Normann"
                },
                {
                    name: "Thea Normann"
                }
            ],
            secondInfo: [
                {
                    name: "Ola Normann",
                    extraInformation: "Salhus SFO"
                },
                {
                    name: "Thea Normann",
                    extraInformation: "Salhus SFO"
                }
            ]
        }
    ]

    const oldApplications = [{
        applicationName: "Søknad om redusert foreldrebetaling",
        date: "10.10.10",
        changeOrCheck: false,
        changedDate: "11.10.10",
        status: "Vedtak foretatt",
        action: "",
        filled: 3,
        firstInfo: [
            {
                name: "Ola Normann"
            },
            {
                name: "Thea Normann"
            }
        ],
        secondInfo: [
            {
                name: "Ola Normann",
                extraInformation: "Salhus SFO"
            },
            {
                name: "Thea Normann",
                extraInformation: "Salhus SFO"
            }
        ]
    },
    {
        applicationName: "Søknad om redusert foreldrebetaling",
        date: "10.10.10",
        changeOrCheck: false,
        changedDate: "11.10.10",
        status: "Vedtak foretatt",
        action: "",
        filled: 3,
        firstInfo: [
            {
                name: "Ola Normann"
            },
            {
                name: "Thea Normann"
            }
        ],
        secondInfo: [
            {
                name: "Ola Normann",
                extraInformation: "Salhus SFO"
            },
            {
                name: "Thea Normann",
                extraInformation: "Salhus SFO"
            }
        ]
    }
    ]

    const excerptClicked = (arr, index) => {
        setApplication(arr === "new" ? newApplications[index] : oldApplications[index])
        setLastPage(currentPage)
        setPage(PAGE_POINTER.applicationOverview)
    }

    const questions = [
        {
            text:"Hva er redusert foreldrebetaling og gratis kjernetid?",
            modalTitle:"",
            modalTextBody:"",
            modalButtonText:""
        },
        {
            text:"Hvem har rett på redusert foreldrebetaling og gratis kjernetid?",
            modalTitle:"",
            modalTextBody:"",
            modalButtonText:""
        }        
    ]

    return (
        <div className={styles.container}>
            <div className={styles.titleArea}>
                <h2 className={styles.title}>Du er logget inn som <span className={styles.name}>{props.name}</span></h2>
                <button className={styles.logout}>Logg ut</button>
            </div>
            <h2 className={styles.minorHeading}>Dine søknader</h2>
            <h5>Aktive</h5>
            {newApplications.map((application, index) => {
                return (
                    <ApplicationExcerpt
                        applicationName={application.applicationName}
                        date={application.date}
                        changeOrCheck={application.changeOrCheck}
                        changedDate={application.changedDate}
                        excerptClicked={() => excerptClicked("new", index)}
                        arr="new"
                        index={index}
                    />
                )
            })}
            <h5>Eldre</h5>
            {oldApplications.map((application, index) => {
                return (
                    <ApplicationExcerpt
                        applicationName={application.applicationName}
                        date={application.date}
                        changeOrCheck={application.changeOrCheck}
                        excerptClicked={() => excerptClicked("old", index)}
                        arr="old"
                        index={index} 
                        status={application.status}/>)
            })}

            <Button onClick={() => {
                setLastPage(currentPage)
                setPage(PAGE_POINTER.invoice)
            }}>Send ny søknad</Button>
 
            <h2 className={styles.minorHeading}>Ofte stilte spørsmål</h2>
            {questions.map((question, _) => {
                return (
                    <div className={styles.spacer}>
                        <InformationLink 
                            linkText={question.text}
                            modalTitle={question.modalTitle}
                            modalTextBody={question.modalTextBody}
                            modalButtonText={question.modalButtonText}/>
                    </div>
                )
            })}
        </div>
    )
}

Portal.defaultProps = {
    name:"Ola Nordmann"
}