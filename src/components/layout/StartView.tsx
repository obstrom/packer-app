import React, { Dispatch, SetStateAction } from "react";
import Container from "react-bootstrap/Container";
import { AppLogo } from "../elements/AppLogo";
import Button from "react-bootstrap/Button";
import { AppViewStatus } from "../../commons/enums";
import styled from "styled-components";
import { themeColors } from "../../commons/colors";
import { LargeButton } from "../controls/LargeButton";

type StartViewProps = {
  setViewStatus: Dispatch<SetStateAction<AppViewStatus>>;
  className?: string;
};

const Frame = styled<any>(Container)`
  background: ${(props) => props.themeColors.secondary};
`;

export const StartView = ({ setViewStatus, className }: StartViewProps) => {
  return (
    <div className={`${className} mt-5`}>
      <Frame
        themeColors={themeColors}
        fluid="sm"
        className="text-center rounded border p-5"
      >
        <h2 className="fs-1 fw-light my-4">
          An online tool for optimizing your packing jobs
        </h2>
        <h2 className="fs-3 fw-bold my-4 py-4">
          Minimize costs and wasted space in your package deliveries!
        </h2>
        <LargeButton onClick={() => setViewStatus(AppViewStatus.SETUP)}>
          GET STARTED
        </LargeButton>
      </Frame>
    </div>
  );
};
