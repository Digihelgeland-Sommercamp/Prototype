import React from 'react'

import { Button } from '@material-ui/core'

//import styles from './BackButton.module.css'
import { selector, useRecoilState, useRecoilValue } from 'recoil'

const lastPage = selector({
    key: 'lastPage',
});
const page = selector({
    key: 'page'
})

export default function BackButton() {
    const currentLastPage = useRecoilValue(lastPage)
    const [, setPage] = useRecoilState(page)

    return (
        <Button onClick={() => setPage(currentLastPage)}>
            Tilbake
        </Button>
    )
}
