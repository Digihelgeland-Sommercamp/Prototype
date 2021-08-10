import React, { useEffect, useState } from 'react'
import { atom, selector, useRecoilState } from 'recoil'

import { PAGE_POINTER } from '../../pagePointer';

import ApplicationExcerpt from '../../components/ApplicationExcerpt/ApplicationExcerpt'

import styles from './Portal.module.css'
import InformationLink from '../../components/information/InformationLink';
import axios from 'axios';
import NextButton from '../../components/NextButton/NextButton';

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

const applicantIdentifier = "03839199405"

export default function Portal(props) {
    const [, setApplication] = useRecoilState(overviewOfApplication)
    const [currentPage, setPage] = useRecoilState(page)
    const [, setLastPage] = useRecoilState(lastPage)
    const [activeApplications, setActiveApplications] = useState([]);
    const [oldApplications, setOldApplications] = useState([])

    // TODO: fetch applications for currentUser
    // const newApplications = [
    //     {
    //         applicationName: "Søknad om redusert foreldrebetaling",
    //         date: "10.10.10",
    //         changeOrCheck: true,
    //         changedDate: "11.10.10",
    //         status: "Søknad ikke sendt",
    //         action: "",
    //         filled: 1,
    //         firstInfo: [
    //             {
    //                 name: "Ola Normann"
    //             },
    //             {
    //                 name: "Thea Normann"
    //             }
    //         ],
    //         secondInfo: [
    //             {
    //                 name: "Ola Normann",
    //                 extraInformation: "Salhus SFO"
    //             },
    //             {
    //                 name: "Thea Normann",
    //                 extraInformation: "Salhus SFO"
    //             }
    //         ]
    //     }
    // ]

    // const oldApplications = [{
    //     applicationName: "Søknad om redusert foreldrebetaling",
    //     date: "10.10.10",
    //     changeOrCheck: false,
    //     changedDate: "11.10.10",
    //     status: "Vedtak foretatt",
    //     action: "",
    //     filled: 3,
    //     firstInfo: [
    //         {
    //             name: "Ola Normann"
    //         },
    //         {
    //             name: "Thea Normann"
    //         }
    //     ],
    //     secondInfo: [
    //         {
    //             name: "Ola Normann",
    //             extraInformation: "Salhus SFO"
    //         },
    //         {
    //             name: "Thea Normann",
    //             extraInformation: "Salhus SFO"
    //         }
    //     ]
    // },
    // {
    //     applicationName: "Søknad om redusert foreldrebetaling",
    //     date: "10.10.10",
    //     changeOrCheck: false,
    //     changedDate: "11.10.10",
    //     status: "Vedtak foretatt",
    //     action: "",
    //     filled: 3,
    //     firstInfo: [
    //         {
    //             name: "Ola Normann"
    //         },
    //         {
    //             name: "Thea Normann"
    //         }
    //     ],
    //     secondInfo: [
    //         {
    //             name: "Ola Normann",
    //             extraInformation: "Salhus SFO"
    //         },
    //         {
    //             name: "Thea Normann",
    //             extraInformation: "Salhus SFO"
    //         }
    //     ]
    // }
    // ]

    const saveAllApplications = (applicationsToSave) => {
        sessionStorage.setItem("applicantIdentifier", applicantIdentifier);
        let tempActiveApplications = [];
        let tempOldApplications = [];
        const applications = JSON.parse(applicationsToSave);

        for(let i=0; i<applications.length; i++)
        {
            if(applications[i]["status"] === null || typeof applications[i]["dato_siste_endring"] === "undefined")
                continue;

            if(applications[i]["status"] !== "Behandlet")
                tempActiveApplications.push(applications[i]);
            else
                tempOldApplications.push(applications[i]);
        }
        
        setActiveApplications(tempActiveApplications);
        setOldApplications(tempOldApplications);

        //TODO: save to session storage if necessary
        //TODO: consider a filter on the backend for the applications returned
    }

    useEffect(() => {
        axios.get("http://51.107.208.107/get_applicant/"+applicantIdentifier).then(
            (response) => {sessionStorage.setItem("applicant", JSON.stringify(response.data))}
        )

        axios.get("http://51.107.208.107/get_all_applications/"+applicantIdentifier).then(
            (response) => {saveAllApplications(response.data)}
        )

    }, [])

    const excerptClicked = (arr, index) => {
        setApplication(arr === "new" ? activeApplications[index] : oldApplications[index])
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

    const handleNewApplication = () => {
        setLastPage(currentPage)
        setPage(PAGE_POINTER.invoice)
    }

    return (
        <div className={styles.container}>

            <div className={styles.titleArea}>
                <h2 className={styles.title}>Du er logget inn som <span className={styles.name}>{props.name}</span></h2>
                <button className={styles.logout}>Logg ut</button>
            </div>

            <NextButton isClickable={true} text={"Start ny søknad"} callback={handleNewApplication} />

            <h2 className={styles.minorHeading}>Dine søknader</h2>
            <h5>Aktive</h5>
            {activeApplications.map((application, index) => {
                return (
                    <ApplicationExcerpt
                        key={index}
                        applicationName={"Søknad om redusert foreldrebetaling"}
                        date={application["dato_siste_endring"]} // TODO Add the date in the backend
                        changeOrCheck={true}
                        changedDate={"11.10.2019"} // TODO Retrieve from statushistorikk
                        excerptClicked={() => excerptClicked("new", index)}
                        arr="new"
                        index={index}
                        status={application["status"]}
                    />
                )
            })}
            <h5>Eldre</h5>
            {oldApplications.map((application, index) => {
                return (
                    <ApplicationExcerpt
                        key={index}
                        // applicationName={application.applicationName}
                        // date={application.date}
                        // changeOrCheck={application.changeOrCheck}
                        // excerptClicked={() => excerptClicked("old", index)}
                        // arr="old"
                        // index={index} 
                        // status={application.status}/>
                        applicationName={"Søknad om redusert foreldrebetaling"}
                        date={"10.10.2019"} // TODO Add the date in the backend
                        changeOrCheck={false}
                        changedDate={"11.10.2019"} // TODO Retrieve from statushistorikk
                        excerptClicked={() => excerptClicked("old", index)}
                        arr="old"
                        index={index}
                        status={application["status"]}
                    />
                        )
            })}
 
            <h2 className={styles.minorHeading}>Ofte stilte spørsmål</h2>
            {questions.map((question, i) => {
                return (
                    <div key={i} className={styles.spacer}>
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