import React, { ChangeEvent, useState } from "react"
import Link from "next/link"
import CheckBox from "@components/common/CheckBox"
import CustomButton from "@components/common/CustomButton"
import CustomInput from "@components/common/CustomInput"
import ChevronIcon from "@components/icons/ChevronIcon"
import { string } from "zod"

export type ChangePassRequest = {
  oldPass: string
  newPass: string
  reEnterPass: string
}
const ForgotPassword = () => {
  const [changePass, setChangePass] = useState<ChangePassRequest>({
    oldPass: "",
    newPass: "",
    reEnterPass: "",
  })
  const [errorMessage, setErrorMessage] = useState<ChangePassRequest>({
    oldPass: "",
    newPass: "",
    reEnterPass: "",
  })

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setChangePass({
      ...changePass,
      [name]: value,
    })
  }

  const validateForm = () =>{

  }

  const hanldeSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(changePass)
    if(validateForm()){
      
    }
  }

  return (
    <div className="hero min-h-screen bg-theme">
      <div className="flex items-center gap-12">
        <div className="card hidden w-1/2 items-center justify-center p-8 shadow-2xl lg:flex">
          <img src="images/auth-forgot-password.png" alt="" className="w-[60%]" />
        </div>
        <div className="w-full max-w-sm shrink-0 px-8 lg:w-1/2 lg:px-2">
          <div className="text-center text-slate-400 lg:text-left">
            <h1 className="text-4xl font-bold">Change Password 🔒</h1>
            <p className="py-6">Change your pass to a more secure one</p>
          </div>
          <form onSubmit={hanldeSubmit}>
            <div className="flex flex-col gap-4">
              <CustomInput
                type="password"
                name="oldPass"
                label="Old password"
                placeholder="Old password"
                onChange={handleChangeInput}
              />
              <CustomInput
                type="password"
                name="newPass"
                label="New password"
                placeholder="New password"
                onChange={handleChangeInput}
              />
              <CustomInput
                type="password"
                name="reEnterPass"
                label="Re-enter new password"
                placeholder="Re-enter new password"
                onChange={handleChangeInput}
              />
              <CustomButton label="Change" />
              <div className="flex justify-center gap-2">
                <Link href="login" className="text-primary-400 hover:underline">
                  Back to login
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
