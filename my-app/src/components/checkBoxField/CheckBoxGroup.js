import React, { useState } from 'react';
import CheckBoxField from './CheckBoxField';
import styles from './CheckBoxGroup.module.css';

function CheckBoxGroup(props) {
    const [personList, ] = useState(props.personList);
    const [selectedElements, setSelectedElements] = useState(new Array(personList.length).fill(false));

    var checkboxes = [];

    const onClickCheckbox = (isClicked, identifier) => {
        // TODO: Add a list of bools that represent which of the elements are true
        // TODO: Add callback method that sends list to parent each time
        console.log(isClicked, identifier);
    }

    for(let i=0; i<personList.length; i++) {
        checkboxes[i] = <CheckBoxField identifier={i} name={personList[i]["name"]} birth={personList[i]["birth"]} onClickCheckbox={onClickCheckbox} />
    }

    return(
        <div> 
             {checkboxes}
        </div>
    )
}

export default CheckBoxGroup;