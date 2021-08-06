import { useState } from "react";
import styles from './InformationLink.module.css';
import InfoIcon from '@material-ui/icons/Info';
import InformationModal from "./InformationModal";

/* A clickable link that opens an InformationModal when clicked
* @param linkText the text of the link. If not supplied, the link will be in iconOnly mode
* @param iconOnly defaults to false. If this is true, only the icon is shown and clickable.*/
function InformationLink(props) {
    const linkText = props.linkText;
    const [iconOnly, setIconOnly] = useState(props.iconOnly);
    const modalTitle = props.modalTitle;
    const modalTextBody = props.modalTextBody;
    const modalButtonText = props.modalButtonText;

    const [shouldShowInformation, setShouldShowInformation] = useState(false);

    const toggleInformation = () => {
        setShouldShowInformation(!shouldShowInformation);
    }

    if(typeof linkText === 'undefined' && !iconOnly)
        setIconOnly(true);

    return(
        <div className={iconOnly ? styles.iconContainer : styles.textContainer}>
            <InfoIcon style={{color:"#1C77FF"}} onClick={toggleInformation}/>
            <div className={styles.text} onClick={toggleInformation}>
                {iconOnly ? "" : linkText}
            </div>
            
            <InformationModal shouldBeVisible={shouldShowInformation} 
                textBody={modalTextBody} 
                toggleVisible={toggleInformation}
                title={modalTitle}
                buttonText={modalButtonText}/>
        </div>
    );
}

InformationLink.defaultProps = {
    iconOnly: false,
    modalButtonText: "OK"
}

export default InformationLink;