import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import NotesForm from './notes_form';
import NoteItem from './note_item';
import Map from '../../map';
import './notes.scss';
import SpinnerModal from '../../general/spinnerModal';
import {signIn} from '../../../actions';

class Notes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showInput: {
                height: 0
            },
            note: [],
            spinner: false
        };

        this.getNoteList = this.getNoteList.bind(this);
        this.toggleInput = this.toggleInput.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    async handleInput(value) {
        this.setState({
            spinner: true
        })

        const {trips_id} = this.props;
        const {notes, imageUpload: image} = value;

        const data = new FormData();
        data.append('trips_id', trips_id);
        data.append('entry', notes);
        data.append('image', image);
        data.append('token', localStorage.getItem('token'));

        const resp = await axios.post('/api/addnoteitem.php', data, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        console.log(resp.data)
        if (resp.data.success) {
            value.notes = '';
            value.imageUpload = null;
            document.getElementById('notes-file-input').value = null;
            this.getNoteList();
            this.toggleInput();
            setTimeout(() => {
                this.setState({spinner: false});
            }, 350);
        } else {
            console.error(resp.data.error);
        }
    }

    async getNoteList() {
        // const { trips_id } = this.props.trips_id;?trips_id=${trips_id}
        const resp = await axios.get(`/api/getnotelist.php?token=${localStorage.getItem('token')}`);
        const {signIn} = this.props;
        const {notes, success} = resp.data
        if (success) {
            signIn(resp.data)
            this.setState({
                note: notes
            });
        } else {
            console.error(resp.data.error)
        }
    }

    async deleteItem(note){
        const {trips_id} = this.props.trips_id;
        const resp = await axios.put('/api/deletenoteitem.php',{
            trips_id,
            note_id: note.note_id,
            token: localStorage.getItem('token')
        })

        if (resp.data.success) {
            this.getNoteList();
        } else {
            console.error(resp.data.error);
        }
    }

    toggleInput() {
        const { height } = this.state.showInput;
        if (!height) {
            this.setState(
                {showInput: {height: '200px'}}
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
        const { note, showInput, spinner } = this.state;
        let noteList = null;

        if(note.length > 0){
            noteList = note.map(note => {
                return (
                    <NoteItem key={note.note_id} note={note} deleteItem={this.deleteItem} display={this.getNoteList}/>
                );
            });
        } else {
            noteList = <div className="notes">Add notes to record your trip <i className="far fa-laugh-wink"></i></div>
        }

        return (
            <div className="notes-page">
                <SpinnerModal open={spinner}/>
                <div className="note-section">
                    <div className="notes-form">
                        <div className="notes-input-toggle" onClick={this.toggleInput}>
                             Add Note <i className="fas fa-angle-double-down"></i>
                        </div>
                        <NotesForm notes={this.handleInput} style={showInput} />
                        <div className="notes-box">
                            {noteList}
                        </div>
                    </div>
                </div>
                <Map/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return{
        trips_id: state.user.trips_id,
    }
}

export default connect(mapStateToProps,{
    signIn
})(Notes);
