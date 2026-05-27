function Button({ children, type }) {
  return (
    <button
      type={type}
      className="w-full bg-black text-white py-3 rounded-lg hover:opacity-90 transition"
    >
      {children}
    </button>
  )
}

export default Button