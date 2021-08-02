import React from 'react'
<<<<<<< HEAD:src/pages/OverviewApplications/OverviewApplications.js
import { atom, selector, useRecoilState } from 'recoil'
=======
import ProgressBar from '../../components/ProgressBar/ProgressBar'
import { selector, useRecoilState, useRecoilValue } from 'recoil'
>>>>>>> f42b27458330b8231dc418c1ad92384d4490de0e:my-app/src/pages/OverviewApplications/OverviewApplications.js

import { PAGE_POINTER } from '../../pagePointer';

import ApplicationExcerpt from '../../components/ApplicationExcerpt/ApplicationExcerpt'

const overviewOfApplication = atom({
    key: "overviewOfApplication",
    default: {}
  })
  
const page = selector({
    key: "page"
})
const lastPage = selector({
    key: 'lastPage',
});

export default function OverviewApplications() {
    const [, setApplication] = useRecoilState(overviewOfApplication)
    const [currentPage, setPage] = useRecoilState(page)
<<<<<<< HEAD:src/pages/OverviewApplications/OverviewApplications.js
    const [, setLastPage] = useRecoilState(lastPage)
=======
    const [currentLastPage, setLastPage] = useRecoilState(lastPage)
    const applicationData = useRecoilValue(overviewOfApplication)
>>>>>>> f42b27458330b8231dc418c1ad92384d4490de0e:my-app/src/pages/OverviewApplications/OverviewApplications.js

    // TODO: fetch applications for currentUser
    const newApplications = [
        {
            applicationName: "Søknad om redusert foreldrebetaling",
            date: "10.10.10",
            changeOrCheck: true,
            changedDate: "11.10.10",
            status: "Søknad ikke sendt",
            action: "",
            filled: 1,
            firstInfo: [
                {
                    name: "Ola Normann"
                },
                {
                    name: "Thea Normann"
                }
            ],
            secondInfo: [
                {
                    name: "Ola Normann",
                    extraInformation: "Salhus SFO"
                },
                {
                    name: "Thea Normann",
                    extraInformation: "Salhus SFO"
                }
            ]
        }
    ]

    const oldApplications = [{
        applicationName: "Søknad om redusert foreldrebetaling",
        date: "10.10.10",
        changeOrCheck: false,
        changedDate: "11.10.10",
        status: "Vedtak foretatt",
        action: "",
        filled: 3,
        firstInfo: [
            {
                name: "Ola Normann"
            },
            {
                name: "Thea Normann"
            }
        ],
        secondInfo: [
            {
                name: "Ola Normann",
                extraInformation: "Salhus SFO"
            },
            {
                name: "Thea Normann",
                extraInformation: "Salhus SFO"
            }
        ]
    },
    {
        applicationName: "Søknad om redusert foreldrebetaling",
        date: "10.10.10",
        changeOrCheck: false,
        changedDate: "11.10.10",
        status: "Vedtak foretatt",
        action: "",
        filled: 3,
        firstInfo: [
            {
                name: "Ola Normann"
            },
            {
                name: "Thea Normann"
            }
        ],
        secondInfo: [
            {
                name: "Ola Normann",
                extraInformation: "Salhus SFO"
            },
            {
                name: "Thea Normann",
                extraInformation: "Salhus SFO"
            }
        ]
    }
    ]

    const excerptClicked = (arr, index) => {
        setApplication(arr === "new" ? newApplications[index] : oldApplications[index])
        setLastPage(currentPage)
        setPage(PAGE_POINTER.applicationOverview)
    }


    return (
        <div>
            <ProgressBar filled={applicationData.filled}/>
            <h3>Nye</h3>
            {newApplications.map((application, index) => {
                return (
                    <ApplicationExcerpt
                        applicationName={application.applicationName}
                        date={application.date}
                        changeOrCheck={application.changeOrCheck}
                        changedDate={application.changedDate}
                        excerptClicked={() => excerptClicked("new", index)}
                        arr="new"
                        index={index}
                    />
                )
            })}
            <h3>Eldre</h3>
            {oldApplications.map((application, index) => {
                return (
                    <ApplicationExcerpt
                        applicationName={application.applicationName}
                        date={application.date}
                        changeOrCheck={application.changeOrCheck}
                        excerptClicked={() => excerptClicked("old", index)}
                        arr="old"
                        index={index} />)
            })}
        </div>
    )
}
