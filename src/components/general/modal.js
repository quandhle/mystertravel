import React from 'react';
import './general.scss';

export default props =>{
    console.log(props)
    const {open, children, childrenStyle} = props

    if(open){
        return(
            <div className="popup-container">
                <div className="popup-content">
                    <div className={`popup-children ${childrenStyle}`}>
                        {children}
                    </div> 
                </div>
            </div>
        )
    } else {
        return null;
    }
}