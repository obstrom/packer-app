import React from "react";
import styled from "styled-components";
import { Title3DBox } from "./Title3DBox";

type PageTitleProps = {
  text: string;
};

const Title = styled.h1`
  color: #3b3b3b;
  font-size: 4rem;
  text-shadow: 0 0.2rem 0.3rem rgb(0 0 0 / 45%);
`;

export const PageTitle = ({ text = "" }: PageTitleProps) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <Title3DBox />
      <Title className="text-center py-4">{text}</Title>
    </div>
  );
};
