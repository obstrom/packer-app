import React from "react";
import { ResultContainer } from "../../commons/types";

type ResultPackageItemProps = {
  item: any; // TODO - This needs to be updated
  className?: string;
};

export const ResultPackageItem = ({
  item,
  className,
}: ResultPackageItemProps) => {
  return <div className={className}></div>;
};
