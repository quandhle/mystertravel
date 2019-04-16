import React from 'react';

import './map.scss';
import fakeMap from './../../assets/images/fakemap.png';

export default props => {
    return (
        <div className='mappage'>
            <img src={fakeMap} className='fakeMap'/>
            <button className='btn btn-danger btn-lg'>Add Pin</button>
        </div>
    );
}