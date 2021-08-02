import { useState } from "react";
import Edit from "../../components/Edit/Edit";
import styles from './ReviewApplication.module.css'

import { selector, useRecoilState } from 'recoil';

import { PAGE_POINTER } from '../../pagePointer.js';
import ProgressBar from "../../components/ProgressBar/ProgressBar";
import InformationTitle from "../../components/information/InformationTitle";
import Applicant from "../../components/Applicant/Applicant";
import IncomeArea from "../../components/IncomeArea/IncomeArea";
const page = selector({
    key: 'page', 
  });
  
  const lastPage = selector({
    key: 'lastPage', 
  });



function ReviewApplication(props) {

    const [state, setState] = useRecoilState(page);
    const [, setLastPage] = useRecoilState(lastPage)

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
        let partner = localStorage.getItem("partner") ? 
        JSON.parse(localStorage.getItem("partner")) : null;

        if(!partner)
            return <></>;

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

                {/* <Applicant applicantName={"Kari jajaja"} identifier={"465487465"}/> */}
                {getPartner()}
                <div style={{marginBottom: "10px"}}></div>

            <div className={styles.container}>
                <Edit callback={()=>setNextPage(PAGE_POINTER.household)}/>
            </div>
        </>);
    }

    const allChildren = () => {
        let childrenList = localStorage.getItem("children") ? 
            JSON.parse(localStorage.getItem("children")) : null;
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
        return(
        <>
            {/* <div className={styles.container}>             */}
                <IncomeArea />
            {/* </div> */}
        </>
        );
    }

    return(
        <>
            <ProgressBar filled={5} elements={[{}, {}, {}, {}, {}]} />
            {title()}
            
            {partner()}

            <div style={{marginBottom:"50px"}}></div>

            {children()}
            <div style={{marginBottom:"50px"}}></div>
            {income()}

        </>
    );
}

export default ReviewApplication;