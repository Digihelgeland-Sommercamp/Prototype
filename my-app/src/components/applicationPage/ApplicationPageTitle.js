import { useState } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import './ApplicationPageTitle.css'

function ApplicationPageTitle(props) {
    const [titleText, setTitleText] = useState(props.titleText);
    // TODO: Send in function to populate the information bubble

    return(
        <div className="applicant-title-wrapper">
            <div className="title-card">{titleText}</div>
            <InfoIcon className="info-icon"/>
        </div>
    );
}

export default ApplicationPageTitle;