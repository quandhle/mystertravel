import React, {Component, Fragment} from 'react';
import StartTrip from './start_trip';


class Guest extends Component {
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
            <Fragment>
                <div className="home-page-btn">
                    <button onClick={this.openModal} className="home-start-btn btn">Start As Guest</button>
                </div>
                {this.state.modal && <StartTrip modal={this.state.modal} close={this.openModal}/>}
            </Fragment>
        )
    }
}

export default Guest;