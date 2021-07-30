import './UploadArea.css';
import axios from 'axios';
import React, { useState, useReducer } from 'react';
import { Button, createGenerateClassName } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import UploadItem from './UploadItem';

function UploadArea() {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState();
    const [itemList, setItemList] = useState({});
    const [displayDivs, setDisplayDivs] = useState({});
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [counter, setCounter] = useState(0)


    const handleClick = () => {
        setOpen(! open);
    };

    const deleteFile = (key) => {
        const list_of_items = {...itemList};
        const list_of_divs = {...displayDivs};
        delete list_of_items[key];
        console.log("list_of_items" + list_of_items);
        console.log("target " + key);
        delete list_of_divs[key];
        console.log("list_of_divs" + list_of_divs);
        console.log("target key " + key);
        setItemList(list_of_items);
        setDisplayDivs(list_of_divs);
    };

    const changeHandler = (event) => {
        //set a selected file
        setSelectedFile(event.target.files[0]);
        const counterKey = counter.toString();
        

        //add file to list of items
        const list_of_items = {...itemList};
        list_of_items[counterKey] = event.target.files[0];
        setItemList(list_of_items);

        //add file to list display
        const list_of_divs = {...displayDivs};
        const filename = event.target.files[0].name;
        const type = event.target.files[0].type;
        const size = event.target.files[0].size;
        list_of_divs[counterKey] = <UploadItem key={counterKey} keykey={counterKey} filename={filename} type={type} size={size} deleteFile={deleteFile}/>
        const new_count = counter + 1;
        setCounter(new_count);
        console.log("new counter: " + counter);

        setDisplayDivs(list_of_divs);
    };

    const handleSubmission = () => { //må vurderes om denne logikken skal flyttes opp til en høyere komponent
        const formData = new FormData();
        for (const [key, value] of Object.entries(itemList)){
            formData.append('file'+key, value)
        }
        axios({
            method: "post",
            url: "http://51.107.208.107/add_attachment",
            data: formData,
            headers: {"Content-Type": "multipart/form-data"}
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (response) {
            console.log(response)
        });//response inneholder vedleggenes id og filtype i azure storage containeren
    };

    const routeUpload = () => {
        document.getElementById("inputSelectFile").click();
    };

    function ListRender() {
        if (Object.keys(itemList).length === 0) {
            console.log(displayDivs)
            return(
                <p className="no-files-uploaded-text">Ingen filer er lastet opp</p>
            );
        }
        else {
            console.log(Object.values(displayDivs))
            return(
                <div>
                    {Object.values(displayDivs)}
                </div>
            );
        };
    };


    return (
        <div className="upload-area-wrapper">
            <div className="upload-clickable" onClick={routeUpload}>
                <a>Last opp dokumentasjon</a>
            </div>
            <div className="uploaded-files-area">
                <p className="uploaded-files-title">Opplastede filer</p>
                <div className="list-wrapper">
                    <ListRender /> 
                </div>
            </div>
            <input id="inputSelectFile" type="file" name="file" onChange={changeHandler} />
        </div>
    );
}

export default UploadArea;