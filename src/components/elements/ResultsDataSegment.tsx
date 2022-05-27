import React from "react";
import styled from "styled-components";
import Stack from "react-bootstrap/Stack";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { themeColors } from "../../commons/colors";

type ResultsDataSegmentSize = "sm" | "lg";

type ResultsDataSegmentProps = {
  label: string;
  value: string;
  size: ResultsDataSegmentSize;
  icon?: IconProp;
  className?: string;
};

const Frame = styled.div<any>`
  background: #fff;
`;

const Icon = styled(FontAwesomeIcon)`
  color: #505050;
`;

export const ResultsDataSegment = ({
  label,
  value,
  size,
  icon,
  className,
}: ResultsDataSegmentProps) => {
  return (
    <Stack className={className}>
      <Frame
        className={`rounded d-flex justify-content-center align-items-center py-2 ${className}`}
        themeColors={themeColors}
      >
        {icon && (
          <Icon
            icon={icon}
            className={size === "lg" ? "me-3" : "me-2"}
            size={size === "lg" ? "2x" : "lg"}
          />
        )}
        <span className={size === "lg" ? "fs-2" : "fs-4"}>{value}</span>
      </Frame>
      <span
        className={`text-center ${size === "lg" ? "my-2 fs-5" : "my-1 fs-6"}`}
      >
        {label}
      </span>
    </Stack>
  );
};
