import React from 'react';
import './general.scss';

export default props =>{
    console.log(props.meta)
    const {id, name, classes = "", type = "text", label, col="col-12", input, meta:{error, touched}, autoFocus = false} = props

    return (
        <div className={`input-box ${classes} ${col}`}>
            <input type={type} id={id} {...input} name={name} placeholder={label} autoComplete="off" autoFocus={autoFocus}/>
            <p className="error-input">{touched && error ? error : <span>&nbsp;</span>}</p>  
        </div>
    )
}