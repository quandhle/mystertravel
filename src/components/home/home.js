import React, {Component} from 'react';
import StartTrip from './start_trip';

import coconut from '../../assets/images/coconut.png';
import './home.scss';

class Home extends Component {
    constructor(props){
        super(props)

        this.state ={
            modal: false,
        }
        
    }
    goToTrip = () => {
        this.props.history.push(`/mytrip`);
    }
    openModal= () =>{
        
        if(!this.state.modal){
            this.setState({
                modal: true
            })
        } else {
            this.setState({
                modal: false
            })
            this.props.history.push('/map');
        }
    }
    render() {
        return (
            <div className="home-page">
                <div className="title-holder">
                    <h4 className='title-blurb'>Travelling? Log your adventure and keep track of where you've been!</h4>
                </div>
                <div className="img-wrap">
                    <img src={coconut} alt=""/>
                </div>
                <div className="home-page-btn">
                    <button onClick={this.openModal} className="home-start-btn btn btn-primary">Start / View trip</button>
                </div>
                {this.state.modal && <StartTrip modal={this.state.modal} close={this.openModal}/>}
            </div>
        )
    }
}

export default Home;