import { useState} from 'react';
import { Button } from '@material-ui/core'
// import Applicant from './Applicant'
import Partner from './Partner'
// import IncomeArea from '../IncomeArea/IncomeArea';
import InformationBox from '../information/InformationBox';
import InformationModal from '../information/InformationModal';
import InformationLink from '../information/InformationLink';

var informationText = "Her kan du lese mer om det du lurer på."

function ApplicationPage(props) {
    const [applicantName, setApplicantName] = useState("Ola Nordmann");
    const [applicantIdentifier, setApplicantIdentifier] = useState("25078978388");

    const [partnerName, setPartnerName] = useState("Kari Nordmann");
    const [partnerIdentifier, setPartnerIdentifier] = useState("301088*****");

    const [shouldShowInformationModal, setShouldShowInformationModal] = useState(false);


    const toggleInformationModal = () => {
        setShouldShowInformationModal(!shouldShowInformationModal);
    }

    

    return(
        <div>
            {/* <Applicant applicantName={applicantName} identifier={applicantIdentifier} /> */}
            {/* <Partner partnerName={partnerName} identifier={partnerIdentifier}/> */}
            {/*<ChildList />*/}
            {/* <IncomeArea /> */}
            <InformationBox />
            <InformationModal shouldBeVisible={shouldShowInformationModal} textBody={informationText} toggleVisible={toggleInformationModal}/>
            <button onClick={toggleInformationModal}>sd</button>
            <InformationLink modalTitle={"Kul tittel"} modalTextBody={"Masse tekst"} linkText={"Dette er en link"} modalButtonText={"GREIT"} />
        </div>
    );
}

export default ApplicationPage;