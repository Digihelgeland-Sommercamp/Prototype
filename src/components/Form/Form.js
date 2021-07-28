import { TextField } from '@material-ui/core'
import React, { useState } from 'react'

export default function Form(props) {
    const [form, setForm] = useState({})

    const handleFieldChange = (id, value) => {
        let newForm = form
        newForm[id] = value
        setForm(newForm)
        props.handleFormChange(form)
        console.log(form);
    }

    return (
        <div>
            <form noValidate autoComplete="off">
                {
                    props.fields.map((field, _) => {
                        return <TextField 
                            style={{ margin: "5px" }}
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
