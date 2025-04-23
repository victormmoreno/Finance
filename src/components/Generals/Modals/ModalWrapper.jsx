import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'flowbite-react';

const ModalWrapper = ({ show, onClose, title, children }) => {
  const modalHeaderTheme = {
    close: {
      base: 'cursor-pointer', // Add cursor-pointer here
    },
  };
  return (
    <Modal show={show} onClose={onClose} dismissible>
      <ModalHeader theme={modalHeaderTheme}>{title}</ModalHeader>
      <ModalBody>
        {children}
      </ModalBody>
    </Modal>
  );
};

export default ModalWrapper;
