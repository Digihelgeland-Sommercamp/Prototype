
import styles from './InformationModal.module.css';

function InformationModal(props) {
    const title = props.title
    const textBody = props.textBody
    const buttonText = props.buttonText
    const list = props.list

    const modal = () => {
        return(
            <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h3 className={styles.title}>
                    {title}
                </h3>
                <div className={styles.text}>
                    {textBody && textBody.split('\\n').map((item, i) => {
                        return <p className={styles.bodyItem} key={i}>{item}</p>
                    })}
                    {list && 
                        <ul>
                            {list.map((item, _)=>{
                                return <li style={{marginLeft:"20px"}}>{item}</li>
                            })}                    
                        </ul>
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