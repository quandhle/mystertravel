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

        const {items, setImage} = this.props;
        if ((items !== prevProps.items) && items) {
            const innerItems = items.map((item, index) => {
                return <TimelineItem key={index} setImage={setImage} item={item}/>;
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
            <div className="timeline-inner" style={this.props.style}>
                {innerItems}
            </div>
        )
    }
}