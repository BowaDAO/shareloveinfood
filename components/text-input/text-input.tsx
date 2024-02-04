import { ChangeEvent } from "react";
import Image from "next/image";
import hidepassword from "@/public/assets/hidepassword.png";
import showpassword from "@/public/assets/showpassword.png";

type Props = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  value: string;
  passwordField?: boolean;
  setPasswordVisible?: boolean;
  togglePasswordIcon?: () => void;
  type: string;
  disabled?: boolean;
  id: string;
};

const TextInput = (props: Props) => {
  return (
    <span className="flex flex-col gap-2">
      <label htmlFor={props.label} className="text-secondary">
        {props.label}
      </label>

      <span className="relative w-full">
        <input
          type={props.type}
          value={props.value}
          name={props.id}
          id={props.id}
          onChange={props.onChange}
          required
          disabled={props.disabled}
          className="h-12 text-base w-full border-secondary border-[1px] px-4 py-3 text-black"
        />

        <>
          {props.passwordField && (
            <button
              type="button"
              onClick={props.togglePasswordIcon}
              className="absolute right-3 top-3"
            >
              {props.setPasswordVisible ? (
                <Image
                  src={hidepassword}
                  alt="hide password icon"
                  height={24}
                  width={24}
                  priority={true}
                />
              ) : (
                <Image
                  src={showpassword}
                  alt="show password icon"
                  height={24}
                  width={24}
                  priority={true}
                />
              )}
            </button>
          )}
        </>
      </span>
    </span>
  );
};

export default TextInput;
