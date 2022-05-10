import React from "react";
import Badge from "react-bootstrap/Badge";
import { Item } from "../../commons/types";

type QuantityBadgeProps = {
  item: Item;
  className?: string;
};

export const QuantityBadge = ({ item, className }: QuantityBadgeProps) => {
  return (
    <Badge
      bg="light"
      className={`d-flex align-items-center text-dark ${className}`}
    >{`x${item.quantity}`}</Badge>
  );
};
