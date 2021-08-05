import { useState } from "react";
import styles from './InformationModal.module.css';

function InformationModal(props) {
    const [title,] = useState(props.title);
    const [textBody,] = useState(props.textBody);
    const [buttonText,] = useState(props.buttonText)

    console.log(textBody)

    const modal = () => {
        return(
            <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h3 className={styles.title}>
                    {title}
                </h3>
                <div className={styles.text}>
                    {textBody.split('\\n').map((item, i) => {
                        return <p className={styles.bodyItem} key={i}>{item}</p>
                    })
                    }
                </div>
                <button className={styles.closeButton} onClick={props.toggleVisible}>{buttonText}</button>
            </div>
        </div>
        );
    }

    return(
        props.shouldBeVisible ? modal() : <div></div> 
    );

}

InformationModal.defaultProps = {
    title: "Informasjonsside",
    buttonText: "OK"
}

export default InformationModal;