import { createContext, useCallback, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ErrorFields from './components/ErrorField'
import { useDebouncer } from './hooks/useDebouncer'
import LoginForm from './components/LoginForm'
import Hello from './components/Hello'
import RegisterForm from './components/RegisterForm'
import { Form } from './components/Form'


const Context = createContext({ username: '' })

export type LoggedUser = { username: string }
function App() {
  const [loggedUser, setLoggedUser] = useState({ username: '' });

  const handleLoginSuccess = (user: LoggedUser) => {
    setLoggedUser(user);
  }

  return (
    <>
      {loggedUser.username ? <Hello username={loggedUser.username} /> : <Form onLoginSuccess={handleLoginSuccess}></Form>}
    </>
  )
}

export default App
