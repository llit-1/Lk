import React from 'react';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import "../Pages/Login/Login.css";

interface PhoneNumberInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({ value, onChange }) => {
  return (
    <InputMask
      mask="+7 (999) 999-99-99"
      value={value}
      onChange={onChange}
    >
      {(inputProps) => (
        <TextField
          {...inputProps} // Передаем все необходимые пропсы
          required
          autoComplete="username"
          className="textInput"
          type="tel"
          label="Номер телефона"
          variant="outlined"
          size="medium"
          sx={{
            fontFamily: 'Roboto, sans-serif',
            '& .MuiOutlinedInput-root': { borderRadius: 0 },
            backgroundColor: 'white',
          }}
        />
      )}
    </InputMask>
  );
}

export default PhoneNumberInput;
