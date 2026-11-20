import {Link, useNavigate} from "react-router";
import {useAuth} from "../hooks/useAuth.ts";

const NotFound = () => {
    const navigate = useNavigate();
    const { isAuthenticated, isLoading } = useAuth();

    const primaryTarget = isAuthenticated ? "/profile" : "/login";
    const primaryLabel = isAuthenticated ? "До профілю" : "На сторінку входу";

    return (
        <main className="flex min-h-[70vh] flex-col items-center justify-center px-4 text-center">
            <p className="text-3xl font-bold uppercase tracking-widest text-neutral-400">
                404
            </p>

            <h1 className="mt-2 text-2xl font-semibold text-neutral-900 sm:text-3xl">
                Сторінку не знайдено
            </h1>

            <p className="mt-2 max-w-md text-sm text-neutral-600">
                Перевірте адресу або скористайтеся кнопками нижче, щоб повернутися до роботи.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="rounded-lg border border-neutral-300 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:bg-neutral-100"
                >
                    Назад
                </button>

                {!isLoading && (
                    <Link
                        to={primaryTarget}
                        className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-neutral-800"
                    >
                        {primaryLabel}
                    </Link>
                )}
            </div>
        </main>
    );
};

export default NotFound;