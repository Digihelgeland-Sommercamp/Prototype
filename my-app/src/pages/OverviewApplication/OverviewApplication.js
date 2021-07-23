import React from 'react'

import './OverviewApplication.css'

export default function OverviewApplication(props) {
    return (
        <div>
            <h1>{props.title}</h1>
            <h1>{props.status}</h1>
            <a>{props.action}</a>
            <div>progressbar</div>
            <div>title with children</div>
            <div>title with children</div>
        </div>
    )
}
