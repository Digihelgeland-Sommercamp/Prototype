import styles from './AddChildren.module.css'

function AddChildren(props) {
    

    return(
        <div>
            <div className={styles.info}>{props.info}</div>
            <div className={styles.link} onClick={props.callback}>{props.link}</div>
        </div>
    );
}

AddChildren.defaultProps = {
    info: "Ser du ikke barnet ditt i listen?",
    link: "+ Legg til barn"
}

export default AddChildren;