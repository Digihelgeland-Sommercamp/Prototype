import { atom } from "recoil";
import { PAGE_POINTER } from "./pagePointer";

export const page = atom({
    key: "page",
    default: PAGE_POINTER.login
  });
  
  export const lastPage = atom({
    key: "lastPage",
    default: 0
  })
  
  export const situation = atom({
    key: "situation",
    default: ""
  })
  
  export const attachmentList = atom({
    key: "attachmentList",
    default: []
  })
  
  export const caseNumberAtom = atom({
    key: 'caseNumber',
    default: ''
  })
  
  export const progressSelector = atom({
    key: 'progress',
    default: 1
  })
  
  export const partnerSelector = atom({
    key: 'partner',
    default: {}
  })
  
  export const overviewOfApplication = atom({
    key: "overviewOfApplication",
    default: {}
  })