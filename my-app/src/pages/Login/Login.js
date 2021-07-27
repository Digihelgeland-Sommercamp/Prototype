import { selector, useRecoilState } from 'recoil';

import styles from './Login.module.css'

const page = selector({
  key: 'page', 
});

const lastPage = selector({
  key: 'lastPage', 
});

function Login() {
  const [state, setState] = useRecoilState(page);
  const [, setLastPage] = useRecoilState(lastPage)
  return (
    <div className={styles.container}>
      <button className={styles.login} onClick={() => {
        setLastPage(state)
        setState(1)
      }}>Til søknad</button>
    </div>
  );
}

export default Login;