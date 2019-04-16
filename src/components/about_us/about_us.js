import React from 'react';

export default props=>{
    return(
        <div className="about-container">
        
            <div className="about-header">
                <h1>About us</h1>
            </div>

            {/* about us content */}
            <div className="about-us row">
                <div className="about-image col-xs-4">
                    <img src="" alt="about kylie"/>
                </div>
                <div className="about-content col-xs-8">
                    <div className="about-name row">Kylie</div>
                    <div className="about-descrip row">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa, nam?
                    </div>
                </div>
            </div>

        </div>
    )
}