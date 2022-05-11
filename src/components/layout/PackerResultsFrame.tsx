import React, { useContext } from "react";
import { PackerResponseContext } from "../../contexts/PackerResponseContext";
import { ResultContainer, VisContainer } from "../../commons/types";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";

export const PackerResultsFrame = () => {
  const packerResponseContext = useContext(PackerResponseContext);

  const packerResults: Array<ResultContainer> =
    packerResponseContext?.results ?? [];
  const visData: Array<VisContainer> = packerResponseContext?.visData ?? [];

  return (
    <Container>
      {/* TODO - Remove this test JSX */}
      <Row>
        {packerResults.map((container, index) => (
          <p key={index}>{`Container ${container.id}`}</p>
        ))}
      </Row>
      <Row>
        {visData.map((container, index) => (
          <p key={index}>{`VisData container ${container.id}`}</p>
        ))}
      </Row>
    </Container>
  );
};
