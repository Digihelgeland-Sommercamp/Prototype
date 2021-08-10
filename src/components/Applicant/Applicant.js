import './Applicant.css';


function Applicant(props) {
    const applicantName = props.applicantName
    const identifier = props.identifier

    return(
        <div>
            <div className="applicant-info-wrapper">
                <div className="applicant-content-name">{applicantName}</div>
                <div className="applicant-content-id">{identifier}</div>
            </div>
        </div>
    );
}

export default Applicant