const Input = ({
  type,
  label,
  placeholder,
  changeHandler,
  blurHandler,
  value,
  className,
  name
}) => {
  return (
    <div className={`w-full ${className ? className : ''}`}>
      <label className='block text-black text-sm font-bold mb-2'>{label}</label>
      <input
        className='w-full p-3 bg-white rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
        type={`${type ? type : 'text'}`}
        name={name}
        placeholder={placeholder}
        onChange={changeHandler}
        onBlur={blurHandler}
        value={value}
      />
    </div>
  );
};

export default Input;
