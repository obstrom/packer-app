import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Logo3DBox } from "./Logo3DBox";
import { AppViewStatus } from "../../commons/enums";
import { themeColors } from "../../commons/colors";
import Container from "react-bootstrap/Container";

type AppLogoProps = {
  setViewStatus: Dispatch<SetStateAction<AppViewStatus>>;
};

const Title = styled.h1<any>`
  color: #3b3b3b;
  font-size: 3.2rem;
  text-shadow: 0 0 0.3rem rgb(0 0 0 / 40%);
`;

const ClickableFrame = styled.div`
  cursor: pointer;
  user-select: none;
`;

const TitlePack = styled.span<any>`
  color: ${(props) => props.themeColors.brand};
`;

export const AppLogo = ({ setViewStatus }: AppLogoProps) => {
  return (
    <Container fluid="sm">
      <div
        className="d-flex justify-content-center align-items-center"
        onClick={() => setViewStatus(AppViewStatus.START)}
      >
        <ClickableFrame className="d-flex justify-content-center align-items-center pe-4">
          <Logo3DBox />
          <Title className="text-center py-4 fw-light">
            Com
            <TitlePack className="fw-bold" themeColors={themeColors}>
              pack
            </TitlePack>
            ed
          </Title>
        </ClickableFrame>
      </div>
    </Container>
  );
};
