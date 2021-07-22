import { useState } from 'react';
import { Button } from '@material-ui/core'
import Applicant from './Applicant'


function ApplicationPage() {
    const [applicantName, setApplicantName] = useState("Ola Nordmann")
    const [identifier, setIdentifier] = useState("25078978388")


    return(
        <div>
            <Applicant applicantName={applicantName} identifier={identifier} />
            {/*<Partner />*/}
            {/*<ChildList />*/}
        </div>
    );
}

export default ApplicationPage;