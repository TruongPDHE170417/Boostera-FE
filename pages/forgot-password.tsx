import React from 'react'
import Link from 'next/link'
import CheckBox from '@components/common/CheckBox'
import CustomButton from '@components/common/CustomButton'
import CustomInput from '@components/common/CustomInput'
import ChevronIcon from '@components/icons/ChevronIcon'

const ForgotPassword = () => {
  return (
    <div className="hero min-h-screen bg-theme">
      <div className="flex gap-12 items-center">
        <div className="w-1/2 card shadow-2xl hidden lg:flex justify-center items-center p-8">
          <img src="images/auth-forgot-password.png" alt="" className="w-[60%]" />
        </div>
        <div className="shrink-0 w-full lg:w-1/2 max-w-sm px-8 lg:px-2">
          <div className="text-center lg:text-left text-slate-400">
            <h1 className="text-5xl font-bold">Forgot Password? 🔒</h1>
            <p className="py-6">Enter your email and we′ll send you instructions to reset your password</p>
          </div>
          <div className="flex flex-col gap-4">
            <CustomInput label="Email" placeholder='user@email.com' />
            <CustomButton label="Send resend link" />
            <div className="flex gap-2 justify-center">
              <Link href="login" className="text-primary-400 hover:underline">
                Back to login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword