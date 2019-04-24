import React, {Component} from 'react';

export default class FileInput extends Component {
    onChange = (event) => {
        this.props.input.onChange(event.target.files[0]);
    }

    render() {
        return(
            <div>
                <input type='file' accept='.jpg, .png, .jpeg' onChange={this.onChange}/>
            </div>
        )
    }
}