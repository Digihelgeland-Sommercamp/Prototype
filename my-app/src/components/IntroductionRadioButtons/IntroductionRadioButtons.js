import React from 'react';
import { FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import InfoButtonText from '../InfoButtonText/InfoButtonText';

export default function IntrodctionRadioButtons(props) {

    const [value, setValue] = React.useState('')

    const handleChange = (event) => {
        setValue(event.target.value);
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

