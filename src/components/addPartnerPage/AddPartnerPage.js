import React, { useState } from 'react';
import './AddPartnerPage.css'
import RadioBox from '../radioBox/RadioBoxGroup';
import { useReducer } from 'react';
import RadioBoxGroup from '../radioBox/RadioBoxGroup';
import CheckBoxField from '../checkBoxField/CheckBoxField';

const radioTextList = [
    "test1",
    "test2",
    "test3",
    "test4",
    "test5"
]

function AddPartnerPage(props) {
    const [selectedRadioBoxId, setSelectedRadioBoxId] = useState(-1)

    const radioGroupCallback = (value)=>{
        setSelectedRadioBoxId(value);
    }


    return (
        <div>
            <RadioBoxGroup radioGroupCallback={radioGroupCallback} radioTextList={radioTextList}/>
            {/* <CheckBoxField /> */}
        </div>
    );
}

export default AddPartnerPage;