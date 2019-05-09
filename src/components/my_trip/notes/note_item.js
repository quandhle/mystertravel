import React, {Component} from 'react';
import { formatDate } from '../../../helper';
import UpdateNote from './update_note';

class NoteItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal() {
        this.setState({
            modal: !this.state.modal
        }); 
    }

    render() {
        const {display,deleteItem, note, note: {note_id, entry, date, image}} = this.props;

        return (
            <div key={note_id} className="notes">
                <p>{formatDate(date)}</p>
                <p>{entry}</p>
                {image? <div className="note-img"><img src={image} alt=""/></div>: null}
                <div className="btn note-icon" onClick={() => { this.toggleModal()} }><i className="fas  fa-edit"></i></div>
                <div className="btn note-icon" onClick={() => { deleteItem(note) }}><i className="far  fa-trash-alt"></i></div>
                <UpdateNote modal={this.state.modal} note={note} close={this.toggleModal} display={display}/>
            </div>
        );
    }
}

export default NoteItem;
