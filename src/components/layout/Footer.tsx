import React from "react";
import Container from "react-bootstrap/Container";
import styled from "styled-components";
import { themeColors } from "../../commons/colors";

type FooterProps = {
  className?: string;
};

const CreditText = styled.p`
  color: #363636;
  font-size: 0.75rem;
`;

const CreditTextSmall = styled.p`
  color: #363636;
  font-size: 0.65rem;
`;

const CreditLink = styled.a<any>`
  color: #3b3b3b;
  font-weight: bold;
  &:hover,
  &:active,
  &:focus {
    color: ${(props) => props.themeColors.brand};
  }
`;

export const Footer = ({ className }: FooterProps) => {
  return (
    <Container className={className}>
      <div className="p-2">
        <CreditText className="text-center">
          <span>{"Created by "}</span>
          <CreditLink
            href="https://github.com/obstrom"
            themeColors={themeColors}
          >
            Oscar Bergström
          </CreditLink>
          <span>{". Last updated 05-2022"}</span>
        </CreditText>
        <CreditTextSmall className="text-center">
          <span>
            {
              "Built with React.js, Typescript, Bootstrap-React and Three.js (react-three-fiber). "
            }
          </span>
          <span>{"Queries a "}</span>
          <br />
          <CreditLink
            href="https://github.com/obstrom/packer-app-api"
            themeColors={themeColors}
          >
            Java Spring Boot API
          </CreditLink>
          <span>
            {" created for this project for all packing calculations."}
          </span>
          <br />
          <span>
            {
              "The API relies upon and extends the open-source bin packing package "
            }
          </span>
          <CreditLink
            href="https://github.com/skjolber/3d-bin-container-packing"
            themeColors={themeColors}
          >
            3d-bin-container-packing
          </CreditLink>
          <span>{"."}</span>
        </CreditTextSmall>
      </div>
    </Container>
  );
};
