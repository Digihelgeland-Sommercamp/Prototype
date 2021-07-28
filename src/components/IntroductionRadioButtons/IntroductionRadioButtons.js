import React from 'react';
import { selector, useRecoilState } from 'recoil';

import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import InfoButtonText from '../InfoButtonText/InfoButtonText';

import styles from './IntroductionRadioButtons.module.css'

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
                    <div className={`${styles.radioChoice} ${value===firstValue ? styles.active:''}`}>
                        <FormControlLabel 
                        value={firstValue}
                        control={<Radio color="default" />} 
                        label="Husholdningen har hatt stabil inntekt siden forrige skatteoppgjør." 
                        className={styles.radioButton} />
                        <div className={styles.link}>
                            <InfoButtonText text="Hva menes med stabil inntekt?" />
                        </div>
                        
                    </div>
                    <div className={`${styles.radioChoice} ${value===secondValue ? styles.active:''}`}>
                        <FormControlLabel 
                        value={secondValue}
                        control={<Radio color="default" />}
                        label="Noen i husholdningen har en nylig, varig endring av sin inntekt." 
                        className={styles.radioButton} />
                        <div className={styles.link}>
                            <InfoButtonText text="Hva menes med varig endring?" />
                        </div>
                    </div>
                    
                </RadioGroup>
            </FormControl>
        </div>
    )
}

