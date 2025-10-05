import type { LoginUserPayload } from "../components/LoginForm";
import type { RegisterUserPayload } from "../components/RegisterForm";

const BASE_URL = 'http://localhost:3000/users'

export namespace API {
    export type User = {
        id: string;
        username: string;
        password: string;
    };

    export type UserResponse = User[];  //
}


export const registerUser = async (payload: RegisterUserPayload) => {
    const response = await fetch(BASE_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
    if (!response.ok) {
        throw new Error('Failed to register user!')
    }

    return await response.json();
}

export const loginUser = async (payload: LoginUserPayload) => {
    const query = `?username=${encodeURIComponent(payload.username)}&password=${encodeURIComponent(payload.password)}`;

    const response = await fetch(BASE_URL + query);

    if (!response.ok) {
        throw new Error('Failed to login!');
    }

    const users: API.UserResponse = await response.json();

    if (users.length === 0) {
        throw new Error('Invalid username or password');
    }

    return users.find((u: API.User) => u.username === payload.username && u.password === payload.password);
}