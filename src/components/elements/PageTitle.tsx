import React from 'react';
import styled from "styled-components";

const Title = styled.h1`
    color: #FFF;
    font-size: 4rem;
    text-shadow: 0 0.2rem 0.3rem rgb(0 0 0 / 65%);
`

type PageTitleProps = {
    text: string
}

export const PageTitle = ({ text = "" }: PageTitleProps) => {
    return (
        <Title className="text-center py-4">{text}</Title>
    );
};