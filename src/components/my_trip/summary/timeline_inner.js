import React, {Component} from 'react';

import TimelineItem from './timeline_item';

export default class extends Component {
    state = {
        innerItems: null,
        open: false,
        style: {
            display: 'auto'
        }
    };

    componentDidUpdate(prevProps) {
        const {items} = this.props;
        if ((items !== prevProps.items) && items) {
            const {items} = this.props;
            const innerItems = items.map((item, index) => {
                return <TimelineItem key={index} item={item}/>;
            }, 0);
            this.setState({
                innerItems
            });
        }
    }

    onClick = () => {
        this.setState({
            open: true,
            style: {
                display: 'auto'
            }
        });
    }

    render() {
        const {innerItems, style} = this.state;
        return (
            <div className="timeline-inner" style={style}>
                {innerItems}
            </div>
        )
    }
}