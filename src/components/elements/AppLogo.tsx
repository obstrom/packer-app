import React, { Dispatch, SetStateAction } from "react";
import styled from "styled-components";
import { Title3DBox } from "./Title3DBox";
import { AppViewStatus } from "../../commons/enums";
import App from "../App";
import { themeColors } from "../../commons/colors";

type AppLogoProps = {
  setViewStatus: Dispatch<SetStateAction<AppViewStatus>>;
};

const Title = styled.h1<any>`
  color: #3b3b3b;
  font-size: 4rem;
  text-shadow: 0 0 0.2rem rgb(0 0 0 / 40%);
`;

const ClickableFrame = styled.div`
  cursor: pointer;
`;

const TitlePack = styled.span<any>`
  color: ${(props) => props.themeColors.brand};
`;

export const AppLogo = ({ setViewStatus }: AppLogoProps) => {
  return (
    <ClickableFrame
      className="d-flex justify-content-center align-items-center"
      onClick={() => setViewStatus(AppViewStatus.START)}
    >
      <Title3DBox />
      <Title className="text-center py-4 fw-light">
        Com
        <TitlePack className="fw-bold" themeColors={themeColors}>
          pack
        </TitlePack>
        ed
      </Title>
    </ClickableFrame>
  );
};
