import { useCallback, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ErrorFields from './components/ErrorField'
import { useDebouncer } from './hooks/useDebouncer'

type InputField = 'password' | 'username'

type ErrorsState = {
  [Field in InputField]: {
    messages: Set<string>
  }
}

const initialErrorState = (): ErrorsState => ({
  password: { messages: new Set() },
  username: { messages: new Set() }
})


function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState(initialErrorState())

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
            <input name='password'
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password} onChange={onPasswordChange}></input>
            {errors.password.messages.size > 0 && <ErrorFields messages={Array.from(errors.password.messages)} />}

          </div>
          <button className="w-full mt-2 bg-purple-600 cursor-pointer hover:bg-red-400" type="submit">Login</button>
        </div>
      </form>
    </>
  )
}

export default App
