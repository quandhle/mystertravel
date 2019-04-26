import React, {Component} from 'react';

import TimelineItem from './timeline_item';
import TimelineInner from './timeline_inner';

export default class Timeline extends Component {
    render() {
        const {pinData, notesData, setImage} = this.props;
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
                <TimelineItem item={firstItem} setImage={setImage}/>
                <TimelineInner items={timelineItems} setImage={setImage}/>
                <TimelineItem item={lastItem} setImage={setImage}/>
            </div>
        );
    }
}
