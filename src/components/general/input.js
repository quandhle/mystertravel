import React from 'react';
import './general.scss';

export default props =>{
    const {id, name, classes = "", type = "text", label, col="col-12", input, meta:{error, touched}, autoFocus = false, min="0"} = props

    return (
        <div className={`input-box ${classes} ${col}`}>
            <input type={type} id={id} {...input} name={name} placeholder={label} autoComplete="off" autoFocus={autoFocus} min="0"/>
            <p className="error-input">{touched && error}</p>  
        </div>
    )
}