import React from "react";
import Container from "react-bootstrap/Container";
import { VisContainer } from "../../commons/types";
import { Results3DVisualization } from "../elements/Results3DVisualization";

type PackageResults3DViewProps = {
  visData: Array<VisContainer>;
};

export const PackageResults3DView = ({
  visData,
}: PackageResults3DViewProps) => {
  return (
    <Container className="rounded">
      <Results3DVisualization visData={visData} />
    </Container>
  );
};
