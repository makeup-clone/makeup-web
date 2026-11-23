import {type InputHTMLAttributes, type ReactNode, useEffect, useId, useRef} from "react";

interface CheckboxFieldProps
    extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "id"> {
    label: ReactNode;
    id?: string;
    error?: string;
    containerClassName?: string;
    labelClassName?: string;
    shakeKey?: number;
}

export const CheckboxField = ({
                                  label,
                                  id,
                                  error,
                                  checked,
                                  onChange,
                                  className = "",
                                  containerClassName = "",
                                  labelClassName = "",
                                  shakeKey,
                                  ...inputProps
                              }: CheckboxFieldProps) => {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;
    const isChecked = Boolean(checked);
    const errorId = `${checkboxId}-error`;
    const hasError = Boolean(error);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const el = containerRef.current;
        if (!hasError || !shakeKey || !el) return;

        el.classList.remove("animate-field-shake");
        void el.offsetWidth;
        el.classList.add("animate-field-shake");
    }, [hasError, shakeKey]);

    return (
        <div
            ref={containerRef}
            className={`flex flex-col gap-1.5`}
        >
            <label
                htmlFor={checkboxId}
                className={`flex items-center cursor-pointer gap-5 text-sm font-medium ${containerClassName}`}
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
                <span className={`flex h-5 w-5 items-center justify-center leading-snug rounded-md border border-gray-800 bg-transparent transition-colors peer-checked:border-olive peer-checked:bg-olive peer-focus-visible:ring-2 peer-focus-visible:ring-olive/40 ${
                        hasError
                            ? "border-red-500 focus:inset-ring-2 focus:inset-ring-red-500"
                            : "border-black focus:inset-ring-1 focus:inset-ring-black"
                    }`}>
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

            {hasError && (
                <p
                    id={errorId}
                    role="alert"
                    className="mt-1 text-center text-xs leading-snug text-red-500"
                >
                    {error}
                </p>
            )}
        </div>
    );
};