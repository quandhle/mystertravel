import React, {Component} from 'react';
import StartTrip from './start_trip';
import coconut from '../../assets/images/coconut.png';
import PreTrip from './preTrip';
import CurrentTrip from './currentTrip';
import PostTrip from './postTrip';
import './home.scss';

class Home extends Component {
    constructor(props){
        super(props);

        this.state = {
            modal: false,
        };
    }

    goToTrip = () => {
        this.props.history.push(`/mytrip`);
    }

    openModal = () => {
        if(!this.state.modal){
            this.setState({
                modal: true
            })
        } else {
            this.setState({
                modal: false
            });
            this.props.history.push('/map');
        }
    }

    render() {
        return (
            <div className="home-page">
                <div className="landing">
                    <h4 className='title-blurb1'>Travel smarter</h4>
                    <h4 className='title-blurb2'>Plan faster</h4>

                    <div className="home-page-btn">
                        <button onClick={this.openModal} className="home-start-btn btn btn-primary">Start / View trip</button>
                    </div>

                    <div className="preContainer">
                        <PreTrip/>
                    </div>
                </div>

                <CurrentTrip/>
                <PostTrip/>
                {this.state.modal && <StartTrip modal={this.state.modal} close={this.openModal}/>}
            </div>
        )
    }
}

export default Home;