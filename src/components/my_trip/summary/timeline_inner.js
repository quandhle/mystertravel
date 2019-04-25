import React from 'react';

import TimelineItem from './timeline_item';

export default props => {
    const {onClick} = props;

    return (
        <div className="timeline-inner">
            <TimelineItem/>
            <TimelineItem/>
            <TimelineItem/>
        </div>
    )
}