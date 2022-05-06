import React from 'react';
import Accordion from "react-bootstrap/Accordion";
import {Bin, Item} from "../common/types";
import styled from "styled-components";

const EmptyAccordionButton = styled.div`
  &:after {
    display: none;
  }
`

type ListPackerObjectFrameProps = {
    headerTitle: string
    packerObjects: Array<Bin> | Array<Item>
    className?: string
}

export const ListPackerObjectFrame = ({ headerTitle, packerObjects, className }: ListPackerObjectFrameProps) => {
    const headerTitleAmount = `${headerTitle} (${packerObjects.length})`;

    return (
        <>
            {<div className={`accordion ${className}`}>
                <div className="accordion-item">
                    <h2 className="accordion-header">
                        <EmptyAccordionButton className="accordion-button collapsed">
                            {headerTitleAmount}
                        </EmptyAccordionButton>
                    </h2>
                </div>
            </div>}
            {packerObjects.length > 0 && <Accordion className={className}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>{headerTitleAmount}</Accordion.Header>
                    <Accordion.Body>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>}
        </>
    );
};