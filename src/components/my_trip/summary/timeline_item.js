import React from 'react';

export default props => {
    const {onClick} = props;

    return (
        <div className="timeline-item">
            <div className="timeline-item-content">
                <p className="timeline-item-name">Spectrum</p>
                <p className="timeline-item-date">99/99/99</p>
                <p className="timeline-item-text">Wow there was a lot of stuff. Wow there was a lot of stuff. Wow there was a lot of stuff. Wow there was a lot of stuff. Wow there was a lot of stuff. Wow there was a lot of stuff. </p>
            </div>
        </div>
    )
}