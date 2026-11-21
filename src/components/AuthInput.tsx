import {type InputHTMLAttributes, useId} from "react";

interface AuthInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
    label: string;
    id?: string;
    containerClassName?: string;
    labelClassName?: string;
}

export const AuthInput = ({
                              label,
                              id,
                              className = "",
                              containerClassName = "",
                              labelClassName = "",
                              ...inputProps
                          }: AuthInputProps) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;

    return (
        <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
            <label
                htmlFor={inputId}
                className={`text-md ${labelClassName}`}
            >
                {label}
            </label>
            <input
                id={inputId}
                className={`h-11 w-full rounded-full border bg-white px-4 text-sm outline-none focus:inset-ring-1 focus:inset-ring-black ${className}`}
                {...inputProps}
            />
        </div>
    );
};