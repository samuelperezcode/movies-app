import {cn} from "@/lib/utils";

interface InputProps {
  name: string;
  placeholder: string;
  type: string;
  isRequired: boolean;
  onError: boolean;
}

export function Input({type, name, placeholder, isRequired, onError}: InputProps) {
  return (
    <input
      className={cn(
        "h-[45px] w-[300px] rounded-[10px] bg-input px-4 text-sm font-normal leading-6 text-input focus:border focus:border-input focus:bg-white focus:outline-none active:border active:border-input active:bg-white active:outline-none",
        onError &&
          "text-destructive focus:border focus:border-destructive focus:bg-white focus:outline-none active:border active:border-destructive active:bg-white active:outline-none",
      )}
      name={name}
      placeholder={placeholder}
      required={isRequired}
      type={type}
    />
  );
}
