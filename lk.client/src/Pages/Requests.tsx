import axios, { AxiosError } from 'axios';
import { AppDispatch } from "../store/index";
import { showNotification } from '../store/notificationSlice';
import { login } from '../store/authSlice';

const getHost = (): string => {
  let host: string = "";
  if (import.meta.env.VITE_DEV == "1" && import.meta.env.VITE_DEV_HOST) {
    host = import.meta.env.VITE_DEV_HOST;
  }
  return host;
};

// Функция для отправки запроса на сервер для подтверждения телефона
export const setPhoneCode = async (phoneDigits: string, dispatch: AppDispatch): Promise<number | null> => {
  const host = getHost();
  try {
    const response = await axios.patch(host + `/api/Authorization/set-phone-code?phone=${phoneDigits}`);

    if (response.status === 200) {
      dispatch(showNotification({ isGood: true, message: 'Ожидайте звонка!' }));
      return 1;
    } else {
      dispatch(showNotification({ isGood: false, message: 'Введите корректный номер телефона!' }));
      return null;
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if (axiosError.response && axiosError.response.data && axiosError.response.data.message) {
      dispatch(showNotification({ isGood: false, message: axiosError.response.data.message }));
    } else {
      dispatch(showNotification({ isGood: false, message: 'Сервис временно недоступен, попробуйте позже' }));
    }
    return null;
  }
};

// Функция для отправки запроса на сервер для авторизации
export const setLogin = async (
  phone: string | null, 
  password: string, 
  dispatch: AppDispatch
): Promise<string | null> => {
  if (!phone) return null;

  const host = getHost();

  try {
    const response = await axios.post(`${host}/api/Authorization/login`, {
      phone: phone.replace(/\D/g, '').substring(1),
      password,
      code: ""
    });

    if (response.status === 200) {
      const token = response.data;
      localStorage.setItem("authToken", token);
      return token;
    } else {
      dispatch(showNotification({ isGood: false, message: 'Неправильный номер телефона или пароль!' }));
      return null;
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    const errorMessage = axiosError.response?.data?.message || 'Сервис временно недоступен, попробуйте позже';
    dispatch(showNotification({ isGood: false, message: errorMessage }));
    return null;
  }
};

export const checkPhoneCode = async (
  phone: string | null,
  codeFromSMS: string,
  dispatch: AppDispatch
): Promise<number | null> => {
  const host = getHost();
  try {
    const response = await axios.post(host + "/api/Authorization/check-phone-code", {
      Phone: phone,
      Password: "",
      Code: codeFromSMS
    });

    if (response.status === 200) {
      dispatch(login({ token: "", phone, code: codeFromSMS }));
      dispatch(showNotification({ isGood: true, message: 'Код принят' }));
      return 2; // Возвращаем номер формы для перехода
    } else {
      dispatch(showNotification({ isGood: false, message: 'Код неверный!' }));
      return null;
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    dispatch(showNotification({ isGood: false, message: axiosError.response!.data.message }));
    return null;
  }
};

// Функция для установки пароля и логина
export const setPasswordAndLogin = async (
  phone: string | null,
  password: string,
  code: string | null,
  dispatch: AppDispatch
): Promise<boolean> => {
  const host = getHost();
  try {
    const setPasswordResponse = await axios.post(host + "/api/Authorization/set-password", {
      Phone: phone,
      Password: password,
      Code: code
    });

    if (setPasswordResponse.status === 200) {
      // После успешной смены пароля, вызываем логин
      const authToken = await setLogin("9" + phone, password, dispatch);

      if (authToken) {
        dispatch(login({ token: authToken, phone: phone, code: code }));
        dispatch(showNotification({ isGood: true, message: 'Вы успешно авторизовались!' }));
        return true; // Успешная авторизация
      } else {
        dispatch(showNotification({ isGood: false, message: 'Ошибка при авторизации' }));
      }
    } else {
      dispatch(showNotification({ isGood: false, message: 'Ошибка при смене пароля' }));
    }
  } catch (error: unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    dispatch(showNotification({ isGood: false, message: axiosError.response?.data.message || 'Ошибка при отправке данных' }));
    console.error("Ошибка:", error);
  }
  return false;
};