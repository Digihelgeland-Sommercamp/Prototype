import React from 'react'

import { Button } from '@material-ui/core'

//import styles from './BackButton.module.css'
import { useRecoilState, useRecoilValue } from 'recoil'
import { lastPage, page } from '../../atoms'

export default function BackButton() {
    const currentLastPage = useRecoilValue(lastPage)
    const [, setPage] = useRecoilState(page)

    return (
        <Button onClick={() => setPage(currentLastPage)}>
            Tilbake
        </Button>
    )
}
