import {useAuthModal} from "../hooks/useAuthModal.ts";

const Contacts = () => {
    const { openLogin, openRegister } = useAuthModal();
    return (
        <>
            <h1 className={"text-center py-5 text-xl"}>Контакти</h1>
            <div className="flex gap-2">
                <button
                    type="button"
                    onClick={() => openLogin()}
                    className="rounded-lg border px-3 py-1.5 text-sm"
                >
                    Увійти
                </button>
                <button
                    type="button"
                    onClick={() => openRegister()}
                    className="rounded-lg bg-neutral-900 px-3 py-1.5 text-sm text-white"
                >
                    Реєстрація
                </button>
            </div>
        </>
    )
}

export default Contacts;