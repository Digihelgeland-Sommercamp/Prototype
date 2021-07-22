import { useState } from 'react';
import { Button } from '@material-ui/core'
import Applicant from './Applicant'
import Partner from './Partner'


function ApplicationPage() {
    const [applicantName, setApplicantName] = useState("Ola Nordmann")
    const [applicantIdentifier, setApplicantIdentifier] = useState("25078978388")

    const [partnerName, setPartnerName] = useState("Kari Nordmann")
    const [partnerIdentifier, setPartnerIdentifier] = useState("301088*****")

    return(
        <div>
            <Applicant applicantName={applicantName} identifier={applicantIdentifier} />
            <Partner partnerName={partnerName} identifier={partnerIdentifier}/>
            {/*<ChildList />*/}
        </div>
    );
}

export default ApplicationPage;