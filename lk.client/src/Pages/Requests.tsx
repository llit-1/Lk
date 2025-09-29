import axios, { AxiosError } from 'axios';
import { AppDispatch } from "../store/index";
import { showNotification } from '../store/notificationSlice';
import { login } from '../store/authSlice';
import { User } from "../interfaces/user";
import { ExchangeSlot } from "../interfaces/ExchangeSlot";
import { FutureSlots } from "../interfaces/FutureSlots";
import { Statistic } from "../interfaces/Statistic";
import {PhoneCallResponse, CheckCodeResponse} from "../interfaces/GetCodeFromCall"


// Получаем хоста для дев режима
const getHost = (): string => {
  return import.meta.env.VITE_DEV === "1" && import.meta.env.VITE_DEV_HOST 
    ? import.meta.env.VITE_DEV_HOST 
    : "";
};

// Обработчик ошибок
const handleError = (error: unknown, dispatch: AppDispatch, defaultMessage: string) => {
  const axiosError = error as AxiosError<{ message: string }>;
  const message = axiosError.response?.data.message || defaultMessage;
  dispatch(showNotification({ isGood: false, message }));
};

// Функция для отправки запроса на сервер для подтверждения телефона
export const setPhoneCode = async (phoneDigits: string, dispatch: AppDispatch): Promise<number | null> => {
  const host = getHost();
  try {
    const response = await axios.patch(`${host}/api/Authorization/set-phone-code?phone=${phoneDigits}`);
    if (response.status === 200) {
      dispatch(showNotification({ isGood: true, message: 'Ожидайте звонка!' }));
      return 1;
    } else {
      dispatch(showNotification({ isGood: false, message: 'Введите корректный номер телефона!' }));
      return null;
    }
  } catch (error) {
    handleError(error, dispatch, 'Сервис временно недоступен, попробуйте позже');
    return null;
  }
};


// Функция для отправки запроса на сервер для подтверждения телефона
export const getPhoneForCall = async (phoneDigits: string, dispatch: AppDispatch): Promise<PhoneCallResponse | null> => {
  const host = getHost();
  try {
    const response = await axios.get(`${host}/api/Authorization/get-phone?phone=${phoneDigits}`);
    if (response.status === 200) {
      const data = response.data;
      // Вернуть номер телефона для звонка
      return data; // зависит от структуры ответа
    } else {
      dispatch(showNotification({ isGood: false, message: 'Введите корректный номер телефона!' }));
      return null;
    }
  } catch (error) {
    handleError(error, dispatch, 'Сервис временно недоступен, попробуйте позже');
    return null;
  }
};


export const сheckCallResult = async(check_id : string, dispatch: AppDispatch): Promise<CheckCodeResponse | null> => {
  const host = getHost();
  try {
    const response = await axios.get(`${host}/api/Authorization/check-id?id=${check_id}`);
    if (response.status === 200) {
      return response.data;
    } else {
      dispatch(showNotification({ isGood: false, message: 'Введите корректный номер телефона!' }));
      return null;
    }
  } catch (error) {
    handleError(error, dispatch, 'Сервис временно недоступен, попробуйте позже');
    return null;
  }
}

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
      localStorage.removeItem("authToken");
      localStorage.removeItem("phone");
      localStorage.setItem("authToken", token);
      localStorage.setItem("phone", phone.replace(/\D/g, '').substring(1));
      dispatch(login({ token, phone: phone.replace(/\D/g, '').substring(1) }));
      return token;
    } else {
      dispatch(showNotification({ isGood: false, message: 'Неправильный номер телефона или пароль!' }));
      return null;
    }
  } catch (error) {
    handleError(error, dispatch, 'Сервис временно недоступен, попробуйте позже');
    return null;
  }
};

// Функция для проверки кода телефона
export const checkPhoneCode = async (
  phone: string | null,
  codeFromSMS: string,
  dispatch: AppDispatch
): Promise<number | null> => {
  const host = getHost();
  try {
    const response = await axios.post(`${host}/api/Authorization/check-phone-code`, {
      Phone: phone,
      Password: "",
      Code: codeFromSMS
    });

    if (response.status === 200) {
      dispatch(login({ phone: phone ?? undefined, code: codeFromSMS }));
      dispatch(showNotification({ isGood: true, message: 'Код принят' }));
      return 2; // Возвращаем номер формы для перехода
    } else {
      dispatch(showNotification({ isGood: false, message: 'Код неверный!' }));
      return null;
    }
  } catch (error) {
    handleError(error, dispatch, 'Ошибка при отправке данных');
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
    const setPasswordResponse = await axios.post(`${host}/api/Authorization/set-password`, {
      Phone: phone,
      Password: password,
      Code: code
    });

    if (setPasswordResponse.status === 200) {
      // После успешной смены пароля, вызываем логин
      const authToken = await setLogin("9" + phone, password, dispatch);

      if (authToken) {
        dispatch(login({ token: authToken, phone: phone ?? undefined, code: code ?? undefined }));
        dispatch(showNotification({ isGood: true, message: 'Вы успешно авторизовались!' }));
        return true; // Успешная авторизация
      } else {
        dispatch(showNotification({ isGood: false, message: 'Ошибка при авторизации' }));
      }
    } else {
      dispatch(showNotification({ isGood: false, message: 'Ошибка при смене пароля' }));
    }
  } catch (error) {
    handleError(error, dispatch, 'Ошибка при отправке данных');
  }
  return false;
};

