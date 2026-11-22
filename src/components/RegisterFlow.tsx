import {type SyntheticEvent, useState} from "react";
import {AuthInput} from "./ui/AuthInput.tsx";
import {CheckboxField} from "./ui/CheckboxField.tsx";
import {StepDots} from "./ui/StepDots.tsx";
import {useAuthModal} from "../hooks/useAuthModal.ts";
import {z} from "zod";
import {step1Schema, step2Schema, step3Schema} from "../validation/auth/registerSchema.ts";
import {useRegisterMutation} from "../apis/authApi.ts";

// Допустимі кроки багатоетапної реєстрації
type RegisterStep = 1 | 2 | 3 | 4 | 5;

interface RegisterFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}
interface ErrorsRegisterFormData {
    firstName: string | undefined;
    lastName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    confirmPassword: string | undefined;
    acceptTerms: string | undefined;
    acceptPersonalData: string | undefined;
}

interface RegisterFlowProps {
    onSwitchToLogin: () => void;
    onComplete: () => void;
}

const INITIAL_DATA: RegisterFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
};

const INITIAL_ERRORS_DATA: ErrorsRegisterFormData = {
    firstName: undefined,
    lastName: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
    acceptTerms: undefined,
    acceptPersonalData: undefined,
};

export const RegisterFlow = ({
                                 onSwitchToLogin,
                                 onComplete,
                             }: RegisterFlowProps) => {
    // Мутація реєстрації та стан серверної помилки
    const [register, { isLoading }] = useRegisterMutation();
    const [submitError, setSubmitError] = useState<string | null>(null);

    // Поточний крок та дані форми / помилки валідації
    const [step, setStep] = useState<RegisterStep>(1);
    const [formData, setFormData] = useState<RegisterFormData>(INITIAL_DATA);
    const [errorsFormData, setErrorsFormData] = useState<ErrorsRegisterFormData>(INITIAL_ERRORS_DATA);
    const { openRegister } = useAuthModal();

    // Додаткові прапорці (кроки 2 і 3)
    const [rememberMe, setRememberMe] = useState(false)
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [acceptPersonalData, setAcceptPersonalData] = useState(false);
    const [acceptMarketing, setAcceptMarketing] = useState(false);

    // Лічильник для перезапуску анімації трясіння без зміни ключа інпуту
    const [shakeKey, setShakeKey] = useState(0);

    // Перетворює помилки Zod у плоский об'єкт { [field]: message } (бере першу помилку на поле)
    const mapZodErrors = (error: z.ZodError): Partial<ErrorsRegisterFormData> => {
        const nextErrors: Partial<ErrorsRegisterFormData> = {};

        for (const issue of error.issues) {
            const field = issue.path[0] as keyof ErrorsRegisterFormData | undefined;
            if (field && !nextErrors[field]) {
                nextErrors[field] = issue.message;
            }
        }

        return nextErrors;
    };

    // Очищає помилку конкретного поля при взаємодії користувача з ним
    const clearFieldError = (field: keyof ErrorsRegisterFormData) => {
        setErrorsFormData((prev) => ({
            ...prev,
            [field]: undefined,
        }));
    };

    // Оновлює одне поле у formData зі збереженням типізації ключа і значення
    const updateField = <K extends keyof RegisterFormData>(
        field: K,
        value: RegisterFormData[K],
    ) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    // Перемикає крок і скидає попередню серверу помилку
    const handleSetStep = (handleStep:RegisterStep) => {
        setSubmitError(null);
        setStep(handleStep);
    }

    // Валідація поточного кроку перед переходом далі (кроки 1 -> 2 -> 3 -> 4)
    const handleNextStep = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (step === 1) {
            const result = step1Schema.safeParse({
                firstName: formData.firstName,
                lastName: formData.lastName,
                email: formData.email,
            });

            if (!result.success) {
                setErrorsFormData((prev) => ({
                    ...prev,
                    firstName: undefined,
                    lastName: undefined,
                    email: undefined,
                    ...mapZodErrors(result.error),
                }));
                setShakeKey((prev) => prev + 1);
                return;
            }

            // Зберігаємо нормалізовані (наприклад, затримлені через .trim()) значення з Zod
            setFormData((prev) => ({
                ...prev,
                ...result.data,
            }));

            setErrorsFormData((prev) => ({
                ...prev,
                firstName: undefined,
                lastName: undefined,
                email: undefined,
            }));
            handleSetStep(2);
            return;
        }

        if (step === 2) {
            const result = step2Schema.safeParse({
                password: formData.password,
                confirmPassword: formData.confirmPassword,
            });

            if (!result.success) {
                setErrorsFormData((prev) => ({
                    ...prev,
                    password: undefined,
                    confirmPassword: undefined,
                    ...mapZodErrors(result.error),
                }));
                setShakeKey((prev) => prev + 1);
                return;
            }

            setErrorsFormData((prev) => ({
                ...prev,
                password: undefined,
                confirmPassword: undefined,
            }));
            handleSetStep(3);
            return;
        }

        if (step === 3) {
            const result = step3Schema.safeParse({
                acceptTerms,
                acceptPersonalData,
            });

            if (!result.success) {
                setErrorsFormData((prev) => ({
                    ...prev,
                    acceptTerms: undefined,
                    acceptPersonalData: undefined,
                    ...mapZodErrors(result.error),
                }));
                setShakeKey((prev) => prev + 1);
                return;
            }

            setErrorsFormData((prev) => ({
                ...prev,
                acceptTerms: undefined,
                acceptPersonalData: undefined,
            }));
            handleSetStep(4);
            return;
        }
    };

    // Фінальна відправка даних на бекенд після кроку перевірки (крок 4)
    const handleFinalRegister = async () => {

        const payload = new FormData();
        payload.append("firstName", formData.firstName);
        payload.append("lastName", formData.lastName);
        payload.append("email", formData.email);
        payload.append("password", formData.password);
        payload.append("passwordConfirm", formData.confirmPassword);

        // console.log("Register payload:", payload);
        try {
            await register(payload).unwrap();
            onComplete?.();
        } catch (err) {
            // console.error("REGISTER ERROR:", err);

            const data = (
                err as { data?: { message?: string | string[]; error?: string } }
            )?.data;
            const message = Array.isArray(data?.message)
                ? data.message[0]
                : data?.message || data?.error || "Не вдалося завершити реєстрацію";

            setSubmitError(message);
            setShakeKey((prev) => prev + 1);
            return
        }
        openRegister({redirectTo: "/"});
        handleSetStep(5);
    };

    // Повернення на попередній крок зі скиданням серверної помилки
    const handlePrevStep = () => {
        setSubmitError(null);
        setStep((prev) => (prev > 1 ? ((prev - 1) as RegisterStep) : prev));
    };

    return (
        <div className="flex flex-1 flex-col">
            {/* Основний контент поточного кроку */}
            <div className="flex flex-1 flex-col">
                {/* Крок 1: Особисті дані та email */}
                {step === 1 && (
                    <div>
                        <h2 className="text-center text-xl font-medium tracking-tight">
                            Створення нового облікового запису
                        </h2>
                        {/* Поля 1-го кроку */}
                        <form id="register-step-1" onSubmit={handleNextStep} noValidate className="mt-6 flex flex-col">
                            <AuthInput
                                label="Ім'я"
                                type="text"
                                autoComplete="given-name"
                                value={formData.firstName}
                                onChange={(e) => {
                                    updateField("firstName", e.target.value)
                                    clearFieldError("firstName");
                                }}
                                error={errorsFormData.firstName}
                                shakeKey={shakeKey}
                            />

                            <AuthInput
                                containerClassName="mt-4"
                                label="Прізвище"
                                type="text"
                                autoComplete="family-name"
                                value={formData.lastName}
                                onChange={(e) => {
                                    updateField("lastName", e.target.value)
                                    clearFieldError("lastName");
                                }}
                                error={errorsFormData.lastName}
                                shakeKey={shakeKey}
                            />

                            <AuthInput
                                containerClassName="mt-4"
                                label="Електронна пошта"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={(e) => {
                                    updateField("email", e.target.value)
                                    clearFieldError("email");
                                }}
                                error={errorsFormData.email}
                                shakeKey={shakeKey}
                            />
                        </form>
                    </div>
                )}

                {/* Крок 2: Пароль та підтвердження */}
                {step === 2 && (
                    <div>
                        <h2 className="text-center text-xl font-medium tracking-tight">
                            Створіть пароль
                        </h2>
                        {/* Поля 2-го кроку */}
                        <form id="register-step-2" onSubmit={handleNextStep} noValidate className="mt-6 flex flex-col">
                            <AuthInput
                                label="Пароль"
                                type="password"
                                autoComplete="new-password"
                                helperText="Пароль має містити мінімум 8 символів"
                                value={formData.password}
                                onChange={(e) => {
                                    updateField("password", e.target.value)
                                    clearFieldError("password");
                                }}
                                error={errorsFormData.password}
                                shakeKey={shakeKey}
                            />

                            <AuthInput
                                containerClassName="mt-4"
                                label="Підтвердити пароль"
                                type="password"
                                autoComplete="new-password"
                                value={formData.confirmPassword}
                                onChange={(e) => {
                                    updateField("confirmPassword", e.target.value)
                                    clearFieldError("confirmPassword");
                                }}
                                error={errorsFormData.confirmPassword}
                                shakeKey={shakeKey}
                            />

                            <CheckboxField
                                containerClassName="mt-4 font-medium"
                                label="Запам'ятати мене"
                                checked={rememberMe}
                                onChange={(e) =>
                                    setRememberMe(e.target.checked)
                                }
                            />
                        </form>
                    </div>
                )}

                {/* Крок 3: Обов'язкові та маркетингові згоди */}
                {step === 3 && (
                    <div>
                        <h2 className="text-center text-xl font-medium tracking-tight">
                            Погодьтеся з умовами
                        </h2>
                        {/* Чекбокси 3-го кроку */}
                        <form id="register-step-3" onSubmit={handleNextStep} noValidate className="mt-6 flex flex-col">
                            <div className="flex flex-col gap-3.5">
                                <CheckboxField
                                    label="Я погоджуюсь з Умовами використання та Політикою конфіденційності"
                                    checked={acceptTerms}
                                    onChange={(e) => {
                                        setAcceptTerms(e.target.checked);
                                        clearFieldError("acceptTerms");
                                    }}
                                    error={errorsFormData.acceptTerms}
                                    shakeKey={shakeKey}
                                />

                                <CheckboxField
                                    label="Я погоджуюсь на обробку персональної інформації"
                                    checked={acceptPersonalData}
                                    onChange={(e) => {
                                        setAcceptPersonalData(e.target.checked);
                                        clearFieldError("acceptPersonalData");
                                    }}
                                    error={errorsFormData.acceptPersonalData}
                                    shakeKey={shakeKey}
                                />

                                <CheckboxField
                                    label="Я погоджуюсь отримувати новини про новинки, знижки, акції"
                                    checked={acceptMarketing}
                                    onChange={(e) =>
                                        setAcceptMarketing(e.target.checked)
                                    }
                                />
                            </div>
                        </form>
                    </div>
                )}

                {/* Крок 4: Перевірка введених даних перед сабмітом */}
                {step === 4 && (
                    <div>
                        <h2 className="text-center text-xl font-medium tracking-tight text-[#1A1A18]">
                            Перевірте дані
                        </h2>

                        <div className="mt-6 space-y-4 rounded-lg bg-[#F3F1EC] p-4 text-sm text-[#1A1A18]">
                            <div className="flex items-start justify-between gap-2 border-b border-black/10 pb-3">
                                <div>
                                    <p className="text-xs text-gray-500">Особисті дані</p>
                                    <p className="mt-0.5 font-medium">
                                        {formData.firstName} {formData.lastName}
                                    </p>
                                    <p className="text-xs text-gray-700">{formData.email}</p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleSetStep(1)}
                                    className="cursor-pointer text-xs text-gray-600 underline hover:text-gray-900"
                                >
                                    Змінити
                                </button>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs text-gray-500">Умови та згоди</p>
                                    <ul className="mt-0.5 text-xs font-medium">
                                        <li className={`${!acceptTerms && "text-red-700"}`}>{acceptTerms ? "· Умови прийнято" : " · Умови не прийнято"}</li>
                                        <li className={`${!acceptPersonalData && "text-red-700"}`}>{acceptPersonalData ? " · Обробка персональних данних прийнято" : " · Обробка персональних данних не прийнято"}</li>
                                        <li className={`${!acceptMarketing && "text-red-700"}`}>{acceptMarketing ? " · Отримання новин прийнято" : " · Отримання новин не прийнято"}</li>
                                    </ul>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => handleSetStep(3)}
                                    className="cursor-pointer text-xs text-gray-600 underline hover:text-gray-900"
                                >
                                    Змінити
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Крок 5: Екран успішної реєстрації */}
                {step === 5 && (
                    <div className="my-auto text-center ">
                        <h2 className="text-xl font-medium tracking-tight">
                            Реєстрація пройшла успішно!
                        </h2>
                    </div>
                )}
            </div>



            {/* Нижня панель навігації, зафіксована внизу картки */}
            <div className="mt-auto pt-6">
                {submitError && (
                    <>
                        <p
                            role="alert"
                            className="mt-1.5 mb-5 text-center text-xs leading-snug text-red-500"
                        >
                            {submitError}
                        </p>
                    </>
                )}

                {step < 5 ? (
                        step === 1 ? (
                            <button
                                type="submit"
                                form={`register-step-${step}`}
                                className="flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-olive px-5 text-sm font-medium text-white transition hover:bg-olive-light"
                            >
                                Далі
                            </button>) : (
                            <div className="flex gap-px">
                                <button
                                    type="button"
                                    onClick={handlePrevStep}
                                    className="flex h-11 w-full cursor-pointer items-center justify-center rounded-l-full bg-olive px-5 text-sm font-medium text-white transition hover:bg-olive-light"
                                >
                                    Назад
                                </button>
                                {step === 4 ?(
                                    <button
                                        type="button"
                                        onClick={handleFinalRegister}
                                        disabled={isLoading}
                                        className={`flex h-11 w-full items-center justify-center rounded-r-full bg-olive px-5 text-sm font-medium text-white transition ${!isLoading && "cursor-pointer hover:bg-olive-light"}`}
                                    >
                                        {isLoading && (
                                            <span
                                                aria-hidden="true"
                                                className="h-4 w-4 me-2 animate-spin rounded-full border-2 border-white/30 border-t-white"
                                            />
                                        )}
                                        <span className="text-nowrap" >{isLoading ? "Створюємо акаунт..." : "Створити акаунт"}</span>
                                    </button>) : (
                                    <button
                                        type="submit"
                                        form={`register-step-${step}`}
                                        className="flex h-11 w-full cursor-pointer items-center justify-center rounded-r-full bg-olive px-5 text-sm font-medium text-white transition hover:bg-olive-light"
                                    >
                                        Далі
                                    </button>)}
                            </div>
                        )
                ) : (
                    <button
                        type="button"
                        onClick={onComplete}
                        className="flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-olive px-5 text-sm font-medium text-white transition hover:bg-olive-light"
                    >
                        На головну
                    </button>
                )}

                {/* Індикатор прогресу по 5 кроках */}
                <StepDots totalSteps={5} currentStep={step} className={`mt-6 ${step === 5 && 'mb-9'}`}/>

                {/* Перемикання на форму входу на етапах до завершення реєстрації */}
                {step < 5 && (
                    <p className="mt-5 text-center text-xs font-medium">
                        Вже є обліковий запис?{" "}
                        <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="text-gray-600 transition hover:text-gray-800 hover:cursor-pointer"
                        >
                            Увійти
                        </button>
                    </p>
                )}
            </div>
        </div>
    );
};