import { useState } from "react";
import { useNavigate } from "react-router";
import {
    Check,
    Copy,
    Heart,
    KeyRound,
    LogOut,
    Mail,
    Package,
    Phone,
    ShieldCheck,
    User,
} from "lucide-react";

// Заміни на свої реальні хуки авторизації та модалки
// import { useAuth } from "../context/AuthContext";
// import { useAuthModal } from "../context/AuthModalContext";

export interface UserProfileData {
    id?: string | number;
    firstName?: string;
    lastName?: string;
    name?: string;
    email: string;
    phone?: string;
    role?: string;
    isEmailVerified?: boolean;
    createdAt?: string;
}

interface ProfilePageProps {
    user?: UserProfileData | null;
    isLoading?: boolean;
    onLogout?: () => Promise<void> | void;
    onOpenForgotPassword?: () => void;
}

const Profile = ({
                                user,
                                isLoading = false,
                                onLogout,
                                onOpenForgotPassword,
                            }: ProfilePageProps) => {
    const navigate = useNavigate();
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    const handleCopyEmail = async () => {
        if (!user?.email) return;
        await navigator.clipboard.writeText(user.email);
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 1800);
    };

    const handleLogoutClick = async () => {
        try {
            setIsLoggingOut(true);
            await onLogout?.();
            navigate("/");
        } finally {
            setIsLoggingOut(false);
        }
    };

    if (isLoading) {
        return (
            <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
                <div className="animate-pulse space-y-6">
                    <div className="h-36 rounded-2xl border border-black/10 bg-white p-6" />
                    <div className="grid gap-6 md:grid-cols-3">
                        <div className="h-28 rounded-2xl border border-black/10 bg-white" />
                        <div className="h-28 rounded-2xl border border-black/10 bg-white" />
                        <div className="h-28 rounded-2xl border border-black/10 bg-white" />
                    </div>
                    <div className="h-56 rounded-2xl border border-black/10 bg-white" />
                </div>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 py-12 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full border border-black/10 bg-cream-light/50 text-gray-700">
                    <User className="h-6 w-6" strokeWidth={1.6} />
                </div>

                <h1 className="mt-5 text-2xl font-medium tracking-tight text-gray-900">
                    Ви не авторизовані
                </h1>
                <p className="mt-2 text-sm leading-relaxed text-gray-600">
                    Увійдіть в акаунт, щоб переглядати особисті дані, історію
                    замовлень та налаштування безпеки.
                </p>
            </div>
        );
    }

    const displayName =
        [user.firstName, user.lastName].filter(Boolean).join(" ") ||
        user.name ||
        user.email.split("@")[0];

    const initials = displayName
        .split(" ")
        .map((part) => part[0])
        .slice(0, 2)
        .join("")
        .toUpperCase();

    return (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
            {/* Верхній блок профілю */}
            <section className="relative overflow-hidden rounded-2xl border border-black/10 bg-cream-light/50 p-6 sm:p-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-center gap-4 sm:gap-5">
                        <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-olive text-lg font-medium tracking-wide text-white shadow-xs sm:h-20 sm:w-20 sm:text-xl">
                            {initials}
                        </div>

                        <div>
                            <div className="flex flex-wrap items-center gap-2.5">
                                <h1 className="text-xl font-medium tracking-tight text-gray-900 sm:text-2xl">
                                    {displayName}
                                </h1>

                                {user.isEmailVerified !== false && (
                                    <span className="inline-flex items-center gap-1 rounded-full border border-black/10 bg-white px-2.5 py-0.5 text-xs font-medium text-gray-700">
                                        <ShieldCheck className="h-3.5 w-3.5 text-olive" />
                                        Акаунт активний
                                    </span>
                                )}
                            </div>

                            <div className="mt-1.5 flex items-center gap-2 text-sm text-gray-600">
                                <span>{user.email}</span>
                                <button
                                    type="button"
                                    onClick={handleCopyEmail}
                                    title="Скопіювати пошту"
                                    className="inline-flex cursor-pointer items-center gap-1 rounded-md px-1.5 py-0.5 text-xs text-gray-500 transition hover:bg-black/5 hover:text-gray-800"
                                >
                                    {copiedEmail ? (
                                        <>
                                            <Check className="h-3.5 w-3.5 text-olive" />
                                            <span>Скопійовано</span>
                                        </>
                                    ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                    )}
                                </button>
                            </div>

                            {user.id && (
                                <p className="mt-1 text-xs text-gray-500">
                                    ID користувача: {user.id}
                                </p>
                            )}
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleLogoutClick}
                        disabled={isLoggingOut}
                        className="inline-flex h-10 cursor-pointer items-center justify-center gap-2 self-start rounded-full border border-black/15 bg-white px-4 text-xs font-medium text-gray-800 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 disabled:opacity-50 sm:self-center"
                    >
                        <LogOut className="h-3.5 w-3.5" />
                        {isLoggingOut ? "Вихід..." : "Вийти з акаунту"}
                    </button>
                </div>
            </section>

            {/* Швидкі картки-показники (заглушки для наочності) */}
            <section className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-black/10 bg-white p-5 transition hover:border-black/20">
                    <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-medium">Замовлення</span>
                        <Package className="h-4 w-4" strokeWidth={1.6} />
                    </div>
                    <p className="mt-3 text-2xl font-medium text-gray-900">0</p>
                    <p className="mt-1 text-xs text-gray-500">
                        Активних замовлень поки немає
                    </p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white p-5 transition hover:border-black/20">
                    <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-medium">Обране</span>
                        <Heart className="h-4 w-4" strokeWidth={1.6} />
                    </div>
                    <p className="mt-3 text-2xl font-medium text-gray-900">0</p>
                    <p className="mt-1 text-xs text-gray-500">
                        Збережені товари з&apos;являться тут
                    </p>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white p-5 transition hover:border-black/20">
                    <div className="flex items-center justify-between text-gray-500">
                        <span className="text-xs font-medium">Статус</span>
                        <ShieldCheck className="h-4 w-4" strokeWidth={1.6} />
                    </div>
                    <p className="mt-3 text-2xl font-medium text-gray-900">
                        {user.role ?? "Користувач"}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                        Стандартний доступ до кабінету
                    </p>
                </div>
            </section>

            {/* Основна сітка: Особисті дані + Безпека */}
            <section className="mt-6 grid gap-6 lg:grid-cols-3">
                {/* Особисті дані */}
                <div className="rounded-2xl border border-black/10 bg-white p-6 lg:col-span-2">
                    <div className="flex items-center justify-between border-b border-black/10 pb-4">
                        <div>
                            <h2 className="text-base font-medium text-gray-900">
                                Особиста інформація
                            </h2>
                            <p className="mt-0.5 text-xs text-gray-500">
                                Поточні дані з профілю користувача
                            </p>
                        </div>

                        <span className="rounded-full bg-cream-light/50 px-3 py-1 text-xs text-gray-600">
                            Тестовий режим
                        </span>
                    </div>

                    <dl className="mt-5 grid gap-5 sm:grid-cols-2">
                        <div className="rounded-xl border border-black/5 bg-cream-light/50 p-3.5">
                            <dt className="flex items-center gap-1.5 text-xs text-gray-500">
                                <User className="h-3.5 w-3.5" />
                                Ім&apos;я та прізвище
                            </dt>
                            <dd className="mt-1.5 text-sm font-medium text-gray-900">
                                {displayName}
                            </dd>
                        </div>

                        <div className="rounded-xl border border-black/5 bg-cream-light/50 p-3.5">
                            <dt className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Mail className="h-3.5 w-3.5" />
                                Електронна пошта
                            </dt>
                            <dd className="mt-1.5 text-sm font-medium text-gray-900">
                                {user.email}
                            </dd>
                        </div>

                        <div className="rounded-xl border border-black/5 bg-cream-light/50 p-3.5">
                            <dt className="flex items-center gap-1.5 text-xs text-gray-500">
                                <Phone className="h-3.5 w-3.5" />
                                Телефон
                            </dt>
                            <dd className="mt-1.5 text-sm font-medium text-gray-900">
                                {user.phone || "Не вказано"}
                            </dd>
                        </div>

                        <div className="rounded-xl border border-black/5 bg-cream-light/50 p-3.5">
                            <dt className="text-xs text-gray-500">
                                Дата реєстрації
                            </dt>
                            <dd className="mt-1.5 text-sm font-medium text-gray-900">
                                {user.createdAt || "Дані не передано"}
                            </dd>
                        </div>
                    </dl>
                </div>

                {/* Безпека та вхід */}
                <div className="flex flex-col justify-between rounded-2xl border border-black/10 bg-white p-6">
                    <div>
                        <div className="flex items-center gap-2 border-b border-black/10 pb-4">
                            <KeyRound className="h-4 w-4 text-gray-700" />
                            <h2 className="text-base font-medium text-gray-900">
                                Безпека та вхід
                            </h2>
                        </div>

                        <p className="mt-4 text-xs leading-relaxed text-gray-600">
                            Керування паролем та способами входу в обліковий
                            запис. Секція підготовлена для підключення зміни
                            пароля та Google-акаунту.
                        </p>

                        <div className="mt-4 rounded-xl border border-black/10 bg-cream-light/60 p-3.5 text-xs">
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-gray-800">
                                    Google акаунт
                                </span>
                                <span className="rounded-full bg-white px-2 py-0.5 text-[11px] text-gray-500">
                                    Не прив&apos;язано
                                </span>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={onOpenForgotPassword}
                        className="mt-6 flex h-10 w-full cursor-pointer items-center justify-center rounded-full border border-black/15 bg-white px-4 text-xs font-medium text-gray-800 transition hover:bg-cream-light/50"
                    >
                        Змінити або відновити пароль
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Profile;