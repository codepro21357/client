import React from "react";

interface ButtonProps {
  type: string;
  size?: string;
  rounded?: boolean;
  disabled?: boolean;
  children: React.ReactNode;
  width?: string;
  tight?: boolean;
  handleClick?: () => void;
}

const Button = ({
  type,
  size,
  rounded,
  width,
  tight,
  disabled,
  handleClick,
  children,
}: ButtonProps) => {
  return (
    <button
      className={`cursor-pointer transition-all duration-300
        ${width === "full" ? "w-full" : ""} 
        ${size === "big" ? "py-4" : "py-3"}
        ${rounded ? "rounded-3xl" : "rounded-lg"}
        
        ${
          type === "primary"
            ? "text-white bg-primary-500 hover:bg-primary-500/80"
            : ""
        } 
        ${
          type === "secondary"
            ? "text-white bg-gray-400 hover:bg-gray-400/80"
            : ""
        } 
        ${type === "neutral" ? "text-black bg-white hover:bg-white/80" : ""}
        ${
          type === "gradient"
            ? "bg-button-gradient hover:bg-button-gradient-hover"
            : ""
        }
        ${
          type === "accent"
            ? "text-white bg-[#07cbbd] hover:bg-[#07cbbd]/70"
            : ""
        }
        ${tight ? "px-4" : "px-10"}
      `}
      disabled={disabled}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};

export default Button;
