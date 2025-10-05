import { useState } from "react"
import LoginForm, { type LoginUserPayload } from "./LoginForm"
import RegisterForm, { type RegisterUserPayload } from "./RegisterForm";
import type { LoggedUser } from "../App";


type FormProps = {
    onLoginSuccess: (user: LoginUserPayload) => void;
    onRegisterSuccess: (payload: RegisterUserPayload) => void;
}


type InputField = 'password' | 'username' | 'confirmPassword' | 'global'

export type ErrorsState = {
    [Field in InputField]: {
        messages: Set<string>
    }
}

export const initialErrorState = (): ErrorsState => ({
    password: { messages: new Set() },
    username: { messages: new Set() },
    confirmPassword: { messages: new Set() },
    global: {messages: new Set()}
})


export const passwordSymbols = ['!', '@', '#', '$']


export const isFormValid = (errors: ErrorsState): boolean => {
    return Object.values(errors).every(field => field.messages.size === 0)
}

export const Form = ({onRegisterSuccess, onLoginSuccess}: FormProps) => {
    const [showLogin, setShowLogin] = useState(false);

    const handleShowRegister = () => {
        setShowLogin(false);
    }

    const handleShowLogin = () => {
        setShowLogin(true)
    }

    const handleRegisterSuccess = (payload: RegisterUserPayload) => {
        onRegisterSuccess(payload);
        setShowLogin(true);
    }

    const handleLoginSuccess = (payload: LoginUserPayload) => {
        onLoginSuccess(payload);
    }

    if (showLogin) {
        return (<LoginForm onRegisterClick={handleShowRegister} onLoginSuccess={handleLoginSuccess}/>)
    }

    return (<RegisterForm onLoginClick={handleShowLogin} onRegisterSuccess={handleRegisterSuccess}/>)

}