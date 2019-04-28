import React, {Component} from 'react';

import TimelineItem from './timeline_item';
import TimelineInner from './timeline_inner';

export default class Timeline extends Component {
    state = {
        expandTimeline: {
            'max-height': 0
        }
    }
    toggleTimeline = ()=>{
        if(!this.state.expandTimeline['max-height']){
            this.setState({
                expandTimeline: {
                    'max-height': '10000px'
                }
            })
        } else {
            this.setState({
                expandTimeline: {
                    'max-height': 0
                }
            })
        }

    }
    expandIcon(timelineItems){
        let icon = (<div className="toggle-timeline" onClick={this.toggleTimeline}>Show More <i className="fas fa-chevron-down"></i></div>)
        if(timelineItems && timelineItems.length > 2){
            if(this.state.expandTimeline['max-height'] != 0) {
                icon = (<div className="toggle-timeline" onClick={this.toggleTimeline}>Show Less <i className="fas fa-chevron-up"></i></div>)
            }
            return  icon;
        } else {
            return null;
        }
    }
    render() {
        const {pinData, notesData, setImage} = this.props;
        let timelineItems;

        if (pinData && notesData) {
            timelineItems = [...pinData, ...notesData];
            timelineItems.sort(function(a,b) {
                return new Date(a.date) - new Date(b.date);
            });
        }
        let expandIcon = this.expandIcon(timelineItems);
        const firstItem = (timelineItems && timelineItems.length) ? timelineItems.shift() : null;
        const lastItem = (timelineItems && timelineItems.length) ? timelineItems.pop() : null;

        return (
            <div className="timeline">
                <p className="timeline-title">Trip Timeline</p>
                <TimelineItem item={firstItem} setImage={setImage}/>
                <TimelineInner items={timelineItems} setImage={setImage} style={this.state.expandTimeline}/>
                {expandIcon}
                <TimelineItem item={lastItem} setImage={setImage}/>
            </div>
        );
    }
}
