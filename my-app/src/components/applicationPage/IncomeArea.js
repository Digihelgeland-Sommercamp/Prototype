import { useState } from 'react';
import './IncomeArea.css'
import './ApplicationPageTitle'
import ApplicationPageTitle from './ApplicationPageTitle';
import InformationBox from './InformationBox';

function IncomeArea(props) {
    const [incomeTitleText, setIncomeTitleText] = useState(props.incomeTitleText)
    const [incomeTextBody, setIncomeTextBody] = useState(props.incomeTextBody)
    const [applicants, setApplicants] = useState(props.applicants)

    return(
        <div>
            <ApplicationPageTitle titleText={incomeTitleText} displayInfoIcon={false}/>
            <div className="income-text-body"> {incomeTextBody} </div>
            {applicants.map((value, index) => {
                return <li className="income-applicants">{value}</li>
            })}
            {/* <InformationBox /> */}
        </div>
    );
}

IncomeArea.defaultProps =  {
    incomeTitleText: "Inntekt",
    incomeTextBody: "Vi beregner inntekt i år basert på sist oppdaterte skatteopplysninger. \n\n\
                    Søknaden blir behandlet på bakgrunn av inntekten til:",
    applicants: ["Ola Nordmann", "Kari Nordmann"]
}

export default IncomeArea;