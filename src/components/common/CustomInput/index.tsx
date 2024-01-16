import { memo } from 'react'

type Props = {
  type?: string
  label?: string
  placeholder?: string
  id?: string
  value?: string | number
  isError?: boolean
  isDisable?: boolean
  customClassName?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const CustomInput = ({ type = 'text', label, placeholder, id, value, isError, isDisable, customClassName, onChange }: Props) => {
  return (
    <div className="w-full">
      {label &&
        <label htmlFor={id} className={`block mb-2 font-medium text-sm ${isError ? 'text-red-600' : 'text-slate-400'}`}>{label}</label>
      }
      <input
        type={type}
        id={id}
        className={`${isError ? 'text-red-400 border border-red-500 focus:outline-red-700' : ' border border-slate-500 focus:border-primary-400'} bg-theme text-slate-300 placeholder:text-slate-600 text-sm rounded-lg focus-visible:outline-none block w-full p-2.5 ${customClassName}`}
        placeholder={placeholder}
        disabled={isDisable}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  )
}

export default memo(CustomInput)