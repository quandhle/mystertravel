import React, {Component} from 'react';
import axios from 'axios';
import './about_us.scss';

class AboutUs extends Component {
    state = {
        data: []
    };

    componentDidMount() {
        this.getData();
    }

    getData() {
        axios.get('/api/getaboutus.php').then((resp)=> {
            this.setState({
                data: resp.data.data
            });
        })
    }
    
    render() {
        const aboutUs = this.state.data.map((person) => {
            const {last_name, first_name, linkedin, email, portfolio, github, image, developer_story} = person;

            console.log(person);

            return (
                <div key={first_name} className="about-person row">
                    <div className="about-img col-6">
                        <img src={`${image}`} alt={`${first_name}`} className="person-img"/>
                    </div>
                    <div className="about-text col-6">
                        <p>{first_name} {last_name}</p>
                        <p>Email: {email}</p>
                        <p>Linkedin: <a href={`linkedin.com/${linkedin}`}>{linkedin}</a></p>
                        <p>Portfolio: <a href={`${portfolio}`}>{portfolio}</a></p>
                        <p>Github: <a href={`github.com/${github}`}>{github}</a></p>
                        <p>{developer_story}</p>
                    </div>

                </div>
            )
        });

        return (
            <div className="about-container">{aboutUs}</div>
        )
    }
}

export default AboutUs;