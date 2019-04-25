import React, {Component} from 'react';
import { formatDate } from '../../../helper';
import UpdateNote from './update_note';
import { updateNote} from '../../../actions';

class NoteItem extends Component{
    state ={
        modal: false
    }
    toggleModal= ()=>{
        this.setState({
            modal: !this.state.modal
        })   
    }
    render(){
        const {deleteItem, note, note: {note_id, entry, date, image}} = this.props
        console.log(this.refs);
        return(
        <div key={note_id} className="notes">
            <p>{formatDate(date)}</p>
            <p>{entry}</p>
            {image? <div className="note-img"><img src={image} alt=""/></div>: null}
            <button className="btn" onClick={() => { deleteItem(note) }}><i className="far  fa-trash-alt"></i></button>
            <button className="btn" onClick={() => { this.toggleModal()} }>Update</button>
            <UpdateNote modal={this.state.modal} note={note} close={this.toggleModal}/>
        </div>
        )
    }
}



export default NoteItem;