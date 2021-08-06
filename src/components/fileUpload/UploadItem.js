import "./UploadItem.css";

function UploadItem(props) {
    const filename = props.filename
    const type = props.type
    const size = props.size
    const keykey = props.keykey

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
    
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    
        const i = Math.floor(Math.log(bytes) / Math.log(k));
    
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    };

    function formatName(name) {
        if (name.length >= 16) {
            return name.slice(0,15) + " ...";
        }
        else {
            return name
        }
    };

    function formatType(type) {
        return type.split("/")[1].toUpperCase()
    };

    function delFile() {
        props.deleteFile(keykey);
    };



    return(
        <div className="item-wrapper">
            <div className="file-type-box" >{formatType(type)}</div>
            <div className="file-name-box">{formatName(filename)}</div>
            <div className="file-size-box">{formatBytes(size)}</div>
            <div className="file-remove-box">
                <button className="file-remove-button" onClick={delFile}>
                    Fjern
                </button>
            </div>
        </div>
    );
}

export default UploadItem;