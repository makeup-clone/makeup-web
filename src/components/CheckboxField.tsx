import {type InputHTMLAttributes, type ReactNode, useId} from "react";

interface CheckboxFieldProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id"> {
    label: ReactNode;
    id?: string;
    containerClassName?: string;
    labelClassName?: string;
}

export const CheckboxField = ({
                                  label,
                                  id,
                                  checked,
                                  onChange,
                                  className = "",
                                  containerClassName = "",
                                  labelClassName = "",
                                  ...inputProps
                              }: CheckboxFieldProps) => {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;
    const isChecked = Boolean(checked);

    return (
        <label
            htmlFor={checkboxId}
            className={`flex cursor-pointer items-start gap-5 text-sm font-medium ${containerClassName}`}
        >
            <span className="relative flex h-5 w-5 shrink-0 items-center justify-center">
                <input
                    id={checkboxId}
                    type="checkbox"
                    checked={checked}
                    onChange={onChange}
                    className={`peer sr-only ${className}`}
                    {...inputProps}
                />
                <span className="flex h-5 w-5 items-center justify-center rounded-md border-[1.5px] border-gray-800 bg-transparent transition-colors peer-checked:border-olive peer-checked:bg-olive peer-focus-visible:ring-2 peer-focus-visible:ring-olive/40">
                    <svg
                        viewBox="0 0 14 14"
                        fill="none"
                        aria-hidden="true"
                        className={`h-3.5 w-3.5 text-white transition-opacity ${
                            isChecked ? "opacity-100" : "opacity-0"
                        }`}
                    >
                        <path
                            d="M2.5 7.5L5.5 10.5L11.5 3.5"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </span>
            <span className={`leading-normal ${labelClassName}`}>{label}</span>
        </label>
    );
};