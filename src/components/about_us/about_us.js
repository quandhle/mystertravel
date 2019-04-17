import React from 'react';
import './about_us.scss';

export default props=>{
    return(
        <div className="about-container">
        
            <div className="about-header">
                <h1>About us</h1>
            </div>

            {/* about us content */}
            <div className="about-us row">
                <div className="about-image col-4">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Noto_Emoji_KitKat_263a.svg/1200px-Noto_Emoji_KitKat_263a.svg.png" alt="about kylie"/>
                </div>
                <div className="about-content col-8">
                    <div className="about-name">Kylie</div>
                    <p className="about-descrip">
                    Lorem ipsum dolor sit amet consectetur <br/> adipisicing elit. Culpa, nam?
                    </p>
                </div>
            </div>

        </div>
    )
}