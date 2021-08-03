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
    const [itemList, setItemList] = useState([]);
    const [, forceUpdate] = useReducer(x => x + 1, 0);
    const [counter, setCounter] = useState(0)


    const handleClick = () => {
        setOpen(! open);
    };

    const deleteFile = (key) => { //gjør dette med for loops
        var temp_list = [];
        for (var i = 0; i < itemList.length; i++) {
            if (itemList[i][1][0] != key) {
                temp_list.push(itemList[i]);
            }
        }
        setItemList(temp_list);
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
        

        //add file to list of items and add file to list display
        const list_of_items = [...itemList];
        const filename = event.target.files[0].name;
        const type = event.target.files[0].type;
        const size = event.target.files[0].size;
        list_of_items.push([event.target.files[0], [counterKey, filename, type, size]]); 
        setItemList(list_of_items);

        clearInputFile(event.target);
    };

    const handleSubmission = () => { //må vurderes om denne logikken skal flyttes opp til en høyere komponent
        const formData = new FormData();

        for (var i = 0; i<itemList.length; i++){
            formData.append('file'+i, itemList[i][0]);
        };
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
        if (itemList.length === 0) {
            console.log(itemList)
            return(
                <p className="no-files-uploaded-text">Ingen filer er lastet opp</p>
            );
        }
        else {
            console.log(itemList);
            const displayDivs = []
            for (var i = 0; i<itemList.length; i++){
                displayDivs.push(<UploadItem key={itemList[i][1][0]} keykey={itemList[i][1][0]} filename={itemList[i][1][1]} type={itemList[i][1][2]} size={itemList[i][1][3]} deleteFile={deleteFile}/>);
            };

            return(
                <div>
                    {displayDivs}
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