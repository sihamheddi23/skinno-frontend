import React from 'react'

type InputProps = {
    name: string
    type: "text" | "email" | "password" | "number"
    placeholder: string
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
    labelText: string
    id: string
    errors: string | undefined
    value: any
}

const Input: React.FC<InputProps> = ({name, type, placeholder, onChange, labelText, id, errors, value}) => {
  return (
     <div className="mb-4">
          <label className="block text-gray-700 mb-2" htmlFor={id}>{labelText}</label>
          <input
              name={name}
              onChange={onChange}
              type={type}
              id={id}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
              placeholder={placeholder}
              value={value}
          />
          {errors && <p className="text-red-500 mt-2">{errors}</p>}
     </div>
  )
}

export default Input