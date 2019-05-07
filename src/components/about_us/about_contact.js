import React, {Fragment} from 'react';

const AboutContact = props => {
    const {email, linkedin, portfolio, git, name, image, quote, role} = props.person;

    return (
        <Fragment>
            <div className="about-top">
                <div className="about-img">
                    <img src={`./dist/assets/images/about_us/${image}`} alt={`${name}`} className="person-img"/>
                </div>
                <div className="about-name">
                    <div className="person-name">Name: {name}</div>
                    <div className="about-quote">Quote: {quote}</div>
                    <div>Role: {role}</div>
                </div>  
            </div>
            <div className="about-contact">
                <a href={`mailto:${email}`}><i className="fas fa-envelope-square" target="_blank"></i></a>    
                <a href={`https://www.linkedin.com/in/${linkedin}`} target="_blank"><i className="fab fa-linkedin"></i></a>
                <a href={`http://www.${portfolio}`} target="_blank"><i className="fas fa-globe"></i></a>
                <a href={`https://www.github.com/${git}`} target="_blank"><i className="fab fa-github-square"></i></a>   
            </div>
        </Fragment>
    );
}

export default AboutContact;