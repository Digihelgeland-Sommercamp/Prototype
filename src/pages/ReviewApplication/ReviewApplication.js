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

    const title = () => {
        return(
        <div className={styles.container}>
            <h2 className={styles.title}>Se over før innsending</h2>
        </div>
        );
    }

    const partner = () => {
        return( 
        <>           
            <div className={styles.container}>
                <InformationTitle title={"Ektefelle / Reg.partner / Samboer"}/>
            </div>

                <Applicant applicantName={"Kari jajaja"} identifier={"465487465"}/>

            <div className={styles.container}>
                <Edit callback={()=>setState(PAGE_POINTER.household)}/>
            </div>
        </>);
    }

    const children = () => {
        return(
            <>
                <div className={styles.container}>
                    <InformationTitle title={"Søker for"}/>
                </div>
                <Applicant applicantName={"Kari jajaja"} identifier={"465487465"}/>

            <div className={styles.container}>
                <Edit callback={()=>setState(PAGE_POINTER.kids)}/>
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