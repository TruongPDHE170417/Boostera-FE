import React, { ChangeEvent, useState } from 'react'
import CustomInput from '../../common/CustomInput'
import CustomButton from '../../common/CustomButton'

type ErrorMessage = {
  username: string
  password: string
}

const LoginPageScreen = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [errorMessage, setErrorMessage] = useState<ErrorMessage>({
    username: '',
    password: '',
  })

  const onChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }

  const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  return (
    <div className="flex h-screen w-screen">
      <div className="flex-1">
        <img src="/images/museum_art_vietnam.jpeg" alt="museum art vietnam" className="h-full w-full object-cover" />
      </div>
      <div className="flex-1 flex justify-center items-center bg-amber-50 flex-col gap-2">
        <p className="text-5xl font-bold text-amber-400">Đăng Nhập</p>
        <p className="text-gray-400 w-1/2 text-center">Tài khoản bảo tàng sẽ được chúng tôi cung cấp giúp bạn có thể đăng tải các di vật, cô vật.</p>
        <div className="w-3/4 flex gap-6 flex-col mt-12">
          <CustomInput
            label='Tên người dùng'
            placeholder='Nhập tên người dùng'
            onChange={onChangeUsername}
          />
          <CustomInput
            label='Mật khẩu'
            placeholder='Nhập mật khẩu'
            onChange={onChangePassword}
          />
          <div className="flex justify-center items-center w-1/3 m-auto">
            <CustomButton
              label='Đăng nhập'
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPageScreen