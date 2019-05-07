import React from 'react';
import {Link} from 'react-router-dom';
import './404.scss';

const Page404 = () => {
    return (
        <div className="error-404">
            <h2>Oops Page Not Found</h2>
            <Link to="/"><i className="fas fa-home"></i></Link>
            <p>Back to home page</p>
        </div>
    );
}

export default Page404;
