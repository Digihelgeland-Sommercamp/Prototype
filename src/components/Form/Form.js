import { Input, TextField } from '@material-ui/core'
import React, { useState } from 'react'

export default function Form(props) {
    const [form, setForm] = useState({
        "fornavn": "",
        "etternavn": "",
        "personidentifikator": ""
    })


    const formFields = [
        {
            id: "fornavn",
            label: "Fornavn"
        },
        {
            id: "etternavn",
            label: "Etternavn"
        },
        {
            id: "personidentifikator",
            label: "Fødselsnummer / D-nummer"
        }
    ]

    const handleFieldChange = (id, value) => {
        let newForm = form
        newForm[id] = value
        setForm(newForm)

        let error = false
        
        if(form["fornavn"] === "") {
            error = true
        }
        else if (form["etternavn"] === ""){
            error = true
        }
        else if (checkPersonId(form["personidentifikator"])){
            error = true
        }
        
        props.handleFormChange(form, error)
    }

    function checkPersonId(personid) {
        let flag = true

        if (isNaN(personid)) {
            flag = false
        }
        else if (personid.length === 11){
            flag = false
        }
        return flag
    }

    return (
        <div>
            <form noValidate autoComplete="off" style={{padding: "5px"}}>
                {
                    formFields.map((field, _) => {
                        return <TextField 
                            fullWidth
                            id={field.id}
                            label={field.label}
                            margin="normal"
                            onChange={(e)=>handleFieldChange(field.id, e.target.value)}/>
                    })
                }
            </form>
        </div>
    )
}
