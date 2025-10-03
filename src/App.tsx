import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value); setUsername(e.target.value) };
  const onUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => { console.log(e.target.value); setPassword(e.target.value)}
  return (
    <>
      <form>
        <div class=>
          <label htmlFor="username">Username: </label>
          <input name='username' value={username} onChange={onUsernameChange}></input>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input name='password' value={password} onChange={onPasswordChange}></input>
        </div>

      </form>
    </>
  )
}

export default App
