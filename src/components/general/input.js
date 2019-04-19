import React from 'react';
import './general.scss';

export default props =>{
    const {id, name, classes = "", type = "text", label, col="col-12", input, meta:{error, touched}} = props
    console.log(props.meta)
    return (
        <div className={`input-box ${classes} ${col}`}>
            <input type={type} id={id} {...input} name={name} placeholder={label} />   
        </div>
    )
}