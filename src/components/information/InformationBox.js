import { useState } from "react";
import styles from './InformationBox.module.css'
import InfoIcon from '@material-ui/icons/Info';
import { createTheme, ThemeProvider } from "@material-ui/core";



function InformationBox(props) {
    const textBody= props.text
    
    return(
        <div>
            <div className={styles.container}>
                <div className={styles.iconWrapper}>
                    <InfoIcon color={"primary"}/>
                </div>
                <div className={styles.text}>
                    {textBody}
                </div>
            
            </div>

        </div>
    )
}

InformationBox.defaultProps = {
    informationBoxTextBody: "Dersom noen i husholdningen har en nylig, varig endring av sin inntekt må dette dokumenteres."

}

export default InformationBox