import React, { useEffect, useState } from 'react';



const UploadForm = () => {

    const [file, setFile] = useState(null)
    const [error, setError] = useState(null)

    const types = ['image/png', 'image/jpeg', 'image/jpg']


    const handleChange = (e) => {
        let selected = e.target.files[0] // gets the first file that the user uploads

        if (selected && types.includes(selected.type)) {
            setFile(selected) // stores the file in a local state
            setError('')
        } else {
            setFile(null)
            setError("Please select an image file(png or jpeg)")
        }
    }

    return (
        <form>
            <input type="file" onChange={handleChange} />
            <div className="output">
                {error && <div className="error">{error} </div>}
                {file && <div className="file">{file.name} </div>}
            </div>
        </form>
    )
};

export default UploadForm;
