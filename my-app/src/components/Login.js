import {
    RecoilRoot,
    atom,
    selector,
    useRecoilState,
    useRecoilValue,
  } from 'recoil';
  
  
  const page = selector({
    key: 'page', // unique ID (with respect to other atoms/selectors)
  });
  
  function Login() {
      const [state, setState] = useRecoilState(page);
    return (
      <div className="Login">
        <button onClick={() => setState(1)}>Til søknad</button>
      </div>
    );
  }
  
  export default Login;