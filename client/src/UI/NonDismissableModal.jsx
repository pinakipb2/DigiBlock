import React from 'react';

import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, useDisclosure } from '@chakra-ui/react';

const NonDismissableModal = ({ text }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  console.log(onClose);
  return (
    <>
      <Button onClick={onOpen}>Open Modal</Button>
      <Modal closeOnOverlayClick={false} closeOnEsc={false} isCentered isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalBody pb={6}>{text}</ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default NonDismissableModal;
