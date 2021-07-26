import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import InfoButtonText from '../InfoButtonText/InfoButtonText';
import { selector, useRecoilState } from 'recoil';


const situation = selector({
    key: 'situation', 
});

export default function IntrodctionRadioButtons(props) {
    const [currentSituaton, setSituation] = useRecoilState(situation)

    const [value, setValue] = React.useState('')

    const handleChange = (event) => {
        setValue(event.target.value);
        setSituation(event.target.value)
        props.onChange()
        
    }

    const firstValue = "stable-income"
    const secondValue = "low-income"

    return (
        <div className="radioButtons">
            <FormControl component="fieldset">
                <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
                    <FormControlLabel 
                        value={firstValue}
                        control={<Radio color="default" />} 
                        label="Husholdningen har hatt stabil inntekt siden forrige skatteoppgjør." 
                        className={
                            value == firstValue ? 'radioButton active' : 'radioButton'
                        } />
                    <InfoButtonText text="Hva menes med stabil inntekt?" />
                    <FormControlLabel 
                        value={secondValue}
                        control={<Radio color="default" />}
                        label="Noen i husholdningen har en nylig, varig endring av sin inntekt." 
                        className={
                            value == secondValue ? 'radioButton active' : 'radioButton'
                        } />
                    <InfoButtonText text="Hva menes med varig endring?" />
                </RadioGroup>
            </FormControl>
        </div>
    )
}

