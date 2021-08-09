import { useState } from 'react';
import styles from './IncomeArea.module.css'
import InformationTitle from '../information/InformationTitle';

function IncomeArea(props) {
    const [incomeTitleText, ] = useState(props.incomeTitleText)
    const [incomeTextBody, ] = useState(props.incomeTextBody)
    const [applicants, ] = useState(props.applicants)

    function renderAttachments() {
        if (props.showAttachments) {
            const sjekk = sessionStorage.getItem('vedlegg') ? JSON.parse(sessionStorage.getItem('vedlegg')) : null;
            const returner = [];
            if (sjekk != null && sjekk.length > 0) {
                returner.push(<div className={styles.attachmentTitle}>Dokumentasjon:</div>);
            }
            else {
                return(<div className={styles.attachmentText}>Ingen vedlegg er lagt til</div>);
            };
            for (var i = 0; i < sjekk.length; i++) {
                const name = sjekk[i][1][1];
                let simplified = name;
                if (name.length > 20) {
                    simplified = name.slice(0,20) + " ... ." + sjekk[i][1][2].split("/")[1];
                }
                returner.push(<li className={styles.attachmentList}>{simplified}</li>);
            }
            return(returner);
        }
    }

    return(
        <div>
            {/* <ApplicationPageTitle titleText={incomeTitleText} displayInfoIcon={false}/> */}
            <div className={styles.title}>
                <InformationTitle title={incomeTitleText}/>
            </div>
            <div className={styles.container}>
                
                <div className={styles.text}> {incomeTextBody} </div>
                {applicants.map((value, i) => {
                    return <li key={i} className={styles.applicants}>{value}</li>
                })}
                {renderAttachments()}
                <div style={{marginBottom: "15px"}}></div>
            </div>           
        </div>
    );
}

IncomeArea.defaultProps =  {
    incomeTitleText: "Inntekt",
    incomeTextBody: "Søknaden blir behandlet på bakgrunn av inntekten til:",
    applicants: ["Ola Nordmann", "Kari Nordmann"],
    showAttachments: false
}

export default IncomeArea;