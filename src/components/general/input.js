import React from 'react';

export default props =>{
    const {id, name, type = "text", label, col="col-12", input, meta:{error, touched}} = props
    return (
        <div className={`forms ${col}`}>
            <label htmlFor={id}>{label}</label>
            <input type={type} id={id} {...input} name={name}/>   
        </div>
    )
}