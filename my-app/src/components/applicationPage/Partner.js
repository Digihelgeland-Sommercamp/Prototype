import './ApplicationPageTitle'
import './Applicant.css';
import { useState } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import ApplicationPageTitle from './ApplicationPageTitle';

function Partner(props) {
    const [partnerName, setPartnerName] = useState(props.partnerName)
    const [identifier, setIdentifier] = useState(props.identifier)

    return (
        <div style={{marginTop: "15%"}}>
            <ApplicationPageTitle titleText={"Ektefelle / Reg.partner / Samboer"} />
            <div className="applicant-info-wrapper">
                <div className="applicant-content-name">{partnerName}</div>
                <div className="applicant-content-id">{identifier}</div>
            </div>
        </div>
    );
}

export default Partner;