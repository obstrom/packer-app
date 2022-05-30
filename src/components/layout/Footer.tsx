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
          <span>{"."}</span>
        </CreditText>
        <CreditTextSmall className="text-center">
          <span>{"Read more about this project and view source at "}</span>
          <CreditLink
            href="https://github.com/obstrom/packer-app"
            themeColors={themeColors}
          >
            Github
          </CreditLink>
          <span>{"."}</span>
        </CreditTextSmall>
      </div>
    </Container>
  );
};
