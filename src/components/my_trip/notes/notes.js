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
            note: [],
            trips_id: 1
        };

        this.toggleInput = this.toggleInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    async handleInput(value){
        const resp = await axios.post('/api/addnoteitem.php',{
            trips_id: 1,
            entry: value.notes
        });

        if(resp.data.success){
            value.notes = ''
            this.getNoteList()
        } else {
            console.log('Cant not add')
        }
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
        const {trips_id} = this.state;
        const resp = await axios.get(`/api/getnotelist.php?trips_id=${trips_id}`);
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
        const noteList = note.reverse().map((note, index)=>{
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
