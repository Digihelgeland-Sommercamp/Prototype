import React from 'react'
import { atom, selector, useRecoilState } from 'recoil'

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
    const [, setLastPage] = useRecoilState(lastPage)

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
        setPage(5)
    }


    return (
        <div>
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
