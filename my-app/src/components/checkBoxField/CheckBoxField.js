import React, { useState } from 'react';
import styles from './CheckBoxField.module.css'
import { Checkbox } from '@material-ui/core';
import { sizing } from '@material-ui/system';

function CheckBoxField(props) {
    const [isClicked, setIsClicked] = useState(false);
    const [identifier, ] = useState(props.identifier)

    const onSelect = (event) => {
        setIsClicked(!isClicked);
        // props.onClickCheckbox(isClicked);
    }

    return(
        <div className={styles.container}>
            <div className={isClicked ? styles.boxSelected : styles.box} onClick={onSelect}>
                <div className={styles.selectIndicatorWrapper}>
                    <Checkbox checked={isClicked} size='medium' color="default" />
                </div>
                <div className={styles.textWrapper}>
                    <div className={styles.text}>Navn Navnesen</div>
                    <div className={styles.text}>f. 01.03.96</div>
                </div>
            </div>
        </div>
    );
}

export default CheckBoxField;