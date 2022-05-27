import React from "react";
import Button from "react-bootstrap/Button";
import { themeColors } from "../../commons/colors";

type LargeButtonProps = {
  onClick?: () => void;
  className?: string;
  children?: any;
};

export const LargeButton = ({
  onClick,
  className,
  children,
}: LargeButtonProps) => {
  return (
    <>
      <style type="text/css">
        {`
            .btn-brand {
              background-color: ${themeColors.brand};
              color: ${themeColors.textInverted};
              font-weight: 500;
              letter-spacing: 0.1rem;
            }
            
            .btn-brand:hover, .btn-brand:active {
              background-color: ${themeColors.brandDarker};
              color: ${themeColors.textInverted};
            }
        
            .btn-xxl {
              padding: 1rem 1.5rem;
              font-size: 1.5rem;
            }
        `}
      </style>
      <Button
        variant="brand"
        className={`${className} btn-xxl`}
        onClick={onClick}
      >
        {children}
      </Button>
    </>
  );
};
