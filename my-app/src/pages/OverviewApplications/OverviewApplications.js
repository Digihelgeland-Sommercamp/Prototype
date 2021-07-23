import React from 'react'

import ApplicationExcerpt from '../../components/ApplicationExcerpt/ApplicationExcerpt'



export default function OverviewApplications() {
    return (
        <div>
            <h3>Nye</h3>
            <ApplicationExcerpt 
                applicationName="Søknad om redusert foreldrebetaling"
                date="10.10.10"
                changeOrCheck={true}
                changedDate="11.10.10"/>
            <h3>Eldre</h3>
            <ApplicationExcerpt 
                applicationName="Søknad om redusert foreldrebetaling"
                date="10.10.10"
                changeOrCheck={false}/>
            <ApplicationExcerpt 
                applicationName="Søknad om redusert foreldrebetaling"
                date="10.10.10"
                changeOrCheck={false}/>
        </div>
    )
}
