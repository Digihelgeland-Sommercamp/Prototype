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

    const deleteFile = (key) => { //gjør dette med for loops
        console.log("deleteFile called");
        console.log(itemList);

        const list_of_items = {}; 
        //const list_of_items = {...itemList};
        const list_of_divs = {...displayDivs};
        console.log("before");
        console.log(Object.entries(list_of_items));
        console.log("after");
        console.log(Object.entries(list_of_items));
        console.log("list_of_divs " + list_of_divs);
        console.log("target key " + key);
        //setItemList(list_of_items);
        //setDisplayDivs(list_of_divs);
    };


    function makeid(length) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    const changeHandler = (event) => {
        //set a selected file
        setSelectedFile(event.target.files[0]);
        const counterKey = makeid(20);
        

        //add file to list of items
        const list_of_items = {...itemList};
        list_of_items[counterKey] = event.target.files[0];
        setItemList(list_of_items);

        //add file to list display
        const list_of_divs = {...displayDivs};
        const filename = event.target.files[0].name;
        const type = event.target.files[0].type;
        const size = event.target.files[0].size;
        list_of_divs[counterKey] = <UploadItem key={counterKey} keykey={counterKey} filename={filename} type={type} size={size} deleteFile={() => deleteFile(counterKey)}/>
        //const new_count = counter + 1;
        //setCounter(new_count);
        console.log("CounterKey: " + counterKey);

        setDisplayDivs(list_of_divs);
        //clearInputFile(event.target);
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
            console.log(Object.values(displayDivs));
            return(
                <div>
                    {Object.values(displayDivs)}
                </div>
            );
        };
    };

    function clearInputFile(f) {
        if (f.value) {
            try{
                f.value = ''
            }catch(err){
            }
        }
    };


    return (
        <div className="upload-area-wrapper">
            <div className="upload-clickable" onClick={routeUpload}>
                <a>Last opp dokumentasjon</a>
            </div>
            <div className="uploaded-files-area">
                <p className="uploaded-files-title">Opplastede filer</p>
                <input id="inputSelectFile" hidden type="file" name="file" onChange={changeHandler} />
                <div className="list-wrapper">
                    <ListRender /> 
                </div>
            </div>
            
        </div>
    );
}

export default UploadArea;