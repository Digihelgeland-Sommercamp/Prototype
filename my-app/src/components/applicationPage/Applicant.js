import './Applicant.css';
import { useState } from 'react';
import Divider from '@material-ui/core/Divider';
import InfoIcon from '@material-ui/icons/Info';


function Applicant(props) {
    const [applicantName, setApplicantName] = useState(props.applicantName)
    const [identifier, setIdentifier] = useState(props.identifier)

    return(
        <div>
            <div className="applicant-title-wrapper">
                <div className="title-card">Søker</div>
                <InfoIcon className="info-icon"/>
            </div>
            <div className="applicant-info-wrapper">
                <div className="applicant-content-name">{applicantName}</div>
                <div className="applicant-content-id">{identifier}</div>
            </div>
        </div>
    );
}

export default Applicant