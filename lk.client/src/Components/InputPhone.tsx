import React, { useMemo } from 'react';
import TextField from '@mui/material/TextField';
import InputMask from 'react-input-mask';
import "../Pages/Login/Login.css";

const PhoneNumberInput = ({ value, onChange }: { value: string; onChange: (event: React.ChangeEvent<HTMLInputElement>) => void }) => {
    const maskedInput = useMemo(() => (
        <InputMask
            mask="+7 (999) 999-99-99"
            value={value}
            onChange={onChange}
        >
            {() => (
                <TextField
                    required
                    autoComplete = 'username'
                    className={"textInput"}
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
    ), [value, onChange]);

    return maskedInput;
}

export default PhoneNumberInput;
