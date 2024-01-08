import React, { useEffect, useState } from 'react'

function FileUpload() {

    const [file, setFile] = useState("");
    const [allFile, setAllFile] = useState([]);

    function covertToBase64(e) {
        console.log(e);
        var reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = () => {
            console.log(reader.result); //base64encoded string  
            setFile(reader.result);
        };
        reader.onerror = error => {
            console.log("Error: ", error);
        };
    }
    useEffect(()=>{
        getFile()
    },[])

    function uploadFile() {
        fetch("http://localhost:5000/upload-file", {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                base64: file
            })
        }).then((res) => res.json()).then((data) => console.log(data))
    }
    function getFile() {
        fetch("http://localhost:5000/get-file", {
            method: "GET",
        }).then((res) => res.json()).then((data) => {
            console.log(data)
            setAllFile(data.data)
        })
    }
    return (
        <div className="auth-wrapper" >
            <div className="auth-inner" style={{ width: "auto" }}>
                Let's Upload File<br />
                <input
                    accept="file/*"
                    type="file"
                    onChange={covertToBase64}
                />
                {file == "" || file == null ? "" : <img width={100} height={100} src={file} />}
                <button onClick={uploadFile}>Upload</button>
<br/>
                {allFile.map(data=>{
                    return(
                        <img width={100} height={100} src={data.file} />
                        
                    )
                })}

            </div>

        </div>
    )
}

export default FileUpload;