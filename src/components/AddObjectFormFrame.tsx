import React, { Dispatch, SetStateAction } from "react";
import { AddForm } from "./AddForm";
import { Bin, Item } from "../common/types";
import Container from "react-bootstrap/Container";
import styled from "styled-components";

type AddObjectContainerProps = {
  bins: Array<Bin>;
  setBins: Dispatch<SetStateAction<Array<Bin>>>;
  items: Array<Item>;
  setItems: Dispatch<SetStateAction<Array<Item>>>;
  className?: string;
};

const Frame = styled(Container)`
  background: #e8e8e8;
`;

export const AddObjectContainer = ({
  bins,
  setBins,
  items,
  setItems,
  className,
}: AddObjectContainerProps) => {
  return (
    <Frame className={className}>
      <h3>Add object</h3>
      <AddForm
        bins={bins}
        setBins={setBins}
        items={items}
        setItems={setItems}
      />
    </Frame>
  );
};
