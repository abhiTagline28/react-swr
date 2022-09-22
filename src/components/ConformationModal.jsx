import React from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

const ConformationModal = ({ title, modal, cancelModal, toggle, msg }) => {
  return (
    <Modal isOpen={modal} toggle={cancelModal}>
      <ModalHeader toggle={cancelModal}>{title}</ModalHeader>
      <ModalBody>
        <h4>Are you sure you want to {msg}</h4>
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={cancelModal}>
          Cancel
        </Button>
        <Button color="primary" onClick={toggle}>
          Yes
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default ConformationModal;
