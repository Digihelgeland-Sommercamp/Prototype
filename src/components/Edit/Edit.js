
import styles from './Edit.module.css'
import EditIcon from '@material-ui/icons/Edit';


function Edit(props) {

    return(
        <div className={styles.container}>
            <EditIcon fontSize="small" onClick={props.callback}/>
            <p className={styles.text} onClick={props.callback}>Endre</p>
        </div>
    );
}

export default Edit;