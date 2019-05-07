import React, {Component} from 'react';
import Modal from '../../general/modal';

class MapModal extends Component {
    render() {
        const {modal, onClick} = this.props;

        return (
            <Modal open={modal}  childrenStyle="summary-map-modal">
                <h1 onClick={onClick}>AAHHHHHHH</h1>
            </Modal>
        );
    }
}

export default MapModal;
