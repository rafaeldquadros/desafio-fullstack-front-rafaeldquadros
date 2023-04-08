import { useEffect, useState } from "react";
import { ButtonIcon, InputStyled, Organization } from "./style";
import { motion } from "framer-motion";
import Icons from "../../services/icons";
import { IconType } from "react-icons/lib";

export interface IInput {
  placeholder: string;
  message?: string;
  register: any;
  name: string;
  type?: "text" | "password";
  iconposition?: "left" | "right";
  Icon?: IconType;
  maxwidth?: string;
  defaultvalue?: string;
  disabled?: boolean;
  onMask?: (onChangeValue: string) => string;
}

const Input = ({
  placeholder,
  message,
  register,
  name,
  type,
  maxwidth,
  defaultvalue,
  disabled,
  onMask,
  iconposition,
  Icon,
}: IInput) => {
  const [value, setValue] = useState<string>("");
  const isExistValue = value.length > 0;

  useEffect(() => {
    if (defaultvalue) {
      setValue(defaultvalue);
    }
  }, [defaultvalue]);

  const text = message ? message : placeholder;
  let initial = value.length === 0;

  const [isVisible, setIsVisible] = useState<boolean>(false);

  const isPassword = type === "password";

  return (
    <Organization
      initial={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      animate={{ opacity: 1 }}
      type={type}
    >
      {iconposition && (
        <ButtonIcon
          type="button"
          iconposition={iconposition}
          onClick={() => isPassword && setIsVisible(!isVisible)}
        >
          {isPassword ? (
            isVisible ? (
              <Icons.Visible size={25} />
            ) : (
              <Icons.Invisible size={25} />
            )
          ) : Icon ? (
            <Icon />
          ) : (
            ""
          )}
        </ButtonIcon>
      )}
      <InputStyled
        iconposition={iconposition}
        type={type}
        maxwidth={maxwidth}
        message={message}
        style={{
          padding: isExistValue ? "30px 0px 5px 0px" : "5px 0px 5px 0px",
        }}
      >
        {
          <motion.label
            id="input__placeholder"
            initial={
              initial
                ? { opacity: 0 }
                : isExistValue
                ? { x: "3%", y: "0px", opacity: 0 }
                : { y: "-120%", opacity: 1 }
            }
            animate={
              initial
                ? { opacity: 0 }
                : isExistValue
                ? { y: "-120%", opacity: 1 }
                : { x: "3%", y: "0px", opacity: 0 }
            }
            style={message ? { color: "#FA505A" } : {}}
          >
            {text}
          </motion.label>
        }
        <motion.input
          disabled={disabled}
          autocomplete="off"
          type={isPassword ? (isVisible ? "text" : "password") : type}
          value={value === "" && defaultvalue ? defaultvalue : value}
          {...(register &&
            register(name ? name : "", {
              onChange: (obj: any) => {
                if (onMask) {
                  setValue(onMask(obj.target.value));
                }
                if (obj.target.value || obj.target.value === "") {
                  setValue(String(obj.target.value));
                }

                return obj;
              },
            }))}
          placeholder={text}
        />
        {(initial = false)}
      </InputStyled>
    </Organization>
  );
};

export default Input;
