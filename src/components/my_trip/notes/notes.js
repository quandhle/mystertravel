import React, {Component} from 'react';
import axios from 'axios';
import NotesForm from './notes_form';
import './notes.scss';
import {formatDate} from '../../../helper';

class Notes extends Component{
    constructor(props){
        super(props);

        this.state = {
            showInput: {
                height: 0
            },
            note: [],
            trips_id: 1
        }

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
        const {height} = this.state.showInput;

        if(!height){
            this.setState({
                showInput: {
                    height: '100px'
                }
            })
        } else {
            this.setState({
                showInput: {
                    height: 0
                }
            })
        }

    }
    async getNoteList(){
        const {trips_id} = this.state;
        const resp = await axios.get(`/api/getnotelist.php?trips_id=${trips_id}`);
        if(resp.data.success){
            this.setState({
                note: resp.data.data.reverse()
            });
        } else {
            console.error(resp.data.error)
        }
    }

    componentDidMount(){
        this.getNoteList();
    }
    render(){
        const {note, showInput} = this.state;
        const noteList = note.map((note, index)=>{
            return(
                <div key={index} className="notes">
                    <p>{formatDate(note.date)}</p>
                    <p>{note.entry}</p>
                </div>
            );
        });

        return(
            <div className="notes-page">
                <div className="notes-input-toggle" onClick={this.toggleInput}>Add Note <i className="fas fa-angle-double-down"></i>
                </div>
                <NotesForm notes={this.handleInput} style={showInput}/>
                <div className="notes-box">
                    {noteList}
                </div>
            </div>
        )
    }
}

export default Notes;
