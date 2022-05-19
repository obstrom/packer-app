import React, { Dispatch, SetStateAction } from "react";
import Container from "react-bootstrap/Container";
import { AppLogo } from "../elements/AppLogo";
import Button from "react-bootstrap/Button";
import { AppViewStatus } from "../../commons/enums";
import styled from "styled-components";

type StartViewProps = {
  setViewStatus: Dispatch<SetStateAction<AppViewStatus>>;
  className?: string;
};

const Frame = styled(Container)`
  background: #e8e8e8;
`;

export const StartView = ({ setViewStatus, className }: StartViewProps) => {
  return (
    <div className={`${className} mt-5`}>
      <Frame fluid="sm" className="text-center rounded border px-5">
        <AppLogo />
        <h2 className="fs-1 fw-light my-4">
          An online tool for optimizing your packing jobs
        </h2>
        <h2 className="fs-3 fw-bold my-4 py-4">
          Minimize costs and wasted space in your package deliveries!
        </h2>
        <Button
          className="mb-5"
          size="lg"
          onClick={() => setViewStatus(AppViewStatus.SETUP)}
        >
          Get started
        </Button>
      </Frame>
    </div>
  );
};
