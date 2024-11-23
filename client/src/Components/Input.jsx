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
        className={`w-full text-sm px-2 py-1 outline-none rounded-lg ${className}`}
      />
    </>
  );
};

export default Input;
