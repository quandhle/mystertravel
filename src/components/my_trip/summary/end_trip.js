import React, {Component} from 'react';
import axios from 'axios';

import './summary.scss';
import {formatMoney, FormatMoney} from './../../../helper/index';

import summaryimg from '../../../assets/images/summary.jpg';

class EndTrip extends Component{
    state = {
        total: 0,
        lastNote: '',
        trips_id: 1     // this should read from redux state or php session eventually
    };

    componentDidMount() {
        this.getBudgetTotal();
        this.getLastNote();
    }

    async getBudgetTotal() {
        const response = await axios.get(`/api/getbudgetlist.php?trips_id=${this.state.trips_id}`);

        if(response.data.success) {
            const newTotal = response.data.budget.reduce((total, budgetItem) => {
                return total + parseInt(budgetItem.price);
            }, 0);

            this.setState({
                total: newTotal
            })
        }
    }

    async getLastNote() {
        const response = await axios.get(`/api/getnotelist.php?trips_id=${this.state.trips_id}`);

        if(response.data.success) {
            const {data} = response.data;
            console.log(data);

            this.setState({
                lastNote: data[data.length - 1].entry
            })
        }
    }

    render(){
        return(
            <div className="endtrip-page">
                <div className="total-spend">
                    <p>Total spent in this trip: {`${formatMoney(this.state.total)}`}</p>
                </div>
                <div className="last-entry">
                    <div className="entry-content">
                        <img src={summaryimg} alt="temp"/>
                        <p>{this.state.lastNote}</p>
                    </div>
                    <div className="share-btns col-12">
                        <div className="facebook"><i className="fab fa-facebook-square"></i></div>
                        <div className="twitter"><i className="fab fa-twitter-square"></i></div>
                        <div className="gmail"><i className="fas fa-envelope-square"></i></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EndTrip;