import React from "react";
import Button from "react-bootstrap/Button";
import { themeColors } from "../../commons/colors";
import { ButtonVariant } from "react-bootstrap/types";

type StandardButtonProps = {
  variant?: ButtonVariant | "brand";
  disabled?: boolean;
  size?: "sm" | "lg";
  type?: "submit" | "button";
  onClick?: () => void;
  className?: string;
  children?: any;
};

export const StandardButton = ({
  variant = "brand",
  disabled = false,
  size = undefined,
  type = "button",
  onClick,
  className,
  children,
}: StandardButtonProps) => {
  return (
    <>
      <style type="text/css">
        {`
            .btn-brand {
              background-color: ${themeColors.brand};
              color: ${themeColors.textInverted};
              font-weight: 600;
            }
            
            .btn-brand:hover, .btn-brand:active {
              background-color: ${themeColors.brandDarker};
              color: ${themeColors.textInverted};
            }
        `}
      </style>
      <Button
        variant={variant}
        className={className}
        onClick={onClick}
        size={size}
        type={type}
        disabled={disabled}
      >
        {children}
      </Button>
    </>
  );
};
