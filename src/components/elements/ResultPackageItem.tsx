import React from "react";
import { ResultItem } from "../../commons/types";
import styled from "styled-components";
import Stack from "react-bootstrap/Stack";
import { QuantityBadge } from "./QuantityBadge";
import { renderDimensions } from "../../commons/displayCalculations";

type ResultPackageItemProps = {
  item: ResultItem; // TODO - This needs to be updated
  className?: string;
};

const ItemContainer = styled(Stack)`
  background: #606060;
  color: #fff;
`;

export const ResultPackageItem = ({
  item,
  className,
}: ResultPackageItemProps) => {
  return (
    <ItemContainer
      direction="horizontal"
      className={`${className} p-2 my-1 rounded justify-content-between`}
    >
      <div className="d-flex">
        <QuantityBadge quantity={item.quantity} />
        <span className="flex-grow-1 px-2 border-end">
          {
            renderDimensions(
              item.dimensions.width,
              item.dimensions.depth,
              item.dimensions.height,
              ""
            ) /* TODO - Handle unit */
          }
        </span>
        <span className="px-2 text-truncate d-inline-block">
          <em>{item.description}</em>
        </span>
      </div>
    </ItemContainer>
  );
};
