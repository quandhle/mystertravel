import React, {Component} from 'react';
import './about_us.scss';
import AboutContact from './about_contact';

class AboutUs extends Component {
    constructor(props){
        super(props)

        this.data =[
        {
            name:"Jennifer Lai",
            email: "iclai.work@gmail.com",
            linkedin:"jen-icl",
            portfolio:"jen-icl.com",
            git: "jen-icl",
            image:"jen.jpg",
            quote: "Gotta double check my variable names.",
            role: "Front End Developer"
        },
        {
            name:"Kylie Chao",
            email: "kylieclin@gmail.com",
            linkedin:"kyliechao",
            portfolio:"kyliechao.com",
            git: "kylieclin",
            image:"kylie.jpg",
            quote: "You're doing CSS!",
            role: "Front End Developer"
        },
        {
            name:"Quanye West",
            email: "quandhle@gmail.com",
            linkedin:"quandhle",
            portfolio:"quandhle.com",
            git: "quandhle",
            image:"quan.jpg",
            quote: "You're fired!",
            role: "Back End Developer"
        },
        {
            name:"Westley Poon",
            email: "westleypoon@gmail.com",
            linkedin:"westley-poon",
            portfolio:"westleypoon.com",
            git: "WestleyPoon",
            image:"west.jpg",
            quote: "When am I not fired?",
            role: "Back End Developer"
        },
        ]

    }
    render() {
        const aboutUs = this.data.map((person) => {
            return (
                <div key={person.name} className="about-person">
                    <AboutContact person={person}/>
                </div>
            )
        });

        return (
            <div className="about-container">
                <section className="first bg bg1"><div>Develop Team</div></section>
                <section className="bg section parallax aboutUs">
                    {aboutUs}
                    <div className="footer"></div>
                </section>
            </div>
        )
    }
}

export default AboutUs;