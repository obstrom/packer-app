import React, { useContext } from "react";
import { PackerJobResponseStatus } from "../../commons/enums";
import Alert from "react-bootstrap/Alert";
import Stack from "react-bootstrap/Stack";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { PackerResponseContext } from "../../contexts/PackerResponseContext";

type PackerInfoAlertProps = {
  className?: string;
};

export const PackerInfoAlert = ({ className }: PackerInfoAlertProps) => {
  const packerResponseContext = useContext(PackerResponseContext);
  const status: PackerJobResponseStatus =
    packerResponseContext?.status ?? PackerJobResponseStatus.NONE;

  if (status === PackerJobResponseStatus.SUCCESS) return null;
  if (status === PackerJobResponseStatus.NONE) return null;

  let variant = "danger";
  let text = "";

  switch (status) {
    case PackerJobResponseStatus.FAILURE:
      text =
        "Could not find any packing solution for this job. Most likely the items does not fit the container(s). Edit your job and then try again.";
      break;
    case PackerJobResponseStatus.TIMEOUT:
      text =
        "Packing request timed out. Try reducing the amount of containers and items. Then try again.";
      break;
    case PackerJobResponseStatus.ERROR:
      text = "Something went wrong! Please try again.";
  }

  return (
    <Alert variant={variant} className={className}>
      <Stack direction="horizontal" gap={3}>
        <FontAwesomeIcon size="2x" style={{ opacity: 0.75 }} icon={faWarning} />
        <span>{text}</span>
      </Stack>
    </Alert>
  );
};
