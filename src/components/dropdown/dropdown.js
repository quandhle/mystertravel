import React, {Component} from 'react';

class Dropdown extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showMenu: false
        }
    }

    showMenu() {
        event.preventDefault();

        return (
            <div className="options">
                <button>Food</button>
                <button>Accomodation</button>
                <button>Transportation</button>
                <button>Flight</button>
                <button>Activities</button>
            </div>
        )
    }

    render() {
        return (
            <div>
                <button onClick={this.showMenu}>Category</button>
            </div>
        )
    }
}

export default Dropdown;
