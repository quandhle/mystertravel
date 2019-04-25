import React, {Component} from 'react';

import {formatDate} from "../../../helper";

export default class extends Component {
    state = {
        isNote: false,
        date: null,

        note_id: null,
        image: null,
        entry: null,

        pin_id: null,
        name: null,
        description: null,
        lat: null,
        lng: null
    };

    componentDidUpdate(prevProps) {
        const {item} = this.props;
        if (item !== prevProps.item) {
            const isNote = !!item.note_id;
            this.setState({isNote, ...item});
        }
    }

    render() {
        const {item} = this.props;
        if (item && item.hasOwnProperty('date')) {
            const isNote = !!item.note_id;

            return (
                <div className="timeline-item">
                    <div className="timeline-item-content">
                        <p className="timeline-item-name">{item.name ? item.name : null}</p>
                        <p className="timeline-item-date">{formatDate(item.date)}</p>
                        <p className="timeline-item-text">{isNote ? item.entry : item.description}</p>
                    </div>
                </div>
            )
        } else {
            return null;
        }
    }
}