import { useState } from "react";
import Edit from "../../components/Edit/Edit";
import styles from './ReviewApplication.module.css'

import { selector, useRecoilState } from 'recoil';

import { PAGE_POINTER } from '../../pagePointer.js';
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import InformationTitle from "../../components/information/InformationTitle";
import Applicant from "../../components/Applicant/Applicant";
import IncomeArea from "../../components/IncomeArea/IncomeArea";
import RadioBoxGroup from "../../components/radioBox/RadioBoxGroup";
import NextButton from "../../components/NextButton/NextButton";
import axios from "axios";



const page = selector({
    key: 'page', 
});

const lastPage = selector({
    key: 'lastPage', 
});

const currentSituation = selector({
    key: 'situation',
})

const attachmentList = selector({
    key: "attachmentList"
})

const caseNumberAtom = selector({
    key: 'caseNumber',
})
const progressSelector = selector({
    key: 'progress'
})

  

function ReviewApplication() {
    const [state, setState] = useRecoilState(page);
    const [, setLastPage] = useRecoilState(lastPage)
    const [progress, setProgress] = useRecoilState(progressSelector) 

    const [situation, ] = useRecoilState(currentSituation)
    const [shouldBeNotified, setShouldBeNotified] = useState(null)
    const [itemList] = useRecoilState(attachmentList)
    const [caseNumber, setCaseNumber] = useRecoilState(caseNumberAtom)

    const setNextPage = (page) => {
        setLastPage(state);
        setState(page);
    }

    const title = () => {
        return(
        <div className={styles.container}>
            <h1 className={styles.title}>Se over før innsending</h1>
        </div>
        );
    }

    const getPartner = () => {
        let partner = sessionStorage.getItem("partner") ? 
        JSON.parse(sessionStorage.getItem("partner")) : null;

        if(!partner)
            return <p className={styles.container}>Ingen samboer</p>;

        let fornavn = typeof partner["navn"] !=="undefined" && partner["navn"]["fornavn"]
                ? partner["navn"]["fornavn"] : "";
        let mellomnavn = typeof partner["navn"] !=="undefined" && partner["navn"]["mellomnavn"] !== null 
                ? partner["navn"]["mellomnavn"] + " " : "";
        let etternavn = typeof partner["navn"] !=="undefined" && partner["navn"]["etternavn"] !== null
                ? partner["navn"]["etternavn"] : "";
        let personid = typeof partner["identifikasjonsnummer"] !=="undefined" && 
                partner["identifikasjonsnummer"]["foedselsEllerDNummer"] !== null
                ? partner["identifikasjonsnummer"]["foedselsEllerDNummer"] : "";

        return <Applicant applicantName={fornavn + " " + mellomnavn + etternavn} 
                identifier={personid} />;
    }

    const partner = () => {
        return( 
            <div className={styles.component}>           
                <div className={styles.container}>
                    <InformationTitle 
                        title={"Ektefelle / Reg.partner / Samboer"}
                        modalTitle="Husholdning"
                        modalTextBody="Husholdning er deg og din ektefelle, registrerte partner eller samboer. 
                            Samboere med felles barn regnes som en husholdning. 
                            Dersom du og din samboer ikke har felles barn vil dere regnes som en husholdning hvis dere har bodd sammen i minst 12 av de siste 18 månedene."
                        modalButtonText="OK"/>
                    <div style={{marginBottom: "15px"}}></div>
                </div>

                    {getPartner()}
                    <div style={{marginBottom: "10px"}}></div>

                <div className={styles.container}>
                    <Edit callback={()=>setNextPage(PAGE_POINTER.household)}/>
                </div>
            </div>);
    }

    const allChildren = () => {
        let childrenList = sessionStorage.getItem("children") ? 
            JSON.parse(sessionStorage.getItem("children")) : null;
        if(!childrenList)
            return <></>;
        
        let applicantList = [];
        for(let i=0; i<childrenList.length; i++)
        {
            let mellomnavn = childrenList[i]["navn"]["mellomnavn"] ? childrenList[i]["navn"]["mellomnavn"]+" " : ""
            let childName = childrenList[i]["navn"]["fornavn"] + " " + mellomnavn + childrenList[i]["navn"]["etternavn"]

            let applicant = <Applicant key={i} applicantName={childName} 
                            identifier={childrenList[i]["foedsel"]} />;
            applicantList.push(applicant);
        }

        return applicantList;
    }


    const children = () => {
        return(
            <div className={styles.component}> 
                <div className={styles.container}>
                    <h3 style={{marginBottom: "15px"}}>Søker for</h3>
                </div>
                {/* <Applicant applicantName={"Kari jajaja"} identifier={"465487465"}/> */}
                {allChildren()}
                <div style={{marginBottom: "10px"}}></div>


                <div className={styles.container}>
                    <Edit callback={()=>setNextPage(PAGE_POINTER.kids)}/>
                </div>
            </div>
        )
    }

    let getName = (person) => {
        let fornavn = typeof person["navn"] !=="undefined" && person["navn"]["fornavn"]
                    ? person["navn"]["fornavn"] : "";
        let mellomnavn = typeof person["navn"] !=="undefined" && person["navn"]["mellomnavn"] !== null 
                    ? person["navn"]["mellomnavn"] + " " : "";
        let etternavn = typeof person["navn"] !=="undefined" && person["navn"]["etternavn"] !== null
                    ? person["navn"]["etternavn"] : "";
        return fornavn + " " + mellomnavn + etternavn;
    }

    const income = () => {
        let applicant = sessionStorage.getItem("applicant") ? 
                        JSON.parse(sessionStorage.getItem("applicant")) : null;
        let partner = sessionStorage.getItem("partner") ? 
                        JSON.parse(sessionStorage.getItem("partner")) : null;

        let applicants = [getName(applicant)]
        if(partner)
            applicants.push(getName(partner));
        
        return(
            <div className={styles.component}> 
                <IncomeArea applicants={applicants} showAttachments={true} />
            </div>
        );
    }

    const automaticReminderCallback = (value)=>{
        value>0 ? setShouldBeNotified(false) : setShouldBeNotified(true);
    }

    const automaticReminder = () => {
        let radioBoxText = ["Ja", "Nei"]
        return(
            <div className={styles.component}> 
                <div className={styles.container}>
                    <h2 className={styles.subtitle}>Automatisk påminnelse?</h2>
                    <p className={styles.reminderText}>Ønsker du at søknaden skal gjelde for alle årene ditt barn går i barnehage/SFO? </p>
                    <p className={styles.reminderText}>Velger du <strong>ja</strong> vil kommunen automatisk innhente husholdningens inntektsopplysninger hvert år (der dette er mulig).</p>
                    <p className={styles.reminderText}>Velger du <strong>nei</strong> må du søke på nytt hvert år. </p>
                    <RadioBoxGroup radioGroupCallback={automaticReminderCallback} radioTextList={radioBoxText}/>
                </div>
            </div>
        );
    }

    const getListOfChildren = () => {
        let childrenList = sessionStorage.getItem("children") ? 
            JSON.parse(sessionStorage.getItem("children")) : null;
        if(!childrenList) throw new Error("Couldn't parse children in ReviewApplication getListOfChildren");

        let childrenToSend = [];

        for(let i=0; i<childrenList.length; i++)
        {
            // let navn = childrenList[i]["fornavn"] + " " + childrenList[i]["etternavn"];
            let identifikator = childrenList[i]["personidentifikator"];
            childrenToSend.push({
                "barnets_navn": getName(childrenList[i]),
                "fodselsnummer": identifikator,
                "navn_pa_barnehage": null, // TODO: Make this appear and differ between SFO / barnehage
                "prosent_plass": null
            })
        }
        
        return childrenToSend;
    }

    const goToNextPage = () => {
        setProgress(1)
        setLastPage(state);
        setState(PAGE_POINTER.receipt)
    }

    const sendApplication = () => {
        if(!canSendApplication()) return false;
        let url = "http://51.107.208.107/submit_application";
        let attachmentsUrl = "http://51.107.208.107/add_attachment";

        let applicant = sessionStorage.getItem("applicant") ? JSON.parse(sessionStorage.getItem("applicant")) : null;
        let partner = sessionStorage.getItem("partner") ? JSON.parse(sessionStorage.getItem("partner")) : null;
        let hasPartner = partner !== null;
        let stableIncome = situation === "stable-income";
        let applicantID = sessionStorage.getItem("applicantIdentifier")

        let data = {
            "navn": applicant["navn"],
            "identifikasjonsnummer": {
                "foedselsEllerDNummer": applicantID,
                "identifikatortype": "foedselsnummer" // TODO: Get the identifikasjonsnummer object from the backend instead
            },
            "sivilstand": {
                "har_samboer": hasPartner,
                "relatert_person": partner["personidentifikator"],
                "samboer_fra_dato": "2015-01-01"
            },
            "opplysninger_om_barn_barnehage": getListOfChildren(),
            "opplysninger_om_barn_SFO": [
                {
                    "barnets_navn": "ER ENDA IKKE GJORT AUTOMATISK",
                    "fodselsnummer": null,
                    "navn_pa_sfo": null,
                    "prosent_plass": null
                }
            ],
            "flagg": {
                "varig_nedgang_samlet_inntekt": !stableIncome, 
                "mistet_jobb": false, // TODO: Make these dynamic
                "samlivsbrudd": false
            }
        }

        const vedleggListe = itemList;
        if (vedleggListe !== null && vedleggListe.length > 0) {
            const formData = new FormData();
            for (var i = 0; i<vedleggListe.length; i++){
                formData.append('file'+i, vedleggListe[i][0]);
            };
            axios({
                method: "post",
                url: attachmentsUrl,
                data: formData,
                headers: {"Content-Type": "multipart/form-data"}
            })
            .then(function (response) {
                data["vedlegg"] = JSON.parse(response.data);
            })
            .catch(function (response) {
                console.log(response)
            });
        }

        axios.post(url, data)
        .then(async function (response) {
            sessionStorage.removeItem("applicant");
            sessionStorage.removeItem("partner");
            sessionStorage.removeItem("kids");
            sessionStorage.removeItem("children");
            setCaseNumber(response.data.saksnummer)
            console.log(caseNumber)
        })

        goToNextPage();
    }

    const canSendApplication = () => {
        if(shouldBeNotified === null) return false;
        if(!sessionStorage.getItem("children") || JSON.parse(sessionStorage.getItem("children")).length<1) return false;

        return true;
    }

    const sendApplicationButton = () => {

        return(
            <NextButton text="Send søknad" callback={sendApplication} isClickable={canSendApplication()}/>
        );
    }
    return(
        <>
            <div className="wrapper">
                <ProgressBar filled={6} elements={[{}, {}, {}, {}, {}, {}]} />
                {title()}
                {partner()}
                {children()}
                {income()}
                {automaticReminder()}
            </div>
            {sendApplicationButton()}
        </>
    );
}

export default ReviewApplication;