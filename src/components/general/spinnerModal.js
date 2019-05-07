import React from 'react';
import Modal from './modal';

const SpinnerModal = props => {
    return (
        <Modal open={props.open} childrenStyle="spinner-modal">
            <div className="text-center">
                <div className="spinner-border" role="status"></div>
                <span className="sr-only">Loading...</span>
            </div>
            <div className="loading-text text-center">
                <strong>Loading...</strong>
            </div>
        </Modal>
    );
}

export default SpinnerModal;
