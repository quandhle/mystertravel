import React, {Component} from 'react';
import './summary.scss';

import summaryimg from '../../../assets/images/summary.jpg';

class EndTrip extends Component{
    render(){
        return(
            <div className="endtrip-page">
                <div className="total-spend">
                    <p>Total spend in this trip: $1500</p>
                </div>
                <div className="last-entry">
                    <div className="entry-content">
                        <img src={summaryimg} alt="temp"/>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Provident omnis aperiam quas ex suscipiteius eveniet molestias reiciendis debitis fuga, magni, dolorum tenetur autem voluptas. Pariaturexplicabo consectetur dignissimos eius.</p>
                    </div>
                    <div className="share-btns col-12">
                        <div className="facebook"></div>
                        <div className="twitter"></div>
                        <div className="gmail"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default EndTrip;