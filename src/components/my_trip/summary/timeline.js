import React, {Component} from 'react';

import TimelineItem from './timeline_item';
import TimelineInner from './timeline_inner';

export default class Timeline extends Component {
    render() {
        return (
            <div className="timeline">
                <p className="timeline-title">Trip Timeline</p>
                <TimelineItem/>
                <TimelineInner/>
                <TimelineItem/>
            </div>
        );
    }
}
