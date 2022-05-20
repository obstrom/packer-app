import React from "react";
import Container from "react-bootstrap/Container";
import { VisContainer } from "../../commons/types";
import { Results3DVisualization } from "../elements/Results3DVisualization";
import styled from "styled-components";
import { themeColors } from "../../commons/colors";

type PackageResults3DViewProps = {
  visContainerData: VisContainer;
};

const VisualizationContainer = styled<any>(Container)`
  background: ${(props) => props.themeColors.secondaryDark};
  height: 300px;
`;

export const PackageResults3DView = ({
  visContainerData,
}: PackageResults3DViewProps) => {
  return (
    <VisualizationContainer
      className="rounded border"
      themeColors={themeColors}
    >
      <Results3DVisualization visContainerData={visContainerData} />
    </VisualizationContainer>
  );
};
