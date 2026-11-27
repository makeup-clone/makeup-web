import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import {useGoogleLoginMutation} from "../apis/authApi.ts";
import googleIcon from "../assets/googleIcon.svg";

interface GoogleAuthButtonProps {
    rememberMe?: boolean;
    isEmailSubmitting?: boolean;
    setIsGoogleLoggingIn?: (isGoogleLoggingIn: boolean) => void;
    isGoogleLoggingIn?: boolean;
}

export const GoogleAuthButton = ({ isEmailSubmitting, setIsGoogleLoggingIn, isGoogleLoggingIn, rememberMe }: GoogleAuthButtonProps) => {
    const [googleLogin, { isLoading }] = useGoogleLoginMutation ();

    const handleGoogleSuccess = async (credentialResponse: CredentialResponse) => {
        const idToken = credentialResponse.credential;
        if (!idToken) return;

        try {
            await googleLogin({
                googleIdToken: idToken,
                rememberMe
            }).unwrap();
        } catch (error) {
            console.error("Помилка входу через Google:", error);
        }
    };

    return (
        <div className="group relative mt-6 h-11 w-full">
            <button
                type="button"
                disabled={isLoading || isEmailSubmitting}
                className={`flex h-11 w-full items-center justify-center rounded-full border bg-white px-5 text-sm transition-colors ${!isLoading && !isEmailSubmitting && "cursor-pointer group-hover:bg-cream-light"} disabled:opacity-70`}
            >
                <span>
                    {isLoading ? "Вхід..." : "Увійти через Google"}
                </span>

                <img
                    src={googleIcon}
                    alt=""
                    aria-hidden="true"
                    draggable={false}
                    className="select-none absolute size-6 shrink-0 right-10"
                />
            </button>

            {!isGoogleLoggingIn && (
                <div className="absolute inset-0 z-20 overflow-hidden rounded-full opacity-0" aria-hidden="true">
                    {!isEmailSubmitting && (
                        <div
                            className="absolute inset-0 z-10 overflow-hidden rounded-full opacity-0"
                            aria-hidden="true"
                        >
                            <GoogleLogin
                                click_listener={() => {
                                    setIsGoogleLoggingIn?.(true)
                                }}
                                onSuccess={handleGoogleSuccess}
                                onError={() => {
                                    console.error("Google login failed");
                                }}
                                useOneTap={false}
                                theme="outline"
                                size="large"
                                shape="pill"
                            />

                        </div>
                    )}
                </div>
            )}
        </div>
    );
};