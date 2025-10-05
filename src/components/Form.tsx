import { useState } from "react"
import LoginForm from "./LoginForm"
import RegisterForm from "./RegisterForm";
import type { LoggedUser } from "../App";

type FormProps = {
    onLoginSuccess: (user: LoggedUser) => void;
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

export const Form = (props: FormProps) => {
    const [showLogin, setShowLogin] = useState(false);

    const handleShowRegister = () => {
        setShowLogin(false);
    }

    const handleShowLogin = () => {
        setShowLogin(true)
    }

    if (showLogin) {
        return (<LoginForm onLoginSuccess={props.onLoginSuccess} onRegisterClick={handleShowRegister}/>)
    }

    return (<RegisterForm onLoginClick={handleShowLogin} onRegisterSuccess={handleShowLogin}/>)

}