import React from "react";
import Badge from "react-bootstrap/Badge";

type QuantityBadgeProps = {
  quantity: number;
  className?: string;
};

export const QuantityBadge = ({ quantity, className }: QuantityBadgeProps) => {
  return (
    <Badge
      bg="light"
      className={`d-flex align-items-center text-dark ${className}`}
    >{`x${quantity}`}</Badge>
  );
};
