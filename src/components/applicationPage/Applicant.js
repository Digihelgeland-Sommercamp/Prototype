import './Applicant.css';
import './ApplicationPageTitle'
import { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import InfoIcon from '@material-ui/icons/Info';
import ApplicationPageTitle from './ApplicationPageTitle';


function Applicant(props) {
    const [applicantName, setApplicantName] = useState(props.applicantName)
    const [identifier, setIdentifier] = useState(props.identifier)

    return(
        <div>
            <ApplicationPageTitle titleText={"Søker"}/>
            <div className="applicant-info-wrapper">
                <div className="applicant-content-name">{applicantName}</div>
                <div className="applicant-content-id">{identifier}</div>
            </div>
        </div>
    );
}

export default Applicant