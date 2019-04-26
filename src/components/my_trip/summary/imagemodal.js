import React, {Component} from 'react';
import Modal from '../../general/modal';

export default class ImageModal extends Component {
    render() {
        const {modal, onClick, img} = this.props;
        return (
            <Modal open={modal} childrenStyle="summary-image-modal">
                <img onClick={onClick} src={img} alt=""/>
            </Modal>
        );
    }
}