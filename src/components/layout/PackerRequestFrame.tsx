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
  faBoxesPacking,
  faCircleInfo,
  faTriangleExclamation,
} from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { createPackerRequestBody } from "../../commons/packerAPI";
import { PackerResponseContext } from "../../contexts/PackerResponseContext";
import { PackerJobResponseStatus } from "../../commons/enums";

const Frame = styled(Stack)`
  background: #e8e8e8;
`;

const calcHasObjects = (items: Array<Item>, bins: Array<Bin>): boolean =>
  items.length > 0 && bins.length > 0;

const sumItemQuantities = (items: Array<Item>): number =>
  items.reduce((sum, item) => sum + item.quantity, 0);

const renderItemQuantities = (items: Array<Item>): string => {
  const qty = sumItemQuantities(items);
  return qty === 1 ? "one item" : `${qty} items`;
};

export const PackerRequestFrame = () => {
  const { post, loading } = useFetch(process.env.REACT_APP_API_BASE_URL ?? "");

  const packerObjectContext = useContext(PackerObjectContext);
  const packerResponseContext = useContext(PackerResponseContext);

  const items: Array<Item> = packerObjectContext?.item?.get ?? [];
  const bins: Array<Bin> = packerObjectContext?.bin?.get ?? [];

  const hasObjects: boolean = calcHasObjects(items, bins);

  const sendToAPI = () => {
    // Abort if empty
    if (items.length === 0 || bins.length === 0) {
      packerResponseContext?.setStatus(PackerJobResponseStatus.FAILURE);
      return;
    }

    // TODO - Fix lengthUnit and weightUnit - Right now API expects Global setting while front-end handles this per object
    post("/pack", createPackerRequestBody(items, bins, "mm", "g"))
      .then((data: any) => {
        console.log("Response data: ", data);

        try {
          data.boxes.length > 0
            ? packerResponseContext?.setStatus(PackerJobResponseStatus.SUCCESS)
            : packerResponseContext?.setStatus(PackerJobResponseStatus.FAILURE);

          packerResponseContext?.setResults(data.boxes);
          packerResponseContext?.setVisData(data.visualizeData.containers);
          packerResponseContext?.setResultsVolume(data.volume);
          packerResponseContext?.incrementRequestCounter();
        } catch (e: any) {
          if (data.message.includes("timeout")) {
            packerResponseContext?.setStatus(PackerJobResponseStatus.TIMEOUT);
            return;
          }

          packerResponseContext?.setStatus(PackerJobResponseStatus.ERROR);
        }
      })
      .catch((error) => {
        console.error(error);
        packerResponseContext?.setStatus(PackerJobResponseStatus.ERROR);
      });
  };

  return (
    <Frame className="rounded border p-2" direction="vertical">
      <Alert variant={hasObjects ? "info" : "dark"}>
        <Stack direction="horizontal" gap={3}>
          <FontAwesomeIcon
            size="2x"
            style={{ opacity: 0.75 }}
            icon={hasObjects ? faCircleInfo : faTriangleExclamation}
          />
          <span>
            {hasObjects
              ? `Will attempt to find optimal packing for ${renderItemQuantities(
                  items
                )} using ${
                  bins.length === 1
                    ? "one container size"
                    : `any combination of ${bins.length} different containers`
                }.`
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
          <FontAwesomeIcon icon={faBoxesPacking} />
          <span className="ms-2">RUN PACKER</span>
          {loading && <Spinner animation="border" size="sm" className="ms-2" />}
        </Button>
      </div>
    </Frame>
  );
};
