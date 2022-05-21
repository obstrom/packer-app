import React, { Dispatch, SetStateAction, useContext, useState } from "react";
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
import { AppViewStatus, PackerJobResponseStatus } from "../../commons/enums";
import { PackerStatusBadge } from "../elements/PackerStatusBadge";
import { PackerInfoAlert } from "../elements/PackerInfoAlert";
import { PackerRestartButton } from "../controls/PackerRestartButton";
import { themeColors } from "../../commons/colors";
import { StandardButton } from "../controls/StandardButton";

type PackerRequestFrameProps = {
  setViewStatus: Dispatch<SetStateAction<AppViewStatus>>;
};

const Frame = styled<any>(Stack)`
  background: ${(props) => props.themeColors.secondary};
`;

const calcHasObjects = (items: Array<Item>, bins: Array<Bin>): boolean =>
  items.length > 0 && bins.length > 0;

const sumItemQuantities = (items: Array<Item>): number =>
  items.reduce((sum, item) => sum + item.quantity, 0);

const renderItemQuantities = (items: Array<Item>): string => {
  const qty = sumItemQuantities(items);
  return qty === 1 ? "one item" : `${qty} items`;
};

export const PackerRequestFrame = ({
  setViewStatus,
}: PackerRequestFrameProps) => {
  const { post, loading } = useFetch(
    process.env.REACT_APP_API_BASE_URL ?? "",
    process.env.REACT_APP_API_AUTH_KEY ?? ""
  );

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

    console.log("DEBUG ENV: ", {
      url: process.env.REACT_APP_API_BASE_URL,
      key: process.env.REACT_APP_API_AUTH_KEY,
    });

    // TODO - Fix lengthUnit and weightUnit - Right now API expects Global setting while front-end handles this per object
    post("/pack", createPackerRequestBody(items, bins, "mm", "g"))
      .then((data: any) => {
        console.log("Response data: ", data);

        try {
          packerResponseContext?.setResults(data.boxes);
          packerResponseContext?.setVisData(data.visualizeData.containers);

          packerResponseContext?.setInfo({
            resultsVolume: data.volume,
            packingTime: data.packingTimeMs,
            totalWeight: data.totalWeight,
          });

          if (data.boxes.length === 0) {
            packerResponseContext?.setStatus(PackerJobResponseStatus.FAILURE);
            return;
          }

          packerResponseContext?.setStatus(PackerJobResponseStatus.SUCCESS);
          setViewStatus(AppViewStatus.RESULTS);
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
    <Frame
      className="rounded border p-2"
      direction="vertical"
      themeColors={themeColors}
    >
      <Alert variant={hasObjects ? "light" : "dark"} className="mb-2">
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
      <PackerInfoAlert className="mb-2" />
      <div className="d-flex justify-content-center my-2">
        <div>
          <StandardButton
            size="lg"
            variant={hasObjects ? "brand" : "secondary"}
            disabled={!hasObjects}
            className="d-flex align-items-center"
            onClick={() => sendToAPI()}
          >
            <FontAwesomeIcon icon={faBoxesPacking} />
            <span className="ms-2">RUN PACKER</span>
            {loading && (
              <Spinner animation="border" size="sm" className="ms-2" />
            )}
            <PackerStatusBadge />
          </StandardButton>
        </div>
      </div>
      <div className="d-flex justify-content-center mb-2">
        <PackerRestartButton />
      </div>
    </Frame>
  );
};
