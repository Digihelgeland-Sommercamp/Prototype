import React, { useState } from 'react';
import styles from './CheckBoxField.module.css'
import { Checkbox } from '@material-ui/core';

function CheckBoxField(props) {
    const [isClicked, setIsClicked] = useState(props.checked ? true : false);
    const identifier = props.identifier

    const [name, ] = useState(props.name)
    const [birth, ] = useState(props.birth)

    const onSelect = () => {
        const clicker = !isClicked;

        setIsClicked(clicker);

        props.onClickCheckbox(clicker, identifier);
    }

    return(
        <div className={styles.container}>
            <div className={isClicked ? styles.boxSelected : styles.box} onClick={onSelect}>
                <div className={styles.selectIndicatorWrapper}>
                    <Checkbox checked={isClicked} size='medium' color="default" />
                </div>
                <div className={styles.textWrapper}>
                    <div className={styles.text}>{name}</div>
                    <div className={styles.text}>f. {birth}</div>
                </div>
            </div>
        </div>
    );
}

export default CheckBoxField;