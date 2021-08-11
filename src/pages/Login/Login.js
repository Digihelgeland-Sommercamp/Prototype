import { useRecoilState } from 'recoil';
import { lastPage, page } from '../../atoms.js';
import NextButton from '../../components/NextButton/NextButton.js';

import { PAGE_POINTER } from '../../pagePointer.js';

import styles from './Login.module.css'

function Login() {
  const [state, setState] = useRecoilState(page);
  const [, setLastPage] = useRecoilState(lastPage)
  return (
    <div className={styles.container}>
      <NextButton 
          isClickable
          text="Til søknad"
          callback={() => {
            setLastPage(state)
            setState(PAGE_POINTER.portal)
          }}/>
    </div>
  );
}

export default Login;