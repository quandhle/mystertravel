import React from 'react';
import {Link} from 'react-router-dom';
import './404.scss';

export default props =>{
    return(
        <div className="error-404">
            <h1>Oops Page Not Found 404</h1>
            <Link to="/"><i class="fas fa-home"></i></Link>
        </div>
    )
}