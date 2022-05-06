import React, {Dispatch, SetStateAction} from 'react';

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import {Bin, Item} from "../common/types";

type AddFormProps = {
    setContainers: Dispatch<SetStateAction<Array<Bin>>>
    setItems: Dispatch<SetStateAction<Array<Item>>>
}

export const AddForm = ({ setContainers, setItems }: AddFormProps) => {
    return (
        <Container>
            <Form>
            </Form>
        </Container>
    );
};