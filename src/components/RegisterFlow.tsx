import {type SyntheticEvent, useState} from "react";
import {AuthInput} from "./AuthInput.tsx";
import {CheckboxField} from "./CheckboxField.tsx";
import {StepDots} from "./StepDots.tsx";
import {useAuthModal} from "../hooks/useAuthModal.ts";

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
    firstName: "Ім'я є обов'язковим",
    lastName: "Прізвище є обов'язковим",
    email: "Невірний формат пошти",
    password: "Пароль має містити мінімум 8 символів",
    confirmPassword: "Паролі не співпадають"
};

export const RegisterFlow = ({
                                 onSwitchToLogin,
                                 onComplete,
                             }: RegisterFlowProps) => {
    const [step, setStep] = useState<RegisterStep>(1);
    const [formData, setFormData] = useState<RegisterFormData>(INITIAL_DATA);
    const [errorsFormData, setErrorsFormData] = useState<ErrorsRegisterFormData>(INITIAL_ERRORS_DATA);
    const { openRegister } = useAuthModal();

    const [rememberMe, setRememberMe] = useState(false)
    const [acceptTerms, setAcceptTerms] = useState(false);
    const [acceptPersonalData, setAcceptPersonalData] = useState(false);
    const [acceptMarketing, setAcceptMarketing] = useState(false);

    // const [errorFirstName, setErrorFirstName] = useState<string | undefined>("Ім'я є обов'язковим");
    // const [errorLastName, setErrorLastName] = useState<string | undefined>("Прізвище є обов'язковим");
    // const [errorEmail, setErrorEmail] = useState<string | undefined>("Невірний формат пошти");
    // const [errorPassword, setErrorPassword] = useState<string | undefined>("Пароль має містити мінімум 8 символів");
    // const [errorConfirmPassword, setErrorConfirmPassword] = useState<string | undefined>("Паролі не співпадають");


    const updateField = <K extends keyof RegisterFormData>(
        field: K,
        value: RegisterFormData[K],
    ) => {
        setFormData((prev) => ({...prev, [field]: value}));
    };

    const handleNextStep = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (step === 1) {
            setStep(2);
            return;
        }

        if (step === 2) {
            setStep(3);
            return;
        }

        if (step === 3) {
            setStep(4);
            return;
        }
    };

    const handleFinalRegister = () => {
        // Тут згодом буде RTK Query мутація реєстрації
        openRegister({redirectTo: "/"});
        setStep(5);
    };

    const handlePrevStep = () => {
        setStep((prev) => (prev > 1 ? ((prev - 1) as RegisterStep) : prev));
    };

    return (
        <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col">
                {step === 1 && (
                    <div>
                        <h2 className="text-center text-xl font-medium tracking-tight">
                            Створення нового облікового запису
                        </h2>
                        {/* Поля 1-го кроку */}
                        <form id="register-step-1" onSubmit={handleNextStep} className="mt-6 flex flex-col">
                            <AuthInput
                                label="Ім'я"
                                type="text"
                                autoComplete="given-name"
                                value={formData.firstName}
                                onChange={(e) => {
                                    updateField("firstName", e.target.value)
                                    setErrorsFormData((prev) => ({
                                        ...prev,
                                        firstName: undefined
                                    }))
                                }}
                                error={errorsFormData.firstName}
                            />

                            <AuthInput
                                containerClassName="mt-4"
                                label="Прізвище"
                                type="text"
                                autoComplete="family-name"
                                value={formData.lastName}
                                onChange={(e) => {
                                    updateField("lastName", e.target.value)
                                    setErrorsFormData((prev) => ({
                                        ...prev,
                                        lastName: undefined
                                    }))
                                }}
                                error={errorsFormData.lastName}
                            />

                            <AuthInput
                                containerClassName="mt-4"
                                label="Електронна пошта"
                                type="email"
                                autoComplete="email"
                                value={formData.email}
                                onChange={(e) => {
                                    updateField("email", e.target.value)
                                    setErrorsFormData((prev) => ({
                                        ...prev,
                                        email: undefined
                                    }))
                                }}
                                error={errorsFormData.email}
                            />
                        </form>
                    </div>
                )}

                {step === 2 && (
                    <div>
                        <h2 className="text-center text-xl font-medium tracking-tight">
                            Створіть пароль
                        </h2>
                        {/* Поля 2-го кроку */}
                        <form id="register-step-2" onSubmit={handleNextStep} className="mt-6 flex flex-col">
                            <AuthInput
                                label="Пароль"
                                type="password"
                                autoComplete="new-password"
                                helperText="Пароль має містити мінімум 8 символів"
                                value={formData.password}
                                onChange={(e) => {
                                    updateField("password", e.target.value)
                                    setErrorsFormData((prev) => ({
                                        ...prev,
                                        password: undefined
                                    }))
                                }}
                                error={errorsFormData.password}
                            />

                            <AuthInput
                                containerClassName="mt-4"
                                label="Підтвердити пароль"
                                type="password"
                                autoComplete="new-password"
                                value={formData.confirmPassword}
                                onChange={(e) => {
                                    updateField("confirmPassword", e.target.value)
                                    setErrorsFormData((prev) => ({
                                        ...prev,
                                        confirmPassword: undefined
                                    }))
                                }}
                                error={errorsFormData.confirmPassword}
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

                {step === 3 && (
                    <div>
                        <h2 className="text-center text-xl font-medium tracking-tight">
                            Погодьтеся з умовами
                        </h2>
                        {/* Чекбокси 3-го кроку */}
                        <form id="register-step-3" onSubmit={handleNextStep} className="mt-6 flex flex-col">
                            <div className="flex flex-col gap-3.5">
                                <CheckboxField
                                    label="Я погоджуюсь з Умовами використання та Політикою конфіденційності"
                                    checked={acceptTerms}
                                    onChange={(e) =>
                                        setAcceptTerms(e.target.checked)
                                    }
                                />

                                <CheckboxField
                                    label="Я погоджуюсь отримувати новини про новинки, знижки, акції"
                                    checked={acceptMarketing}
                                    onChange={(e) =>
                                        setAcceptMarketing(e.target.checked)
                                    }
                                />

                                <CheckboxField
                                    label="Я погоджуюсь на обробку персональної інформації"
                                    checked={acceptPersonalData}
                                    onChange={(e) =>
                                       setAcceptPersonalData(e.target.checked)
                                    }
                                />
                            </div>
                        </form>
                    </div>
                )}

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
                                    onClick={() => setStep(1)}
                                    className="cursor-pointer text-xs text-gray-600 underline hover:text-gray-900"
                                >
                                    Змінити
                                </button>
                            </div>

                            <div className="flex items-center justify-between gap-2">
                                <div>
                                    <p className="text-xs text-gray-500">Умови та згоди</p>
                                    <p className="mt-0.5 text-xs font-medium">
                                        {acceptTerms ? "Умови прийнято" : "Умови не прийнято"}
                                        {acceptMarketing ? " · Отримання новин прийнято" : "· Отримання новин не прийнято"}
                                        {acceptPersonalData ? " · Обробка персональних данних прийнято" : " · Обробка персональних данних не прийнято"}
                                    </p>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="cursor-pointer text-xs text-gray-600 underline hover:text-gray-900"
                                >
                                    Змінити
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {step === 5 && (
                    <div className="my-auto text-center">
                        <h2 className="text-xl font-medium tracking-tight">
                            Реєстрація пройшла успішно!
                        </h2>
                    </div>
                )}
            </div>

            {/* Низ завжди зафіксований внизу картки */}
            <div className="mt-auto pt-6">
                {step < 5 ? (
                        step === 1 ? (
                            <button
                                type="submit"
                                form={`register-step-${step}`}
                                className="flex h-11 w-full cursor-pointer items-center justify-center rounded-full bg-olive px-5 text-sm font-medium text-white transition hover:bg-olive-light"
                            >
                                Далі
                            </button>) : (
                            <div className="flex gap-[1px]">
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
                                        className="flex h-11 w-full cursor-pointer items-center justify-center rounded-r-full bg-olive px-5 text-sm font-medium text-white transition hover:bg-olive-light"
                                    >
                                        Зареєструватися
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

                <StepDots totalSteps={5} currentStep={step} className={`mt-6 ${step === 5 && 'mb-9'}`}/>

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