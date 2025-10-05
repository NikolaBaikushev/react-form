import { useState, type SyntheticEvent } from "react";
import ErrorFields from "./ErrorField";
import { initialErrorState, isFormValid, passwordSymbols, type ErrorsState } from "./Form";
import { useDebouncer } from "../hooks/useDebouncer";
import PasswordIcon from "./PasswordIcon";

type RegisterFormProps = {
    onRegisterSuccess: () => void;
    onLoginClick: () => void;
}



const RegisterForm = ({ onRegisterSuccess, onLoginClick }: RegisterFormProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState(initialErrorState());
    const [confirmPassword, setConfirmPassword] = useState('');


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

    const validateConfirmPassword = useDebouncer(300, () => {
        const message = 'Password length should be atleast 6 characters long!';
        setErrors((prevState: ErrorsState) => {
            const messages = new Set([...prevState.confirmPassword.messages]);
            if (confirmPassword && confirmPassword.length < 6) {
                messages.add(message);
            } else {
                if (messages.has(message)) {
                    messages.delete(message);
                }
            }

            return { ...prevState, confirmPassword: { messages } }
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

    const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
        validateUsername();
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        validatePassword();
        validatePasswordSymbols(value, 'password');
    };

    const onConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setConfirmPassword(value);
        validateConfirmPassword();
        validatePasswordSymbols(value, 'confirmPassword');
    };


    const validatePasswordSymbols = (value: string, field: 'password' | 'confirmPassword') => {
        const message = `Your password must contain at least one of the symbols: ${passwordSymbols.join(', ')}`;

        setErrors(prevErrors => {
            const messages = new Set(prevErrors[field].messages);

            if (!passwordSymbols.some(symbol => value.includes(symbol))) {
                messages.add(message);
            } else {
                messages.delete(message);
            }

            return {
                ...prevErrors,
                [field]: { messages }
            };
        });
    };

    const validatePasswordsMatching = () => {
        const message = 'Your passwords do not match!';
        const messages = new Set(errors.global.messages);

        if (password !== confirmPassword) {
            messages.add(message);
        } else {
            messages.delete(message);
        }

        return {
            ...errors,
            global: { messages }
        }
    }

    const onSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();

        const updatedErrors = validatePasswordsMatching();
        setErrors(updatedErrors);

        if (password && confirmPassword && username && isFormValid(updatedErrors)) {
            onRegisterSuccess();
        }
    }

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
                    <div className='flex flex-col items-start w-full'>
                        <label htmlFor="password">Password:</label>
                        <div className="w-full relative">
                            <input name='password'
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                type={showPassword ? 'text' : 'password'}
                                value={password} onChange={onPasswordChange}>
                            </input>
                            <PasswordIcon show={showPassword} toggle={() => setShowPassword(!showPassword)}></PasswordIcon>
                        </div>
                        {errors.password.messages.size > 0 && <ErrorFields messages={Array.from(errors.password.messages)} />}

                    </div>
                    <div className='flex flex-col items-start w-full'>
                        <label htmlFor="confirmPassword">Confirm Password:</label>

                        <div className="w-full relative">
                            <input name='confirmPassword'
                                type={showPassword ? 'text' : 'password'}
                                className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={confirmPassword} onChange={onConfirmPasswordChange}>
                            </input>
                            <PasswordIcon show={showPassword} toggle={() => setShowPassword(!showPassword)}></PasswordIcon>
                        </div>
                        {errors.confirmPassword.messages.size > 0 && <ErrorFields messages={Array.from(errors.confirmPassword.messages)} />}
                    </div>
                    <div className="text-end w-full text-md my-1" onClick={onLoginClick}>
                        <span>Already have account? <span className="text-blue-500 undeline cursor-pointer">Click here!</span></span>
                    </div>
                    <div className="flex flex-col items-start w-full text-lg">
                        {errors.global.messages.size > 0 && <ErrorFields messages={Array.from(errors.global.messages)} />}
                    </div>
                    <button className="w-full mt-2 bg-purple-600 cursor-pointer hover:bg-red-400" type="submit">Register</button>
                </div>
            </form>
        </>
    )
}
export default RegisterForm;