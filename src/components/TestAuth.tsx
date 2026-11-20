import {useState} from "react";
import {useLoginMutation, useLogoutMutation, useProfileQuery, useRegisterMutation} from "../apis/authApi.ts";

const TestAuth = () => {
    const [firstName, setFirstName] = useState('Front');
    const [lastName, setLastName] = useState('Test');
    const [email, setEmail] = useState('test@example.com');
    const [password, setPassword] = useState('Password123!');
    const [passwordConfirm, setPasswordConfirm] = useState('Password123!');

    const [register, { isLoading: isRegistering }] = useRegisterMutation();
    const [login, { isLoading: isLoggingIn }] = useLoginMutation();
    const [logout, { isLoading: isLoggingOut }] = useLogoutMutation();
    const { data: profile, isFetching, error, refetch } = useProfileQuery();

    const handleRegister = async () => {
        try {
            const formData = new FormData();
            formData.append('firstName', firstName);
            formData.append('lastName', lastName);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('passwordConfirm', passwordConfirm);
            const res = await register(formData).unwrap();
            console.log('REGISTER SUCCESS:', res);
        } catch (err) {
            console.error('REGISTER ERROR:', err);
        }
    };

    const handleLogin = async () => {
        try {
            const res = await login({ email, password }).unwrap();
            console.log('LOGIN SUCCESS:', res);
        } catch (err) {
            console.error('LOGIN ERROR:', err);
        }
    };

    const handleLogout = async () => {
        try {
            const res = await logout().unwrap();
            console.log('LOGOUT SUCCESS:', res);
        } catch (err) {
            console.error('LOGOUT ERROR:', err);
        }
    };

    const handleCheckProfile = async () => {
        const res = await refetch();
        console.log('PROFILE RESULT:', {
            data: res.data,
            error: res.error,
            status: res.status,
        });
    };

    return (
        <div className="p-4 max-w-md border rounded space-y-3">
            <h2 className="font-bold text-lg">Auth API Test</h2>

            <div className="flex flex-col gap-2">
                <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="First Name"
                    className="border px-2 py-1 rounded"
                />
                <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Last Name"
                    className="border px-2 py-1 rounded"
                />
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="border px-2 py-1 rounded"
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border px-2 py-1 rounded"
                />
                <input
                    type="password"
                    value={passwordConfirm}
                    onChange={(e) => setPasswordConfirm(e.target.value)}
                    placeholder="Password Confirm"
                    className="border px-2 py-1 rounded"
                />
            </div>

            <div className="flex flex-wrap gap-2">
                <button
                    onClick={handleRegister}
                    disabled={isRegistering}
                    className="px-3 py-1 bg-blue-600 text-white rounded"
                >
                    Register
                </button>
                <button
                    onClick={handleLogin}
                    disabled={isLoggingIn}
                    className="px-3 py-1 bg-green-600 text-white rounded"
                >
                    Login
                </button>
                <button
                    onClick={handleCheckProfile}
                    disabled={isFetching}
                    className="px-3 py-1 bg-gray-700 text-white rounded"
                >
                    Refetch Profile
                </button>
                <button
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                    className="px-3 py-1 bg-red-600 text-white rounded"
                >
                    Logout
                </button>
            </div>

            <div className="text-sm text-gray-600">
                {isFetching && <p>Завантаження профілю...</p>}
                {profile && <p>Поточний юзер: {JSON.stringify(profile)}</p>}
                {error && <p className="text-red-500">Не авторизований / помилка профілю</p>}
            </div>
        </div>
    )
}

export default TestAuth;