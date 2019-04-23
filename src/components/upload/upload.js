import React, {Component} from 'react';

class Upload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            url: '',
        }
    }

    handleUploadImage(event) {
        event.preventDefault();

        const data = new FormData();

        data.append('file', this.uploadInput.files[0]);
        data.append('filename', this.fileName.value);

        fetch('http://localhost:8888/upload', {
            method: 'POST',
            body: data
        }).then((resp) => {
            resp.json().then((body) => {
                this.setState({
                    url: `http://localhost:8888/${body.file}`
                })
            })
        })
    }

    render () {
        return (
            <div className="upload">
                <h1>File Upload</h1>
            </div>
        )
    }
}

export default Upload;