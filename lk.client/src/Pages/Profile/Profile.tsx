import "./Profile.css"
import { TextField, Button, CircularProgress } from "@mui/material"
import { useAppSelector, useAppDispatch } from "../../hooks/hook"
import { FormEvent, useEffect, useState } from "react";
import { getUser, changePassword } from "../Requests"
import { User } from "../../interfaces/user"
import { showNotification } from "../../store/notificationSlice";
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { logout } from "../../store/authSlice";
 
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

const getDayPostfix = (days: number): string => {
  if (days % 10 === 1 && days % 100 !== 11) {
    return 'день';
  }
  if ((days % 10 >= 2 && days % 10 <= 4) && (days % 100 < 10 || days % 100 >= 20)) {
    return 'дня';
  }
  return 'дней';
};

const Profile = () => {
  const [user, setUser] = useState<User | null>(null);
  const token = useAppSelector(state => state.auth.token)
  const phone = useAppSelector(state => state.auth.phone)
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [oldPassword, setOldPassword] = useState<string>("")
  const [newPassword, setNewPassword] = useState<string>("")
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>("")


  useEffect(() => {
    const fetchUserData = async () => {
        try {
          if(typeof token == "string" && phone)
          {
            const userData = await getUser(phone, token);
            setUser(userData);
          }
        } catch (error : unknown) {
          const axiosError = error as AxiosError<{ message: string }>;
          if(axiosError.status === 401){
            dispatch(showNotification({isGood: false, message: "Срок действия сессии истек"}))
            dispatch(logout())
            navigate("/Login")
          } 
        }
    };

    fetchUserData();
  }, [dispatch, phone, navigate, token]);

  const changePasswordHandler = async (e : FormEvent) => {
    e.preventDefault()
    if(newPassword !== newPasswordConfirm) {
        return dispatch(showNotification({isGood: false, message: "Пароли не совпадают"}))
    }

    if(typeof token == "string" && phone)
    {
      const result = await changePassword(oldPassword, newPassword, token, dispatch, phone)
      if(result == true) {
        setOldPassword("")
        setNewPassword("")
        setNewPasswordConfirm("")
      }
    }
  }


  if (!user) {
    return <div className="fullScreen"><CircularProgress sx={{ color: "#EE7203" }} size={60} /></div>;
  }

  let years = 0;
  let remainderDays = 0;
  let postfixyear = "";
  let postfixday = "";
  let gradeImg = "star-gray.png";
  let message = ""

  if(user && user?.experience > 365)
  {
    years = Math.floor(user?.experience / 365);
    remainderDays = user?.experience % 365;
    postfixyear = years === 1 ? 'год' : years >= 2 && years <= 4 ? 'года' : 'лет';
    postfixday = getDayPostfix(remainderDays);
    
    if(years < 1 && remainderDays < 90){
      gradeImg = "/star-gray.png";
      message = `Привет новичек, ты с нами ${remainderDays + " " + postfixday}!`
    }

    if(years < 1 && remainderDays > 90 && remainderDays < 180){
      gradeImg = "/star-green.png";
      message = `А ты уже не зеленый, мы вместе ${remainderDays + " " + postfixday}!`
    }

    if(years < 1 && remainderDays > 180 && remainderDays < 365){
      gradeImg = "/star-orange.png";
      message = `${remainderDays + " " + postfixday} - столько прошло дней с нашего знакомства, все только впереди!`
    }

    if (years >= 1 && years < 2) {
      gradeImg = "/star-red.png";
      message = `Ого, ты уже ${years + " " + postfixyear} и ${remainderDays + " " + postfixday} с нами, ты настоящий профессионал своего дела!`
    }

    if (years >= 2) {
      gradeImg = "/star-red.png";
      message = `Ого, ты уже ${years + " " + postfixyear} и ${remainderDays + " " + postfixday} с нами, ты настоящий профессионал своего дела!`
    }
  }

  return (
    <div className="profile_wrapper">

      <div className="profile_block1block2">

        <div className='block block1'>
          <h1>Основные данные</h1>

          <TextField label="Фамилия" disabled  value={user.surname} sx={textFieldStyles}/>
          <TextField label="Имя" variant="outlined" disabled  value={user.name} sx={textFieldStyles}/>
          <TextField label="Отчество" variant="outlined" disabled  value={user.patronymic} sx={textFieldStyles}/>
          <TextField label="Дата рождения" variant="outlined" disabled  value={user.birthday} sx={textFieldStyles}/>
          <TextField label="Основная предоставляемая услуга" variant="outlined" disabled  value={user.jobTitle} sx={textFieldStyles}/>
          <TextField label="Основное место предоставления услуг" variant="outlined" disabled  value={user.location} sx={textFieldStyles}/>
          <TextField label="Основное время слота" variant="outlined" disabled  value={user.scheduleStart + " - " + user.scheduleEnd} sx={textFieldStyles}/>
          {/*<TextField label="В сотрудничестве с" variant="outlined" disabled  value={user.entity} sx={textFieldStyles}/>*/}
        </div>

        <div className='block'>

          <form className='block2'onSubmit={(e : FormEvent) => changePasswordHandler(e)}>
            <h1>Смена пароля</h1>
            <TextField required label="Введите старый пароль" type="password" value={oldPassword} sx={passwordFieldStyles} onChange={(e) => setOldPassword(e.target.value)}/>
            <TextField required label="Введите новый пароль" type="password" value={newPassword} sx={passwordFieldStyles} onChange={(e) => setNewPassword(e.target.value)}/>
            <TextField required label="Введите повторно новый пароль" value={newPasswordConfirm} type="password" sx={passwordFieldStyles} onChange={(e) => setNewPasswordConfirm(e.target.value)}/>
            <Button variant="contained" type="submit" sx={{backgroundColor: "#EE7203", fontFamily: "Akrobat", fontSize: "16px"}}> Сохранить </Button>
          </form>

          <div className='block3'>

            <h1 style={{textAlign: 'center'} }>Мы знакомы</h1>

            <div className="image-container" style={{ '--content': `"${years}"` } as React.CSSProperties}>
              <img src={gradeImg} alt=""/>
            </div>

            <div className="congratulationText">
              {message}
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