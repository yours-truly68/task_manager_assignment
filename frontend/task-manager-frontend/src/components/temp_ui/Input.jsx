function Input({
  label,
  type,
  placeholder,
  value,
  onChange,
}) {
  return (
    <div>
      <label className="block mb-1 font-medium">
        {label}
      </label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  )
}

export default Input