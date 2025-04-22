import React from 'react';
// import { Modal } from 'flowbite-react';
import { Modal, ModalHeader, ModalBody } from 'flowbite-react';

const ModalWrapper = ({ show, onClose, title, children }) => {
  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader>{title}</ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
    </Modal>
  );
};

export default ModalWrapper;
