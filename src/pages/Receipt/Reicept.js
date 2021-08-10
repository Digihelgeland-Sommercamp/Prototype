import React from "react";
import NextButton from "../../components/NextButton/NextButton";
import styles from "./Receipt.module.css";
import { selector, useRecoilState, useRecoilValue } from 'recoil';
import { PAGE_POINTER } from "../../pagePointer";

const page = selector({
    key: 'page', 
});

const lastPage = selector({
    key: 'lastPage', 
});

const caseNumberSelector = selector({
    key:'caseNumber'
})


function Receipt() {
    // TODO add callbacks for the two buttons
    const [currentPage, setCurrentPage] = useRecoilState(page);
    const [, setLastPage] = useRecoilState(lastPage)
    const caseNumber = useRecoilValue(caseNumberSelector)

    const goToPortal = () => {
        setLastPage(currentPage);
        setCurrentPage(PAGE_POINTER.portal);
    }

    const logout = () => {
        setLastPage(currentPage);
        setCurrentPage(PAGE_POINTER.login);
    }

    const today = new Date()
    const date =  formatLessThan10(today.getDate()) + '/' + formatLessThan10(today.getMonth()) + '/' + today.getFullYear()
    const time =  formatLessThan10(today.getHours()) + ':' +  formatLessThan10(today.getMinutes())
    const strDateTime = 'kl. '+ time + ' ' + date

    function formatLessThan10(toBeFormatted) {
        return toBeFormatted < 10 ? '0'+toBeFormatted : toBeFormatted
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>
                    Kvittering på søknad om redusert foreldrebetaling og gratis kjernetid
                </h1>
                <div className={styles.textContainer}>
                    <p className={styles.text}>
                        Brønnøy kommune bekrefter mottatt søknad {strDateTime} <br/> Referansenummer {caseNumber}
                    </p>

                    <p className={styles.text}>
                        Hvis du har spørsmål eller kommentarer kan du kontakte oss på denne
                        nettsiden, på tlf 12 34 56 78 eller e-post til e-post@kommune.no
                    </p>
                </div>
                <div className={styles.btnContainer}>
                    <NextButton isClickable={true} text={"Gå til søknadsoversikt"} callback={goToPortal}/>
                    <p className={styles.logout} onClick={logout}>Logg ut</p> 
                </div>
            </div>
        </div>
    );
}

export default Receipt;
