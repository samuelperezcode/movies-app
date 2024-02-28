import {cn} from "@/lib/utils";

interface InputProps {
  name: string;
  placeholder: string;
  type: string;
  isRequired: boolean;
  onError: boolean;
  defaultValue?: string | number;
}

export function Input({type, name, placeholder, isRequired, onError, defaultValue}: InputProps) {
  return (
    <input
      className={cn(
        "h-[45px] w-[300px] rounded-[10px] bg-input px-4 text-sm font-normal leading-6 text-input text-white focus:border focus:border-input focus:bg-white focus:text-input focus:outline-none active:border active:border-input active:bg-white active:outline-none",
        onError &&
          "text-destructive focus:border focus:border-destructive focus:bg-white focus:outline-none active:border active:border-destructive active:bg-white active:outline-none",
      )}
      defaultValue={defaultValue}
      name={name}
      placeholder={placeholder}
      required={isRequired}
      type={type}
    />
  );
}
