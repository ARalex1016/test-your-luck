const Input = ({
  type,
  placeholder,
  readonly = false,
  value,
  name,
  onChange,
  className,
}) => {
  const handleChange = (e) => {
    onChange(e);
  };

  return (
    <>
      <input
        type={type}
        placeholder={placeholder}
        readOnly={readonly}
        value={value}
        name={name}
        onChange={(e) => handleChange(e)}
        className={`w-full p-2 outline-none rounded-sm ${className}`}
      />
    </>
  );
};

export default Input;
