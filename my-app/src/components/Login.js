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

const lastPage = selector({
  key: 'lastPage', // unique ID (with respect to other atoms/selectors)
});

function Login() {
  const [state, setState] = useRecoilState(page);
  const [currentLastPage, setLastPage] = useRecoilState(lastPage)
  return (
    <div className="Login">
      <button onClick={() => {
        setLastPage(state)
        setState(1)
      }}
      >Til søknad</button>
    </div>
  );
}

export default Login;