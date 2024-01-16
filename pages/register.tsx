import React, { useState } from 'react'
import Link from 'next/link'
import { Icon } from '@iconify/react';
import CheckBox from '@components/common/CheckBox'
import CustomButton from '@components/common/CustomButton'
import CustomInput from '@components/common/CustomInput'
import ButtonIcon from '@components/common/ButtonIcon';

const Register = () => {
  const [isAgreeTerms, setIsAgreeTerms] = useState<boolean>(false)

  return (
    <div className="hero min-h-screen bg-theme">
      <div className="flex gap-12">
        <div className="w-1/2 card shadow-2xl hidden lg:flex justify-center items-center p-8">
          <img src="images/auth-register.png" alt="" className="w-[80%]" />
        </div>
        <div className="shrink-0 w-full lg:w-1/2 max-w-sm px-8 lg:px-2">
          <div className="text-center lg:text-left text-slate-400">
            <h1 className="text-5xl font-bold">Adventure starts here 🚀</h1>
            <p className="py-6">Make your app management easy and fun!</p>
          </div>
          <div className="flex flex-col gap-4">
            <CustomInput label="Username" placeholder='Johndoe' />
            <CustomInput label="Email" placeholder='user@email.com' />
            <CustomInput label="Password" type="password" />
            <div className="flex items-center">
              <CheckBox label="I agree to" isChecked={isAgreeTerms} onClick={() => setIsAgreeTerms(!isAgreeTerms)} />
              <Link href="/" className="text-primary-400 text-sm ml-[-6px] hover:underline">privacy policy & terms</Link>
            </div>
            <CustomButton label="Sign up" />
            <div className="flex gap-2 justify-center">
              <span className="text-slate-400">Already have an account?</span>
              <Link href="login" className="text-primary-400 hover:underline">Sign In</Link>
            </div>
            <div className="flex gap-4 justify-center items-center">
              <div className="border border-slate-500 h-[1px] w-full"></div>
              <p className="w-fit text-slate-400 text-sm">or</p>
              <div className="border border-slate-500 h-[1px] w-full"></div>
            </div>
            <div className="flex justify-center items-center gap-4">
              <ButtonIcon icon={<Icon icon="logos:facebook" />} />
              <ButtonIcon icon={<Icon icon="logos:twitter" />} />
              <ButtonIcon icon={<Icon icon="icon-park:github" />} />
              <ButtonIcon icon={<Icon icon="devicon:google" />} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register