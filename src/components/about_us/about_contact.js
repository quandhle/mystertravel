import React, {Fragment} from 'react';

export default props =>{
    const {email, linkedin, portfolio, git, name, image} = props.person
    return(
        <Fragment>
        <div className="about-top">
            <div className="about-img">
            <img src={`./dist/assets/images/about_us/${image}`} alt={`${name}`} className="person-img"/>
            </div>
            <div className="about-name">
                <div className="person-name">{name}</div>
                <div className="about-quote">Quote</div>
            </div>  
        </div>
        <div className="about-story">
            <div className="story-title">Developer Story <i className="fas fa-chevron-down"></i></div>
            <div className="story">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci dolore cumque, voluptatibus debitis quas repellat nihil laborum facilis sunt tempore expedita alias nobis eligendi iusto obcaecati error consequatur quia nemo.</div>
        </div>
        <div className="about-contact">
            <a href={`mailto:${email}`}><i className="fas fa-envelope-square" target="_blank"></i></a>    
            <a href={`https://www.linkedin.com/in/${linkedin}`} target="_blank"><i className="fab fa-linkedin"></i></a>
            <a href={`http://www.${portfolio}`} target="_blank"><i className="fas fa-globe"></i></a>
            <a href={`https://www.github.com/${git}`} target="_blank"><i className="fab fa-github-square"></i></a>   
        </div>
        </Fragment>
    )
}