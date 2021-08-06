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

function ReviewApplication() {

    const [state, setState] = useRecoilState(page);
    const [, setLastPage] = useRecoilState(lastPage)
    const [situation, ] = useRecoilState(currentSituation)
    const [shouldBeNotified, setShouldBeNotified] = useState(null)

    console.log(situation);
    const setNextPage = (page) => {
        setLastPage(state);
        setState(page);
    }

    const title = () => {
        return(
        <div className={styles.container}>
            <h2 className={styles.title}>Se over før innsending</h2>
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
        <>           
            <div className={styles.container}>
                <InformationTitle title={"Ektefelle / Reg.partner / Samboer"}/>
                <div style={{marginBottom: "15px"}}></div>
            </div>

                {getPartner()}
                <div style={{marginBottom: "10px"}}></div>

            <div className={styles.container}>
                <Edit callback={()=>setNextPage(PAGE_POINTER.household)}/>
            </div>
        </>);
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
            <>
                <div className={styles.container}>
                    <InformationTitle title={"Søker for"}/>
                    <div style={{marginBottom: "15px"}}></div>
                </div>
                {/* <Applicant applicantName={"Kari jajaja"} identifier={"465487465"}/> */}
                {allChildren()}
                <div style={{marginBottom: "10px"}}></div>


                <div className={styles.container}>
                    <Edit callback={()=>setNextPage(PAGE_POINTER.kids)}/>
                </div>
            </>
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
        <>
            <IncomeArea applicants={applicants} showAttachments={true} />
        </>
        );
    }

    const automaticReminderCallback = (value)=>{
        value>0 ? setShouldBeNotified(false) : setShouldBeNotified(true);
    }

    const automaticReminder = () => {
        let radioBoxText = ["Ja", "Nei"]
        return(
            <div className={styles.container}>
                <h2 className={styles.subtitle}>Automatisk påminnelse?</h2>
                <p>Vil du bli kontaktet når du kan søke om redusert foreldrebetaling 
                    eller gratis kjernetid til neste år?</p>
                <RadioBoxGroup radioGroupCallback={automaticReminderCallback} radioTextList={radioBoxText}/>
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
        setLastPage(state);
        setState(PAGE_POINTER.receipt)
    }

    const sendApplication = () => {
        if(!canSendApplication()) return false;
        let url = "http://51.107.208.107/submit_application"

        let applicant = sessionStorage.getItem("applicant") ? JSON.parse(sessionStorage.getItem("applicant")) : null;
        let partner = sessionStorage.getItem("partner") ? JSON.parse(sessionStorage.getItem("partner")) : null;
        let hasPartner = partner !== null;
        let stableIncome = situation === "stable-income";
        let applicantID = sessionStorage.getItem("applicantIdentifier")


        console.log(applicant)
        let data = {
            "navn": applicant["navn"],
            "identifikasjonsnummer": applicantID,
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

        console.log(data)

        axios.post(url, data)

        goToNextPage();
    }

    const canSendApplication = () => {
        if(shouldBeNotified === null) return false;
        if(!sessionStorage.getItem("children") || JSON.parse(sessionStorage.getItem("children")).length<1) return false;

        return true;
    }

    const sendApplicationButton = () => {

        return(
            <div className={styles.container}>
                <NextButton text="Send søknad" callback={sendApplication} isClickable={canSendApplication()}/>
            </div>
        );
    }
    return(
        <>
            <ProgressBar filled={6} elements={[{}, {}, {}, {}, {}, {}]} />
            {title()}
            
            {partner()}

            <div style={{marginBottom:"50px"}}></div>

            {children()}
            <div style={{marginBottom:"50px"}}></div>
            {income()}
            <div style={{marginBottom:"30px"}}></div>
            {automaticReminder()}
            <div style={{marginBottom:"20px"}}></div>
            {sendApplicationButton()}
        </>
    );
}

export default ReviewApplication;