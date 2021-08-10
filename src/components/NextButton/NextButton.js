import React from 'react';
import styles from './NextButton.module.css';

function NextButton(props) {

    const handleCallback = () => {
        if(props.isClickable)
        {
            props.callback();
        }
    }

    return(
        <button disabled={!props.isClickable} className={styles.btn} onClick={handleCallback}>
            {props.text}
        </button>
    );
}

NextButton.defaultProps = {
    isClickable: false,
    text: "Neste"
}

export default NextButton;