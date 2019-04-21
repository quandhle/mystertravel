import React from 'react';
import { formatDate } from '../../../helper';

export default props =>{
    const {note_id, entry, date} = props.note
    return(
    <div key={note_id} className="notes">
        <p>{formatDate(date)}</p>
        <p>{entry}</p>
        <button className="btn" onClick={() => { props.deleteItem(props.note) }}><i className="far fa-trash-alt"></i></button>
    </div>
    )
}