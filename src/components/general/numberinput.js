import React from 'react';
import './general.scss';

export default props =>{
    const {id, name, classes = "", type = "text", label, col="col-12", input, meta:{error, active, touched}, autoFocus = false, min="0"} = props

    return (
        <div className={`input-box ${classes} ${col}`}>
            <input type={type} id={id} {...input} name={name} placeholder={label} autoComplete="off" autoFocus={autoFocus} min="0" step="0.01"/>
            <p className="error-input">{active && error || touched && error? error : <span>&nbsp;</span>  }</p>  
        </div>
    )
}
