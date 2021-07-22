import React, { useState } from 'react';
import RadioButtonQuestion from './RadioButtonQuestion';

function IntrodctionRadioButtons() {
    const [chosenButton, setChosenButton] = useState(0)  
    
    let firstButton = 1
    let secondButton = 2  

    let key1 = 0
    let key2 = 0
    
    const handler = value => {
        key1 = value == 1 ? 1 : 0
        key2 = value == 1 ? 1 : 0
    }
    
    return(
        <div>
            <RadioButtonQuestion
                id={firstButton}
                key={key1}
                context="Husholdningen har hatt stabil inntekt siden forrige skatteoppgjør."
                info="Hva menes med stabil inntekt?"
                onClick={handler}

            />
            <RadioButtonQuestion
                id={secondButton}
                key={key2}
                context="Noen i husholdningen har en nylig, varig endring av sin inntekt."
                info="Hva menes med varig endring?"
                onClick={handler}
            />
        </div>

    )
}

export default IntrodctionRadioButtons