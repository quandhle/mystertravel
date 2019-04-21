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
    toggleModal = () => {
        if(!this.state.modal){
            this.setState({
                modal: true
            })
        } else {
            this.setState({
                modal: false
            });
        }
    }
    render() {
        return (
            <Fragment>
                <div className="home-page-btn">
                    <button onClick={this.toggleModal} className="home-start-btn btn">Start As Guest</button>
                </div>
                {this.state.modal && <StartTrip modal={this.state.modal} close={this.toggleModal} history={this.props.history}/>}
            </Fragment>
        )
    }
}

export default Guest;