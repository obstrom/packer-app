import React, { useContext } from "react";
import styled from "styled-components";
import Stack from "react-bootstrap/Stack";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import Spinner from "react-bootstrap/Spinner";
import { PackerObjectContext } from "../../contexts/PackerObjectContext";
import { Bin, Item } from "../../commons/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxOpen,
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { createPackerRequestBody } from "../../commons/packerAPI";

const Frame = styled(Stack)`
  background: #e8e8e8;
`;

const calcHasObjects = (items: Array<Item>, bins: Array<Bin>): boolean =>
  items.length > 0 && bins.length > 0;

export const RequestPackFrame = () => {
  const { post, loading } = useFetch(process.env.REACT_APP_API_BASE_URL ?? "");
  const packerObjectContext = useContext(PackerObjectContext);
  const items: Array<Item> = packerObjectContext?.item?.get ?? [];
  const bins: Array<Bin> = packerObjectContext?.bin?.get ?? [];

  const hasObjects: boolean = calcHasObjects(items, bins);

  const sendToAPI = () => {
    if (items.length === 0 || bins.length === 0) return; // Abort if empty

    // TODO - Fix lengthUnit and weightUnit - Right now API expects Global setting while front-end handles this per object
    post("/pack", createPackerRequestBody(items, bins, "mm", "g")).then(
      (data) => console.log(data)
    );
  };

  return (
    <Frame className="rounded border p-2" direction="vertical">
      <Alert variant={hasObjects ? "dark" : "warning"}>
        <Stack direction="horizontal" gap={3}>
          <FontAwesomeIcon
            size="2x"
            style={{ opacity: 0.75 }}
            icon={hasObjects ? faCircleInfo : faTriangleExclamation}
          />
          <span>
            {hasObjects
              ? `Will attempt to find optimal packing for ${items.length} items using any of ${bins.length} different containers.`
              : "Requires at least one container and one item to pack!"}
          </span>
        </Stack>
      </Alert>
      <div className="d-flex justify-content-center mb-2">
        <Button
          size="lg"
          variant={hasObjects ? "primary" : "secondary"}
          disabled={!hasObjects}
          className="d-flex align-items-center"
          onClick={() => sendToAPI()}
        >
          <FontAwesomeIcon icon={faBoxOpen} />
          <span className="ms-2">PACK</span>
          {loading && <Spinner animation="border" size="sm" className="ms-2" />}
        </Button>
      </div>
    </Frame>
  );
};
