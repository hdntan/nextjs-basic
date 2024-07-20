import LoginForm from '@/app/(landing)/(auth)/login/LoginForm'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center'>
      <h1>Login</h1>
      <LoginForm/>
    </div>
  )
}

export default LoginPage