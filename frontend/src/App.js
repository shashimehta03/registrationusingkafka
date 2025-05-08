import React from 'react';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

function App() {
  return (
    <div>
      <h1>Real-time Auth System</h1>
      <RegisterForm />
      <LoginForm />
    </div>
  );
}

export default App;
