import { useState } from "react";
import './InformationBox.css'





function InformationBox(props) {
    const [informationBoxTextBody, setInformationBoxTextBody] = useState(props.informationBoxTextBody)

    return(
        <div>
            <div className="information-box-wrapper">
                <div className="information-box-text-body">
                    {informationBoxTextBody}
                </div>
            
            </div>

        </div>
    )
}

InformationBox.defaultProps = {
    informationBoxTextBody: "Dersom noen i husholdningen har en nylig, varig endring av sin inntekt må dette dokumenteres"

}

export default InformationBox