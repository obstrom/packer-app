import React, {Dispatch, SetStateAction} from 'react';
import Accordion from "react-bootstrap/Accordion";
import {AddForm} from "./AddForm";
import {Bin, Item} from "../common/types";

type AddObjectContainerProps = {
    setBins: Dispatch<SetStateAction<Array<Bin>>>
    setItems: Dispatch<SetStateAction<Array<Item>>>
    className?: string
}

export const AddObjectContainer = ({ setBins, setItems, className }: AddObjectContainerProps) => {
    return (
        <Accordion className={className} defaultActiveKey="0">
            <Accordion.Item eventKey="0">
                <Accordion.Header>Add object</Accordion.Header>
                <Accordion.Body>
                    <AddForm setContainers={setBins} setItems={setItems} />
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    );
};