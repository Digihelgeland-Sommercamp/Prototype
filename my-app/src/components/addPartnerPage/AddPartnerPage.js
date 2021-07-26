import React, { useState } from 'react';
import './AddPartnerPage.css'
import RadioBox from './RadioBox';
import { useReducer } from 'react';

//TODO Move all values into a radiobox group component
function AddPartnerPage(props) {

    
    const [selectedList, setSelectedList] = useState([false, false, false, false]);
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    const onClickRadioButton = (value) => {
        let list = selectedList;
        
        //TODO Loop through list, set all values false

        list[value] = true;
        console.log(list)
        setSelectedList(list)
        console.log(selectedList)
        forceUpdate();
    }
    
    var buttons = [
        <RadioBox onClickRadioButton={onClickRadioButton} radioText = {"teste"} selected={selectedList[0]} identifier={0}/>,
        <RadioBox onClickRadioButton={onClickRadioButton} radioText = {"testing1"} selected={selectedList[1]} identifier={1}/>,
        <RadioBox onClickRadioButton={onClickRadioButton} radioText = {"test2"} selected={selectedList[2]} identifier={2}/>,
        <RadioBox onClickRadioButton={onClickRadioButton} radioText = {"test3"} selected={selectedList[3]} identifier={3}/>
        ]


    return (
        <div>
            {buttons}
        </div>
    );
}

export default AddPartnerPage;