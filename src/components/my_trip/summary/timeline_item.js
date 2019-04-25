import React, {Component} from 'react';

export default class extends Component {
    state = {

    };

    render() {
        const {onClick} = this.props;

        return (
            <div className="timeline-item">
                <div className="timeline-item-content">
                    <p className="timeline-item-name">Spectrum</p>
                    <p className="timeline-item-date">99/99/99</p>
                    <p className="timeline-item-text">Wow there was a lot of stuff. Wow there was a lot of stuff. Wow
                        there was a lot of stuff. Wow there was a lot of stuff. Wow there was a lot of stuff. Wow there
                        was a lot of stuff. </p>
                </div>
            </div>
        )
    }
}