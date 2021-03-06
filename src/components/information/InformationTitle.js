import InformationLink from "./InformationLink";
import styles from './InformationTitle.module.css'

function InformationTitle(props) {
    const title = props.title

    const modalTitle = props.modalTitle;
    const modalTextBody = props.modalTextBody;
    const modalButtonText = props.modalButtonText;


    return (
        <div className={styles.box}>
            <h3 className={styles.text}>{title}</h3>
            <InformationLink 
                iconOnly = {true}
                modalTitle = {modalTitle} 
                modalTextBody = {modalTextBody} 
                modalButtonText = {modalButtonText}/>
        </div>
    )
}

export default InformationTitle;