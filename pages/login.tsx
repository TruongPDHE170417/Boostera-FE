import React, { ChangeEvent, useState } from 'react'
import Link from 'next/link'
import { Button, Input } from '@nextui-org/react';
import CheckBox from '@components/common/CheckBox'
import { API_ENDPOINT, Response } from '@models/api';
import { useBoundStore } from '@zustand/total';
import { NOTIFICATION_TYPE, notify } from '@utils/notify';
import { useRouter } from 'next/router';

type LoginInfo = {
  email: string
  password: string
}

type AuthInfo = {
  password: string
  token: string
}

const Login = () => {
  const { saveAuthInfo } = useBoundStore((store) => ({
    saveAuthInfo: store.saveAuthInfo
  }))

  const route = useRouter()

  const [isRemember, setIsRemember] = useState<boolean>(true)

  const [loginInfo, setLoginInfo] = useState<LoginInfo>({
    email: "",
    password: "",
  })

  const [errorMessage, setErrorMessage] = useState<LoginInfo>({
    email: "",
    password: "",
  })

  const handleChangeLoginInfo = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setLoginInfo({
      ...loginInfo,
      [name]: value,
    })
    if (!value) {
      setErrorMessage({
        ...errorMessage,
        [name]: `Field ${name} is require!`
      })
    } else {
      setErrorMessage({
        ...errorMessage,
        [name]: "",
      })
    }
  }

  const onLogin = async () => {
    if (!loginInfo.email || !loginInfo.password) {
      setErrorMessage({
        email: !loginInfo.email ? 'Field email is require!' : '',
        password: !loginInfo.password ? 'Field password is require!' : '',
      })
    } else {
      const response = await fetch(API_ENDPOINT + "/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginInfo),
      })
      const data = await response.json() as Response<AuthInfo>
      if (data.success) {
        saveAuthInfo({
          accessToken: data.data?.token ?? "",
          refreshToken: "",
        })
        route.push("/prices")
        setTimeout(() => {
          notify(NOTIFICATION_TYPE.SUCCESS, "Login successfully!")
        }, 500)
      } else {
        notify(NOTIFICATION_TYPE.ERROR, data.message ?? "Something wrong with server, try again!")
      }
    }
  }


  return (
    <div className="hero min-h-screen bg-theme">
      <div className="flex h-full">
        <div className="basis-1/2">
          <img src="images/auth-login.webp" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="shrink-0 basis-1/2 px-40 my-auto">
          <div className="text-center lg:text-left text-slate-400">
            <h1 className="text-5xl font-bold">Welcome to Boostera! 👋🏻</h1>
            <p className="py-6">Please sign-in to your account and start the adventure.</p>
          </div>
          <div className="flex flex-col gap-4 w-full">
            <p className="text-default-400">Email</p>
            <Input name="email" type="text" placeholder='Enter your email' value={loginInfo.email} onChange={handleChangeLoginInfo} />
            <p className="text-red-400 text-sm">{errorMessage.email && errorMessage.email}</p>
            <p className="text-default-400">Password</p>
            <Input name="password" type="password" placeholder='Enter your password' value={loginInfo.password} onChange={handleChangeLoginInfo} />
            <p className="text-red-400 text-sm">{errorMessage.password && errorMessage.password}</p>
            <div className="flex justify-between items-center">
              <CheckBox label="Remember Me" isChecked={isRemember} onClick={() => setIsRemember(!isRemember)} />
              <Link href="forgot-password" className="text-primary-400 hover:underline">Forgot Password?</Link>
              II</div>
            <Button onClick={onLogin} color="primary" isDisabled={!!errorMessage.email || !!errorMessage.password}>Login</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login