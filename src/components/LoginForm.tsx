import {type SyntheticEvent, useState} from "react";
import {AuthInput} from "./AuthInput.tsx";
import {CheckboxField} from "./CheckboxField.tsx";
import {loginSchema} from "../validation/auth/loginSchema.ts";
import {z} from "zod";
import {useLoginMutation} from "../apis/authApi.ts";

interface LoginFormProps {
    onSwitchToRegister: () => void;
    onSuccess: () => void;
    onForgotPassword?: () => void;
}

interface LoginFormData {
    email: string;
    password: string;
}

interface LoginErrors {
    email: string | undefined;
    password: string | undefined;
}

const INITIAL_LOGIN_DATA: LoginFormData = {
    email: "",
    password: "",
};

const INITIAL_LOGIN_ERRORS: LoginErrors = {
    email: undefined,
    password: undefined,
};

export const LoginForm = ({
                              onSwitchToRegister,
                              onSuccess,
                              onForgotPassword,
                          }: LoginFormProps) => {
    const [login, { isLoading }] = useLoginMutation();
    const [submitError, setSubmitError] = useState<string | null>(null);
    const [formData, setFormData] = useState<LoginFormData>(INITIAL_LOGIN_DATA);
    const [errors, setErrors] = useState<LoginErrors>(INITIAL_LOGIN_ERRORS);
    const [rememberMe, setRememberMe] = useState(false);
    const [shakeKey, setShakeKey] = useState(0);

    const mapLoginZodErrors = (error: z.ZodError): Partial<LoginErrors> => {
        const mapped: Partial<LoginErrors> = {};

        for (const issue of error.issues) {
            const field = issue.path[0] as keyof LoginErrors | undefined;
            if (field && !mapped[field]) {
                mapped[field] = issue.message;
            }
        }

        return mapped;
    };

    const updateField = <K extends keyof LoginFormData>(
        field: K,
        value: LoginFormData[K],
    ) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const clearFieldError = (field: keyof LoginErrors) => {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitError(null);

        const result = loginSchema.safeParse(formData);

        if (!result.success) {
            setErrors({
                email: undefined,
                password: undefined,
                ...mapLoginZodErrors(result.error),
            });
            setShakeKey((prev) => prev + 1);
            return;
        }

        setErrors(INITIAL_LOGIN_ERRORS);

        // const payload = {
        //     email: result.data.email,
        //     password: result.data.password,
        //     rememberMe,
        // };
        //
        // console.log("Login payload:", payload);
        try {
            await login({
                email: result.data.email,
                password: result.data.password,
            }).unwrap();

            onSuccess?.();
        } catch (err) {
            // console.error("LOGIN ERROR:", err);

            const data = (err as { data?: { message?: string | string[]; error?: string } })?.data;
            const message = Array.isArray(data?.message)
                ? data.message[0]
                : data?.message || data?.error || "Невірна email або пароль";

            setSubmitError(message);
            setShakeKey((prev) => prev + 1);
            return
        }
        onSuccess();
    };

    return (
        <div>
            <h2 className="text-center text-xl font-medium tracking-tight">
                Увійти до особистого кабінету
            </h2>

            {/* Болванка для входу через Google */}
            <button
                type="button"
                onClick={() => {
                    // TODO: логіка входу через Google
                }}
                className="mt-6 flex h-11 w-full cursor-pointer items-center justify-center rounded-full border bg-white px-5 text-sm transition hover:bg-[#F3F1EC]"
            >
                Увійти через Google
            </button>

            <div className="my-3 text-center text-sm text-gray-700">або</div>

            <form onSubmit={handleSubmit} noValidate className="flex flex-col">
                <AuthInput
                    label="Електронна пошта"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={(e) => {
                        updateField("email", e.target.value);
                        clearFieldError("email");
                    }}
                    error={errors.email}
                    shakeKey={shakeKey}
                />

                <AuthInput
                    containerClassName="mt-4"
                    label="Пароль"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={(e) => {
                        updateField("password", e.target.value);
                        clearFieldError("password");
                    }}
                    error={errors.password}
                    shakeKey={shakeKey}
                />

                {/* Шаблонна кнопка для відновлення пароля */}
                <div className="mt-2">
                    <button
                        type="button"
                        onClick={() => {
                            if (onForgotPassword) {
                                onForgotPassword();
                            }
                            // TODO: відкриття відновлення пароля
                        }}
                        className="cursor-pointer text-xs text-gray-600 hover:text-gray-800 hover:underline"
                    >
                        Забули пароль?
                    </button>
                </div>

                {submitError && (
                    <>
                        <p
                            role="alert"
                            className="mt-1.5 text-center text-xs leading-snug text-red-500"
                        >
                            {submitError}
                        </p>
                    </>
                )}

                <button
                    type="submit"
                    disabled={isLoading}
                    className={`mt-5 flex h-11 w-full items-center justify-center rounded-full bg-olive px-5 text-sm font-medium text-white transition ${!isLoading && "cursor-pointer hover:bg-olive-light"}`}
                >
                    {isLoading && (
                        <span
                            aria-hidden="true"
                            className="h-4 w-4 me-2 animate-spin rounded-full border-2 border-white/30 border-t-white"
                        />
                    )}
                    <span>{isLoading ? "Входимо..." : "Увійти"}</span>
                </button>

                {/* Шаблонна кнопка запам'ятати мене */}
                <CheckboxField
                    containerClassName="mt-4"
                    label={<span>Запам&apos;ятати мене</span>}
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                />

                <p className="mt-6 text-center text-xs font-medium">
                    Немає облікового запису?{" "}
                    <button
                        type="button"
                        onClick={onSwitchToRegister}
                        className="cursor-pointer text-gray-600 transition hover:text-gray-800"
                    >
                        Зареєструватися
                    </button>
                </p>
            </form>
        </div>
    );
};