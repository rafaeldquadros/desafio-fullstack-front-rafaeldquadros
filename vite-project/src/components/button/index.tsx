import { ReactNode } from "react";
import { StyledButton } from "./style";

interface IPropsButton {
  children: ReactNode;
  type: "submit" | "button";
  color: "gold" | "red" | "blue";
  maxwidth?: string;
  size?: "small" | "medium" | "large";
  disable?: boolean;
  line?: boolean;
  position?: "center" | "left";
  onclick?: Function;
  margin?: string;
}

const Button = (props: IPropsButton) => {
  return (
    <StyledButton
      onClick={(e) => props?.onclick && props?.onclick(e)}
      type={props.type}
      whileTap={{ scale: 0.98 }}
      disabled={props?.disable}
      color={props?.color}
      size={props?.size}
      maxwidth={props?.maxwidth}
      line={props?.line}
      position={props?.position}
      margin={props.margin}
    >
      {props.children}
    </StyledButton>
  );
};

export default Button;
