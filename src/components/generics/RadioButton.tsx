import React from 'react'

type RadioButtonProps = {
  name: string
  value: string
  optionName: string
  checked: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const RadioButton: React.FC<RadioButtonProps> = ({ name, value, optionName, checked, onChange }) => {
  return (
    <div className="mb-4">
      <label className="inline-flex items-center">
        <input type="radio" onChange={onChange} className="form-radio" name={name} value={value} checked={checked} />
        <span className="ml-2">{optionName}</span>
      </label>

    </div>
  )
}

export default RadioButton