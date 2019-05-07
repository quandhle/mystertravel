import React from 'react';
import {Link} from 'react-router-dom';
import './404.scss';

export default props =>{
    return(
        <div className="error-404">
            <h2>Oops Page Not Found</h2>
            <Link to="/"><i className="fas fa-home"></i></Link>
            <p>Back to home page</p>
        </div>
    )
}