import React, { useState } from 'react';
import RadioBox from './RadioBox';
import { useReducer } from 'react';

/* Creates a list of clickable boxes with radio buttons. 
* @param props.radioTextList an array containing the text field of every box. Created one box per element. 
* @param props.radioGroupCallback the callback function for when a radio box is clicked. Using the ID of the 
                                  radio box as argument. The ID corresponds to the elements in radioTextList*/
function RadioBoxGroup(props) {

    const [radioTextList, ] = useState(props.radioTextList)
    const [selectedList, setSelectedList] = useState(new Array(radioTextList.length).fill(false));
    const [, forceUpdate] = useReducer(x => x + 1, 0);

    // Set all radio buttons but the newly pressed unchecked and force a rerender
    const onClickRadioButton = (value) => {
        let list = new Array(selectedList.length).fill(false);
        
        list[value] = true;
        setSelectedList(list)
        
        props.radioGroupCallback(value);
        forceUpdate();
    }
    
    var buttons = []

    // Populate a list with one radio button per entry in radioTextList
    for(let i = 0; i<radioTextList.length; i++) {
        buttons.push(<RadioBox key={"radiobox"+i}
            onClickRadioButton={onClickRadioButton} 
            radioText={radioTextList[i]} 
            selected={selectedList[i]}
            identifier={i} />)
    }

    return (
        <div>
            {buttons}
        </div>
    );
}

export default RadioBoxGroup;