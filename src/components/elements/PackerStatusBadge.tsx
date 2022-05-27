import React, { useContext } from "react";
import { PackerJobResponseStatus } from "../../commons/enums";
import Badge from "react-bootstrap/Badge";
import { PackerResponseContext } from "../../contexts/PackerResponseContext";

type PackerStatusBadgeProps = {
  className?: string;
};

export const PackerStatusBadge = ({ className }: PackerStatusBadgeProps) => {
  const packerResponseContext = useContext(PackerResponseContext);
  const status: PackerJobResponseStatus =
    packerResponseContext?.status ?? PackerJobResponseStatus.NONE;

  switch (status) {
    case PackerJobResponseStatus.SUCCESS:
      return null;
    case PackerJobResponseStatus.FAILURE:
      return (
        <Badge className={`ms-2 ${className}`} bg="danger">
          Failure!
        </Badge>
      );
    case PackerJobResponseStatus.TIMEOUT:
      return (
        <Badge className={`ms-2 ${className}`} bg="danger">
          Timeout!
        </Badge>
      );
    case PackerJobResponseStatus.ERROR:
      return (
        <Badge className={`ms-2 ${className}`} bg="danger">
          Error!
        </Badge>
      );
    case PackerJobResponseStatus.NONE:
      return null;
  }
};
