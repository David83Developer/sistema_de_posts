function Input({type, placeholder, onChange, name, value}) {
    return ( 
        <input 
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        value={value}
         />
     );
}

export default Input;