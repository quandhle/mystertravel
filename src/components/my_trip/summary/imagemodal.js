import React, {Component} from 'react';
import Modal from '../../general/modal';

export default class ImageModal extends Component {
    render() {
        const {modal, close, img} = this.props;
        return (
            <Modal open={modal} onClick={close} childrenStyle="summary-image-modal">
                <span onClick={close} className="close-popup"><i className="fas fa-times-circle"></i></span>
                <img onClick={close} src={img} alt=""/>
            </Modal>
        );
    }
}