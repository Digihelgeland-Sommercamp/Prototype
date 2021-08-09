import React from 'react';
import { selector, useRecoilState } from 'recoil';

import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'

import styles from './IntroductionRadioButtons.module.css'
import InformationLink from '../information/InformationLink';

const situation = selector({
    key: 'situation', 
});

export default function IntrodctionRadioButtons(props) {
    const [, setSituation] = useRecoilState(situation)

    const [value, setValue] = React.useState('')

    const handleChange = (event) => {
        setValue(event.target.value);
        setSituation(event.target.value)
        props.onChange()
        
    }

    const firstValue = "stable-income"
    const secondValue = "low-income"

    return (
        <div className={styles.radioButtons}>
            <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <div className={`${styles.radioChoice} ${value===firstValue ? styles.active :''}`}>
                        <FormControlLabel 
                            value={firstValue}
                            control={<Radio color="default" />} 
                            label="Husholdningen har hatt stabil inntekt siden forrige skatteoppgjør." 
                            className={styles.radioButton} />
                        <div className={styles.link}>
                            <InformationLink 
                                linkText="Hva menes med stabil inntekt?"
                                modalTitle="Stabil inntekt"
                                modalTextBody="Husholdningens samlede inntekt har ikke eller i svært liten grad endret seg siden siste skattemelding/-oppgjør. "
                                modalButtoText="OK"/>
                        </div>
                        
                    </div>
                    <div className={`${styles.radioChoice} ${value===secondValue ? styles.active :''}`}>
                        <FormControlLabel 
                            value={secondValue}
                            control={<Radio color="default" />}
                            label="Husholdningen har en varig endring i sin inntekt." 
                            className={styles.radioButton} />
                        <div className={styles.link}>
                            <InformationLink 
                                    linkText="Hva menes med varig endring?"
                                    modalTitle="Varig nedgang"
                                    modalTextBody="Husholdningens samlede inntekt har gått ned slik at siste skattemelding/-oppgjør ikke samsvarer med husholdningens nåværende inntekt. 
                                        \n\nUlike årsaker kan for eksempel være dødsfall, samlivsbrudd eller tap av arbeidsinntekt."
                                    modalButtoText="OK"/>
                        </div>
                    </div>
                    
                </RadioGroup>
            </FormControl>
        </div>
    )
}

