import { TextField } from '@material-ui/core'
import React, { useState } from 'react'

export default function Form(props) {
    const [form, setForm] = useState({})

    const handleFieldChange = (id, value) => {
        let newForm = form
        newForm[id] = value
        setForm(newForm)
        props.handleFormChange(form)
    }

    return (
        <div>
            <form noValidate autoComplete="off" style={{padding: "5px"}}>
                {
                    props.fields.map((field, _) => {
                        return <TextField 
                            fullWidth
                            id={field.id}
                            label={field.label} 
                            onChange={(e)=>handleFieldChange(field.id, e.target.value)}/>
                    })
                }
            </form>
        </div>
    )
}
