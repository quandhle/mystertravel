import React, {Component} from 'react';
import coconut from './../assets/images/coconut.png';

export default class extends Component {
    goToTrip = () => {
        this.props.history.push(`/mytrip`);
    }

    render() {
        return (
            <div className="home-page">
                <div className="title-holder">
                    <h4 className='title-blurb'>Travelling? Log your adventure and keep track of where you've been!</h4>
                </div>
                <img src={coconut} alt=""/>

                <div className="home-page-btn">
                    <button onClick={this.goToTrip} className="home-start-btn btn btn-primary">Start / View trip</button>
                </div>
            </div>
        )
    }
}