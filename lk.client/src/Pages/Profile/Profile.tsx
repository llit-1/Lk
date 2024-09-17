import "./Profile.css"
import {TextField, Button} from "@mui/material"

const textFieldStyles = {
  "& .MuiInputBase-input.Mui-disabled": {
    color: "black", // Цвет текста
    WebkitTextFillColor: "black", // Переопределяем -webkit-text-fill-color
    fontFamily: "Akrobat"
  },
  "& .MuiFormLabel-root.Mui-disabled": {
    color: "black", // Цвет label
    fontFamily: "Akrobat"
  },
};

const passwordFieldStyles = {
  ".css-1q964xs-MuiFormLabel-root-MuiInputLabel-root": {
    fontFamily: "Akrobat"
  }
}

const Profile = () => {
  return (
    <div className="profile_wrapper">

      <div className="profile_block1block2">

        <div className='block block1'>
          <h1>Основные данные</h1>

          <TextField label="Фамилия" disabled  value={"Кургузов"} sx={textFieldStyles}/>
          <TextField label="Имя" variant="outlined" disabled  value={"Владислав"} sx={textFieldStyles}/>
          <TextField label="Отчество" variant="outlined" disabled  value={"Сергеевич"} sx={textFieldStyles}/>
          <TextField label="Дата рождения" variant="outlined" disabled  value={"12.02.2001"} sx={textFieldStyles}/>
          <TextField label="Должность" variant="outlined" disabled  value={"Программист"} sx={textFieldStyles}/>
          <TextField label="Торговая точка" variant="outlined" disabled  value={"Кантемировская ул., 37"} sx={textFieldStyles}/>
          <TextField label="Время смены" variant="outlined" disabled  value={"08:00 - 17:00"} sx={textFieldStyles}/>
          <TextField label="Юр. лицо" variant="outlined" disabled  value={'ООО "Люди Любят"'} sx={textFieldStyles}/>
        </div>

        <div className='block'>

          <div className='block2'>
            <h1>Смена пароля</h1>
            <TextField label="Введите старый пароль" type="password" sx={passwordFieldStyles}/>
            <TextField label="Введите новый пароль" type="password" sx={passwordFieldStyles}/>
            <TextField label="Введите повторно новый пароль" type="password" sx={passwordFieldStyles}/>
            <Button variant="contained" sx={{backgroundColor: "#EE7203", fontFamily: "Akrobat", fontSize: "16px"}}> Сохранить </Button>
          </div>

          <div className='block3'>

            <h1>Стаж</h1>

            <div className="image-container">
              <img src='/star-red.png' alt=""/>
            </div>

            <div className="congratulationText">
              Ого, ты уже <b>7</b> лет с нами, так держать!
            </div>

          </div>

        </div>

      </div>
    
      <div className='block block4'> 
        <p>Нашли ошибку? Позвоните:</p>
        <a href="tel:+79643989073">+7 (964) 398-90-73</a>
      </div>
    </div>
  )
}

export default Profile