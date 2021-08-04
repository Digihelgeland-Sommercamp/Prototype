import React, { useState } from 'react';
import CheckBoxField from './CheckBoxField';
import styles from './CheckBoxGroup.module.css';

var isInitialized = false;

/* Creates a list of checkboxes. Creates one box per element in personList
@param personList is a list of json objects in the format {"name": "navn navnesen", "birth": "17.05.1984"}
@param checkboxCallback must be a function that takes a list of bools as an argument. Each element corresponds to
                        the element in personList at the same index.
 */
function CheckBoxGroup(props) {
    const [personList, ] = useState(props.personList);
    const [selectedElements, setSelectedElements] = useState(
        (props.selectedElements && props.selectedElements.length === personList.length) ?
        props.selectedElements : new Array(personList.length).fill(false));

    var checkboxes = [];

    const onClickCheckbox = (isClicked, identifier) => {
        let list = [...selectedElements];
        list[identifier] = isClicked;
        setSelectedElements(list);

        props.checkboxCallback(list);
    }

    
    for(let i=0; i<personList.length; i++) {
        let mellomnavn = personList[i]["navn"]["mellomnavn"] ? personList[i]["navn"]["mellomnavn"]+" " : ""

        checkboxes[i] = <CheckBoxField key={"checkbox"+i} 
        identifier={i} 
        name={personList[i]["navn"]["fornavn"] + " " +mellomnavn + personList[i]["navn"]["etternavn"]} 
        birth={personList[i]["foedsel"]}
        checked={selectedElements[i]} 
        onClickCheckbox={onClickCheckbox} />;
    }

    // if(props.checked && props.checked.length > 0 && (!isInitialized))
    //     findSelectedKids();

    return(
        <div> 
             {checkboxes}
        </div>
    )
}

export default CheckBoxGroup;