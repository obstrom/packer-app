import React, {Dispatch, SetStateAction} from 'react';
import {AddForm} from "./AddForm";
import {Bin, Item} from "../common/types";
import Container from "react-bootstrap/Container";
import styled from "styled-components";

const Frame = styled(Container)`
  background: #e8e8e8;
`;

type AddObjectContainerProps = {
    setBins: Dispatch<SetStateAction<Array<Bin>>>
    setItems: Dispatch<SetStateAction<Array<Item>>>
    className?: string
}

export const AddObjectContainer = ({ setBins, setItems, className }: AddObjectContainerProps) => {
    return (
        <Frame className={className}>
            <h3>Add object</h3>
            <AddForm setContainers={setBins} setItems={setItems} />
        </Frame>
    );
};