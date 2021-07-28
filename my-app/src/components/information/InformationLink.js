import { useState } from "react";
import styles from './InformationLink.module.css';
import InfoIcon from '@material-ui/icons/Info';
import InformationModal from "./InformationModal";

function InformationLink(props) {
    const [linkText,] = useState(props.linkText);
    const [modalTitle,] = useState(props.modalTitle);
    const [modalTextBody,] = useState(props.modalTextBody);
    const [modalButtonText,] = useState(props.modalButtonText);

    const [shouldShowInformation, setShouldShowInformation] = useState(false);

    const toggleInformation = () => {
        setShouldShowInformation(!shouldShowInformation);
    }

    console.log(modalTitle)

    return(
        <div className={styles.container} onClick={toggleInformation}>
            <InfoIcon color="primary"/>
            <div className={styles.text}>
                {linkText}
            </div>
            <InformationModal shouldBeVisible={shouldShowInformation} 
            textBody={modalTextBody} 
            toggleVisible={toggleInformation}
            title={modalTitle}
            buttonText={modalButtonText}/>
        </div>
    );
}

export default InformationLink;