import React, {Component} from 'react';
import axios from 'axios';
import NotesForm from './notes_form';
import './notes.scss';
import {formatDate} from '../../../helper';

class Notes extends Component{
    constructor(props){
        super(props);

        this.state = {
            showInput: false,
            note: []
        };

        this.toggleInput = this.toggleInput.bind(this);
    }
    handleInput(value){
        console.log(value)
    }
    toggleInput(){
        const {showInput} = this.state;

        if(showInput){
            this.setState({
                showInput: false
            })
        } else {
            this.setState({
                showInput: true
            })
        }

    }

    async getNoteList(){
        const resp = await axios.get(`/api/getnotelist.php?trips_id=${1}`);
        if(resp.data.success){
            this.setState({
                note: resp.data.data
            });
        } else {
            console.error(resp.data.error)
        }
    }

    componentDidMount(){
        this.getNoteList();
    }

    render(){
        const {note} = this.state;
        const noteList = note.map((note, index)=>{
            return(
                <div key={index} className="notes-item">
                    <p>{formatDate(note.date)}</p>
                    <p>{note.entry}</p>
                </div>
            );
        });

        return(
            <div className="notes-page">
                <div className="notes-input-toggle" onClick={this.toggleInput}>
                    Add Note<i className="fas fa-plus"></i>
                </div>
                <NotesForm notes={this.handleInput} show={this.state.showInput}/>

                <div className="notes-box">
                    <div className="notes">
                        {noteList}
                    </div>
                </div>

            </div>
        )
    }
}

export default Notes;
