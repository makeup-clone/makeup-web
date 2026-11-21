import {type InputHTMLAttributes, useId} from "react";

interface AuthInputProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "id"> {
    label: string;
    id?: string;
    error?: string;
    helperText?: string;
    containerClassName?: string;
    labelClassName?: string;
}

export const AuthInput = ({
                              label,
                              id,
                              error,
                              helperText,
                              className = "",
                              containerClassName = "",
                              labelClassName = "",
                              ...inputProps
                          }: AuthInputProps) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = `${inputId}-error`;
    const helperId = `${inputId}-helper`;
    const hasError = Boolean(error);

    const describedBy = [
        hasError ? errorId : null,
        helperText ? helperId : null,
    ]
        .filter(Boolean)
        .join(" ") || undefined;

    return (
        <div className={`flex flex-col gap-1.5 ${containerClassName}`}>
            <label
                htmlFor={inputId}
                className={`text-md ${labelClassName}`}
            >
                {label}
            </label>

            {helperText && (
                <span
                    id={helperId}
                    className="mb-1.5 text-xs text-gray-500"
                >
                        {helperText}
                    </span>
            )}

            <input
                id={inputId}
                aria-invalid={hasError}
                aria-describedby={describedBy}
                className={`h-11 w-full rounded-full border bg-white px-4 text-sm text-black outline-none transition-colors ${
                    hasError
                        ? "border-red-500 focus:inset-ring-1 focus:inset-ring-red-500"
                        : "border-black focus:inset-ring-1 focus:inset-ring-black"
                } ${className}`}
                {...inputProps}
            />

            {hasError && (
                <p
                    id={errorId}
                    role="alert"
                    className="mt-1.5 text-center text-xs leading-snug text-red-500"
                >
                    {error}
                </p>
            )}
        </div>
    );
};