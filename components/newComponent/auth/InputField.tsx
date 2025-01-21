import React from "react";

interface Props {
  label: string;
  value: string;
  type: string;
  placeholder: string;
  id: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField = ({
  label,
  value,
  type,
  placeholder,
  id,
  onChange,
}: Props) => {
  return (
    <div className="flex flex-col">
      <label className="mb-2 text-sm text-start text-gray-900" htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        className="flex items-center w-full px-3 py-3 text-sm font-medium outline-none focus:bg-gray-300 placeholder:text-gray-700 bg-gray-200 text-dark-gray-900 rounded-2xl"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default InputField;
