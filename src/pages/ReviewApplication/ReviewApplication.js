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



function ReviewApplication(props) {

    const [state, setState] = useRecoilState(page);
    const [, setLastPage] = useRecoilState(lastPage)
    const [shouldBeNotified, setShouldBeNotified] = useState(null)

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

        return <Applicant applicantName={partner["fornavn"] + " " + partner["etternavn"]} 
                identifier={partner["personidentifikator"]} />;
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
            let applicant = <Applicant applicantName={childrenList[i]["name"]} 
                            identifier={childrenList[i]["personidentifikator"]} />;
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

    const income = () => {
        let applicants = ["Ola IkkeAutoGenerert"]
        let partner = sessionStorage.getItem("partner") ? JSON.parse(sessionStorage.getItem("partner")) : null;
        if(partner)
            applicants.push(partner["fornavn"]+" "+partner["etternavn"]);
        return(
        <>
            <IncomeArea applicants={applicants} />
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
            let navn = childrenList[i]["fornavn"] + " " + childrenList[i]["etternavn"];
            let identifikator = childrenList[i]["personidentifikator"];
            childrenToSend.push({
                "barnets_navn": navn,
                "fodselsnummer": identifikator,
                "navn_pa_barnehage": null, // TODO: Make this appear and differ between SFO / barnehage
                "prosent_plass": null
            })
        }
        
        return childrenToSend;
    }

    const sendApplication = () => {
        if(!canSendApplication()) return false;
        let url = "http://51.107.208.107/submit_application"

        let partner = sessionStorage.getItem("partner") ? JSON.parse(sessionStorage.getItem("partner")) : null;
        let hasPartner = partner !== null
        let data = {
            "navn": {
                "etternavn": "IkkeAutoGenerert",
                "fornavn": "Ola",
                "mellomnavn": null
            },
            "identifikasjonsnummer": {
                "foedselsEllerDNummer": "03839199405", // TODO Make this respond to login number
                "identifikatortype": "foedselsnummer"
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
                "varig_nedgang_samlet_inntekt": false, // TODO: Make these dynamic
                "mistet_jobb": false,
                "samlivsbrudd": false
            }
        }

    //     const config ={
    //     "headers": {"Access-Control-Allow-Origin": "*",
    //     "Access-Control-Allow-Methods": "POST",
    //     "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"
    // }}
    // const config = {
    //     headers: {
    //       'Content-Type' : 'application/x-www-form-urlencoded'
    //       //'Authorization' : 'Basic dGVzdF9ycF95dDI6cGFzc3dvcmQ='
    //     }
    //   }

        axios.post(url, data)

        return true; // Optionally just go to next page directly
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