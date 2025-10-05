import { createContext, useCallback, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ErrorFields from './components/ErrorField'
import { useDebouncer } from './hooks/useDebouncer'
import LoginForm, { type LoginUserPayload } from './components/LoginForm'
import Hello from './components/Hello'
import RegisterForm, { type RegisterUserPayload } from './components/RegisterForm'
import { Form } from './components/Form'
import { loginUser, registerUser } from './services/auth.service'


const Context = createContext({ username: '' })

export type LoggedUser = { username: string, password: string, id: string };

const initialUserState = {
    username: '',
    password: '',
    id: ''
}

function App() {
    const [loggedUser, setLoggedUser] = useState(initialUserState);
    const [errors, setErrors] = useState([] as unknown[])

    const handleLoginSuccess = async (payload: LoginUserPayload) => {
        try {
            const user = await loginUser(payload);
            if (user) {
                setLoggedUser(user);
                setErrors([])
            } else {
                setErrors((state) => [...state, 'Invalid username or password!'])

            }
        }catch(error) {
            setErrors(state => [...state, (error as any)?.message])

        }
    }

    const handleRegisterSuccess = async (payload: RegisterUserPayload) => {
        try {
            await registerUser(payload);
        } catch (error: unknown) {
            setErrors(state => [...state, (error as any)?.message])

        }
    }

    return (
        <>{errors.length > 0 && <ErrorFields messages={errors as any}/>}
            {loggedUser?.username ? <Hello username={loggedUser?.username} /> : <Form onLoginSuccess={handleLoginSuccess} onRegisterSuccess={handleRegisterSuccess} />}
        </>
    )
}

export default App
