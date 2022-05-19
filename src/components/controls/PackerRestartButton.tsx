import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowsRotate,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import Modal from "react-bootstrap/Modal";
import Stack from "react-bootstrap/Stack";
import { PackerObjectContext } from "../../contexts/PackerObjectContext";
import { StandardButton } from "./StandardButton";

export const PackerRestartButton = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const packerObjectContext = useContext(PackerObjectContext);
  const handleRestartButtonClick = () => {
    packerObjectContext?.clearAll();
    setShowModal(false);
  };

  return (
    <>
      <StandardButton
        variant="light"
        className="d-flex align-items-center"
        onClick={() => setShowModal(true)}
      >
        <FontAwesomeIcon icon={faArrowsRotate} />
        <span className="ms-2">RESTART</span>
      </StandardButton>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Clear all items and containers?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="horizontal" gap={3}>
            <StandardButton
              size="lg"
              variant="brand"
              onClick={() => handleRestartButtonClick()}
            >
              <FontAwesomeIcon icon={faTriangleExclamation} />
              <span className="ms-2">Yes, restart</span>
            </StandardButton>
            <Button onClick={() => setShowModal(false)} variant="secondary">
              Cancel
            </Button>
          </Stack>
        </Modal.Body>
      </Modal>
    </>
  );
};
