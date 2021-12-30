import React from 'react';

import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody } from '@chakra-ui/react';

const NonDismissableModal = ({ text }) => (
  <>
    <Modal closeOnOverlayClick={false} closeOnEsc={false} isCentered isOpen>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Alert !!</ModalHeader>
        <ModalBody pb={6}>{text}</ModalBody>
      </ModalContent>
    </Modal>
  </>
);

export default NonDismissableModal;
