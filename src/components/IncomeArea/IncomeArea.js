import { useState } from 'react';
import styles from './IncomeArea.module.css'
// import '../applicationPage/ApplicationPageTitle'
// import ApplicationPageTitle from '../applicationPage/ApplicationPageTitle';
import InformationBox from '../information/InformationBox';
import InformationTitle from '../information/InformationTitle';

function IncomeArea(props) {
    const [incomeTitleText, setIncomeTitleText] = useState(props.incomeTitleText)
    const [incomeTextBody, setIncomeTextBody] = useState(props.incomeTextBody)
    const [applicants, setApplicants] = useState(props.applicants)

    return(
        <div>
            {/* <ApplicationPageTitle titleText={incomeTitleText} displayInfoIcon={false}/> */}
            <div className={styles.title}>
                <InformationTitle title={incomeTitleText}/>
            </div>
            <div className={styles.container}>
                <div className={styles.text}> {incomeTextBody} </div>
                {applicants.map((value, index) => {
                    return <li className={styles.applicants}>{value}</li>
                })}

                <div style={{marginBottom: "15px"}}></div>
            </div>
            {/* <InformationBox /> */}
        </div>
    );
}

IncomeArea.defaultProps =  {
    incomeTitleText: "Inntekt",
    incomeTextBody: "Søknaden blir behandlet på bakgrunn av inntekten til:",
    applicants: ["Ola Nordmann", "Kari Nordmann"]
}

export default IncomeArea;