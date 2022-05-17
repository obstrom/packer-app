import React from "react";
import styled from "styled-components";
import Stack from "react-bootstrap/Stack";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ResultsDataSegmentProps = {
  label: string;
  value: string;
  icon?: IconProp;
  className?: string;
};

const Frame = styled.div`
  background: #c4c4c4;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #505050;
`;

export const ResultsDataSegment = ({
  label,
  value,
  icon,
  className,
}: ResultsDataSegmentProps) => {
  return (
    <Stack className={className}>
      <Frame
        className={`rounded d-flex justify-content-center align-items-center py-2 ${className}`}
      >
        {icon && <Icon icon={icon} className="me-3" size="2x" />}
        <span className="fs-2">{value}</span>
      </Frame>
      <span className="text-center my-2 fs-5">{label}</span>
    </Stack>
  );
};
