import React, {Component} from 'react';

import TimelineItem from './timeline_item';
import TimelineInner from './timeline_inner';

export default class Timeline extends Component {
    render() {
        const {pinData, notesData} = this.props;
        let timelineItems;

        if (pinData && notesData) {
            timelineItems = [...pinData, ...notesData];
            timelineItems.sort(function(a,b) {
                return new Date(a.date) - new Date(b.date);
            });
        }

        const firstItem = (timelineItems && timelineItems.length) ? timelineItems.shift() : null;
        const lastItem = (timelineItems && timelineItems.length) ? timelineItems.pop() : null;

        return (
            <div className="timeline">
                <p className="timeline-title">Trip Timeline</p>
                <TimelineItem item={firstItem}/>
                <TimelineInner items={timelineItems}/>
                <TimelineItem item={lastItem}/>
            </div>
        );
    }
}
