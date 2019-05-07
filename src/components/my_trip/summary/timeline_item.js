import React, {Component, Fragment} from 'react';
import {formatDate} from "../../../helper";

class TimelineItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
    }

    componentDidUpdate(prevProps) {
        const {item} = this.props;

        if(item !== prevProps.item) {
            const isNote = !!item.note_id;

            this.setState({isNote, ...item});
        }
    }

    render() {
        const {item, setImage} = this.props;

        if(item && item.hasOwnProperty('date')) {
            const isNote = !!item.note_id;

            return (
                <div className="timeline-item">
                    <div onClick={() => {setImage(item.image)}} className="timeline-item-content">
                        <p className="timeline-item-name">{item.name ? <span><i className="fas fa-map-marker-alt"></i> {item.name}</span> :
                            (item.image ? <i className="fas fa-images" /> : <i className="fas fa-comment"></i>)}
                        </p>
                        <p className="timeline-item-date">{formatDate(item.date)}</p>
                        <p className="timeline-item-text">{isNote ? item.entry : item.description}</p>
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

export default TimelineItem;
