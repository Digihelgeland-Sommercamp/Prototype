import { useState } from "react";
import Edit from "../../components/Edit/Edit";
import styles from './ReviewApplication.module.css'

import { selector, useRecoilState } from 'recoil';

import { PAGE_POINTER } from '../../pagePointer.js';
const page = selector({
    key: 'page', 
  });
  
  const lastPage = selector({
    key: 'lastPage', 
  });

function ReviewApplication(props) {

    const [state, setState] = useRecoilState(page);
    const [, setLastPage] = useRecoilState(lastPage)

    return(
        <div>
            <Edit callback={()=>setState(PAGE_POINTER.household)}/>
        </div>
    );
}

export default ReviewApplication;