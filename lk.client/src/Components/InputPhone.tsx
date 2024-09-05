import React, { useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import IMask from 'imask';
import "../Pages/Login/Login.css";

interface PhoneNumberInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ value, onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      const maskOptions = {
        mask: '+{7} (000) 000-00-00',
      };
      const mask = IMask(inputRef.current, maskOptions);

      // Обновляем значение маски при изменении value
      mask.updateValue();

      return () => {
        mask.destroy(); // Очищаем маску при размонтировании компонента
      };
    }
  }, [value]);

  const handleChange = () => {
    if (inputRef.current) {
      const newValue = inputRef.current.value;
      onChange({ target: { value: newValue } } as React.ChangeEvent<HTMLInputElement>);
    }
  };

  return (
    <TextField
      required
      autoComplete="username"
      className="textInput"
      type="tel"
      label="Номер телефона"
      variant="outlined"
      size="medium"
      inputRef={inputRef}
      onChange={handleChange}
      value={value} // Передаем значение из родительского компонента
      sx={{
        fontFamily: 'Roboto, sans-serif',
        '& .MuiOutlinedInput-root': { borderRadius: 0 },
        backgroundColor: 'white',
      }}
    />
  );
}

export default PhoneNumberInput;
