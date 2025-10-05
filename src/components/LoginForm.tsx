import { useEffect, useRef, useState } from "react"
import { useDebouncer } from "../hooks/useDebouncer"
import ErrorFields from "./ErrorField"
import type { LoggedUser } from "../App"
import { initialErrorState, passwordSymbols, isFormValid, type ErrorsState } from "./Form"
import { FaEyeSlash, FaEye } from "react-icons/fa"
import PasswordIcon from "./PasswordIcon"


type LoginFormProps = {
    onLoginSuccess: (user: LoggedUser) => void
    onRegisterClick: () => void
}



const LoginForm = ({ onLoginSuccess, onRegisterClick }: LoginFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState(initialErrorState());

    const validatePassword = useDebouncer(300, () => {
        const message = 'Password length should be atleast 6 characters long!';
        setErrors((prevState: ErrorsState) => {
            const messages = new Set([...prevState.password.messages]);
            if (password && password.length < 6) {
                messages.add(message);
            } else {
                if (messages.has(message)) {
                    messages.delete(message);
                }
            }

            return { ...prevState, password: { messages } }
        })
    })

    const validateUsername = useDebouncer(300, () => {
        const message = 'Username length should be atleast 6 characters long!';
        setErrors((prevState: ErrorsState) => {
            const messages = new Set([...prevState.username.messages]);
            if (username && username.length < 6) {
                messages.add(message);
            } else {
                if (messages.has(message)) {
                    messages.delete(message);
                }
            }

            return { ...prevState, username: { messages } }
        })
    })

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validatePassword();
        setPassword(e.target.value)
    };

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        validateUsername();
        setUsername(e.target.value)
    }


    const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();


        if (isFormValid(errors)) {
            const loggedUser: LoggedUser = {
                username
            }
            onLoginSuccess!(loggedUser);
        }
    };

    return (
        <>
            <form onSubmit={onSubmit} className='container w-sm'>
                <div className="flex flex-col items-center justify-between">
                    <div className='flex flex-col items-start w-full'>
                        <label htmlFor="username">Username: </label>
                        <input name='username'
                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={username} onChange={onUsernameChange}></input>
                        {errors.username.messages.size > 0 && <ErrorFields messages={Array.from(errors.username.messages)} />}
                    </div>
                    <div className="flex flex-col items-start w-full">
                        <label htmlFor="password">Password:</label>
                        <div className="relative w-full"> {/* <-- relative container wrapping input + icon only */}
                            <input
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={password}
                                onChange={onPasswordChange}
                            />
                            <PasswordIcon show={showPassword} toggle={() => { setShowPassword(!showPassword) }}></PasswordIcon>
                        </div>
                        {errors.password.messages.size > 0 && <ErrorFields messages={Array.from(errors.password.messages)} />}
                    </div>

                    <div className="text-end w-full text-md my-1" onClick={onRegisterClick}>
                        <span>Don't have account? Make one <span className="text-blue-500 undeline cursor-pointer"> here!</span></span>
                    </div>
                    <button className="w-full mt-2 cursor-pointer" type="submit">Login</button>
                </div>
            </form>
        </>
    )
}

export default LoginForm;