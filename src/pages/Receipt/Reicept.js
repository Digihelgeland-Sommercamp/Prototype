import React from "react";
import NextButton from "../../components/NextButton/NextButton";
import styles from "./Receipt.module.css";
import { selector, useRecoilState } from 'recoil';
import { PAGE_POINTER } from "../../pagePointer";

const page = selector({
    key: 'page', 
  });
  
  const lastPage = selector({
    key: 'lastPage', 
  });

function Receipt() {
    // TODO add callbacks for the two buttons
    const [currentPage, setCurrentPage] = useRecoilState(page);
    const [, setLastPage] = useRecoilState(lastPage)

    const goToPortal = () => {
        setLastPage(currentPage);
        setCurrentPage(PAGE_POINTER.portal);
    }

    const logout = () => {
        setLastPage(currentPage);
        setCurrentPage(PAGE_POINTER.login);
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                {/* <div style={{ marginTop: "70px" }}></div> */}
                <h1 className={styles.title}>
                    Kvittering på søknad om redusert foreldrebetaling og gratis kjernetid
                </h1>
                <div className={styles.textContainer}>
                    <p className={styles.text}>
                        Brønnøy kommune bekrefter mottatt søknad 29/07/2021 kl. 18:45.
                        Referansenummer ABC123
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