// Функция для получения данных пользователя
export const getUser = async (phone: string, token: string): Promise<User> => {
  const host = getHost();
  try {
    const response = await axios.get<User>(`${host}/api/User/get?phone=${phone}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error : unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if(axiosError.status === 401){
      throw error;
    }
    throw error;
  }
};

// Функция для изменения пароля
export const changePassword = async (
  oldPassword: string,
  newPassword: string,
  token: string,
  dispatch: AppDispatch,
  phone: string
): Promise<boolean> => {
  const host = getHost();

  try {
    const response = await axios.patch(
      `${host}/api/Authorization/change-password`,
      {
        oldPassword: oldPassword,
        newPassword: newPassword,
        phone: phone,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.status === 200) {
      dispatch(
        showNotification({
          isGood: true,
          message: "Пароль успешно изменен!",
        })
      );
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error during password change request:", error); // Лог ошибки
    handleError(error, dispatch, "Ошибка при отправке данных");
    throw error;
  }
};


// Функция для проверки токена
export const checkToken = async (token: string): Promise<boolean> => {
  const host = getHost();
  try {
    const response = await axios.get<boolean>(`${host}/api/Authorization/check-token`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error : unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if(axiosError.status === 401){
      throw error;
    }
    throw error;
  }
};

export const getWorkingSlots = async (): Promise<ExchangeSlot[]> => {
  const host = getHost();
  try {
    const response = await axios.get<ExchangeSlot[]>(`${host}/api/Slots/getall?userPhone=${localStorage.getItem("phone")}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (error : unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if(axiosError.status === 401){
      throw error;
    }
    throw error;
  }
};

export const takeWorkingSlots = async (Id: number): Promise<number> => {
  const host = getHost();
  try {
    const response = await axios.put<number>(`${host}/api/Slots/takesheet`, {
      Id: Id,
      Phone: localStorage.getItem("phone"),
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  )
    return response.status;
  } catch (error : unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if(typeof axiosError.status == "number")
    {
      return axiosError.status;
    }
    return 400;
  }
};


export const getFutureUserSheets = async (): Promise<FutureSlots[] | number> => {
  const host = getHost();
  try {
    const response = await axios.get<FutureSlots[]>(`${host}/api/Slots/getfutureusersheets?phone=` + localStorage.getItem("phone"),
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  )
    return response.data;
  } catch (error : unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if(typeof axiosError.status == "number")
    {
      return axiosError.status;
    }
    return 400;
  }
};

export const getPastUserSheets = async (Year : string, Month: string): Promise<FutureSlots[] | number> => {
  const host = getHost();
  try {
    const response = await axios.patch<FutureSlots[]>(`${host}/api/Slots/getoldusersheets`,
    {
      Phone: localStorage.getItem("phone"),
      Year: Year,
      Month: Month
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  )
    return response.data;
  } catch (error : unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if(typeof axiosError.status == "number")
    {
      return axiosError.status;
    }
    return 400;
  }
};

export const getStatistic = async (Year : string, Month: string): Promise<Statistic | number> => {
  const host = getHost();
  try {
    const response = await axios.patch<Statistic>(`${host}/api/Slots/getstatistic`,
    {
      Phone: localStorage.getItem("phone"),
      Year: Year,
      Month: Month
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  )
    return response.data;
  } catch (error : unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if(typeof axiosError.status == "number")
    {
      return axiosError.status;
    }
    return 400;
  }
};

export const dropSheet = async (id : number): Promise<number> => {
  const host = getHost();
  try {
    const response = await axios.put<number>(`${host}/api/Slots/dropsheet`,
    {
      Id: id,
      Phone: localStorage.getItem("phone")
    },
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    }
  )
    return response.status;
  } catch (error : unknown) {
    const axiosError = error as AxiosError<{ message: string }>;
    if(typeof axiosError.status == "number")
    {
      return axiosError.status;
    }
    return 400;
  }
};