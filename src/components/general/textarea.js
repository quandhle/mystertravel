import React from 'react';
import './general.scss';

export default props =>{
    const {id, name, classes = "", label, col="col-12", input, meta:{error, touched}} = props

    return (
        <div className={`input-box ${classes} ${col}`}>
            <textarea id={id} {...input} name={name} placeholder={label}/>
            <p className="error-input">{touched && error ? error : <span>&nbsp;</span>}</p>  
        </div>
    )
}