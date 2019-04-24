import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';

import NotesForm from './notes_form';
import NoteItem from './note_item';
import './notes.scss';

class Notes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInput: {
                height: 0
            },
            note: [],
        };

        this.toggleInput = this.toggleInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }
    async handleInput(value) {
        console.log(value);

        const data = {
            trips_id: this.props.trips_id,
            entry: value.notes,
            image: value.imageUpload
        };

        const resp = await axios.post('/api/addnoteitem.php', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (resp.data.success) {
            console.log(resp);
            value.notes = ''
            this.getNoteList();
            this.toggleInput();
        } else {
            console.log(resp);
            console.log('Can not add')
        }
    }
    async getNoteList() {
        const { trips_id } = this.props.trips_id;
        const resp = await axios.get(`/api/getnotelist.php?trips_id=${trips_id}`);
        if (resp.data.success) {
            this.setState({
                note: resp.data.notes
            });
        } else {
            console.error(resp.data.error)
        }
    }
    async deleteItem(note){
        const {trips_id} = this.props.trips_id;
        const resp = await axios.put('/api/deletenoteitem.php',{
            trips_id,
            note_id: note.note_id
        })
        if (resp.data.success) {
            this.getNoteList();
        } else {
            console.error('Unable to delete entry');
        }
    }
    toggleInput() {
        const { height } = this.state.showInput;
        if (!height) {
            this.setState(
                {showInput: {height: '160px'}}
            )
        } else {
            this.setState(
                {showInput: {height: 0}}
            )
        }
    }
    componentDidMount() {
        this.getNoteList();
    }
    render() {
        const { note, showInput } = this.state;
        let noteList = null;
        if(note.length > 0){
            noteList = note.map(note => { //need to change index to id
                return (
                    <NoteItem key={note.note_id} note={note} deleteItem={this.deleteItem}/>
                );
            });
        } else {
            noteList = <div className="notes">Add notes to light your trip <i className="far fa-laugh-wink"></i> </div>
        }
        return (
            <div className="notes-page">
                <div className="notes-input-toggle" onClick={this.toggleInput}>Add Note <i className="fas fa-angle-double-down"></i>
                </div>
                <NotesForm notes={this.handleInput} style={showInput} />
                <div className="notes-box">
                    {noteList}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        trips_id: state.trips_id
    }
}

export default connect(mapStateToProps)(Notes);
