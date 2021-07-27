import React, { useState } from 'react';
import './AddPartnerPage.css'
import RadioBox from '../radioBox/RadioBoxGroup';
import { useReducer } from 'react';
import RadioBoxGroup from '../radioBox/RadioBoxGroup';
import CheckBoxField from '../checkBoxField/CheckBoxField';
import CheckBoxGroup from '../checkBoxField/CheckBoxGroup';

const radioTextList = [
    "test1",
    "test2",
    "test3",
    "test4",
    "test5"
]

const checkboxTextList = [{
    name: "Navn Navnesen",
    birth: "01.03.1996"
},
{
    name: "Kari Navnesen",
    birth: "02.03.1998"
}
]

function AddPartnerPage(props) {
    const [selectedRadioBoxId, setSelectedRadioBoxId] = useState(-1)

    const radioGroupCallback = (value)=>{
        setSelectedRadioBoxId(value);
    }

    

    return (
        <div>
            {/* <RadioBoxGroup radioGroupCallback={radioGroupCallback} radioTextList={radioTextList}/> */}
            {/* <CheckBoxField /> */}
            <CheckBoxGroup personList={checkboxTextList}/>
        </div>
    );
}

export default AddPartnerPage;