import { useState } from 'react';
import InfoIcon from '@material-ui/icons/Info';
import './ApplicationPageTitle.css'
// var test = true;


function ApplicationPageTitle(props) {
    const [titleText, setTitleText] = useState(props.titleText);
    // let test = true
    // if (props.displayInfoIcon)
    //     test = props.displayInfoIcon
    const [displayInfoIcon, setDisplayInfoIcon] = useState(props.displayInfoIcon)
    // TODO: Send in function to populate the information bubble

    return(
        <div className="applicant-title-wrapper">
            <div className="title-card">{titleText}</div>
            {displayInfoIcon ? <InfoIcon className="info-icon"/> : ""}
            
        </div>
    );
}

ApplicationPageTitle.defaultProps = {
    displayInfoIcon: true
};

export default ApplicationPageTitle;