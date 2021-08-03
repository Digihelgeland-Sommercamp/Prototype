import React, { useState } from 'react';
import styles from './NextButton.module.css';

function NextButton(props) {

    const handleCallback = () => {
        if(props.isClickable)
        {
            props.callback();
        }
    }

    return(
        <>
        <button className={props.isClickable ?  styles.btn : styles.btnUnclickable} onClick={handleCallback}>
            {props.text}
        </button>
        </>
    );
}

NextButton.defaultProps = {
    isClickable: false,
    text: "Neste"
}

export default NextButton;