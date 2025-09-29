import Button from '@mui/material/Button/Button'
import React, { useEffect, useState, useCallback } from 'react'
import { useAppSelector, useAppDispatch } from "../../hooks/hook"
import {getPhoneForCall, сheckCallResult} from "../Requests"
import { showNotification } from '../../store/notificationSlice';
import {PhoneCallResponse, CheckCodeResponse} from "../../interfaces/GetCodeFromCall"

interface GetCodeFromCallProps {
  setGetCodeRequest: React.Dispatch<React.SetStateAction<number>>;
}



export const GetCodeFromCall : React.FC<GetCodeFromCallProps> = ({ setGetCodeRequest }) => {

    const phone = useAppSelector((state) => state.auth.phone);
    const dispatch = useAppDispatch();

    const [numberToCall, setNumberToCall] = useState<string>("")
    const [checkCode, setCheckCode] = useState<string>("")
    const [isLoading, setIsLoading] = useState(false);

    const getPhoneForCallHandler = useCallback(async (): Promise<PhoneCallResponse | null> => {
        if (!phone) return null;
        return await getPhoneForCall(phone, dispatch);
    }, [phone, dispatch]);

    const checkCallResultWithCheckCode = useCallback(async (): Promise<CheckCodeResponse | null> => {
        if (!checkCode) return null;
        
        setIsLoading(true);
        try {
            const result = await сheckCallResult(checkCode, dispatch);
            
            if (!result) {
                dispatch(showNotification({ isGood: false, message: "Ошибка проверки звонка" }));
                return null;
            }
            
            if (result.check_status === "401") {
                setGetCodeRequest(2);
            } else {
                dispatch(showNotification({ 
                    isGood: false, 
                    message: result.check_status_text || "Входящих звонков не найдено"
                }));
            }
            return null;
        } catch (error) {
            console.error("Error checking call result:", error);
            dispatch(showNotification({ isGood: false, message: "Ошибка при проверке звонка" }));
            return null;
        } finally {
            setIsLoading(false);
        }
    }, [checkCode, dispatch, setGetCodeRequest]);

    useEffect(() => {
        let timer: NodeJS.Timeout;

        const fetchPhoneNumber = async () => {
            try {
                const phoneNumber = await getPhoneForCallHandler();

                if (phoneNumber?.call_phone_pretty) {
                    setNumberToCall(phoneNumber.call_phone_pretty);
                }
                
                if (phoneNumber?.check_id) {
                    setCheckCode(phoneNumber.check_id);
                }

                timer = setTimeout(() => {
                    checkCallResultWithCheckCode();
                }, 17000);

            } catch (error) {
                console.error("Error fetching phone number:", error);
                dispatch(showNotification({ 
                    isGood: false, 
                    message: "Ошибка при получении номера для звонка" 
                }));
            }
        }

        if (phone) {
            fetchPhoneNumber();
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        }

    }, [phone, getPhoneForCallHandler, checkCallResultWithCheckCode, dispatch]);

    return (
        <form style={{paddingTop: "0px"}}>
            <div className='textInfoCall'>
                Для авторизации позвоните по указанному номеру телефона. Звонок бесплатный.
            </div>
            <a className='linkCall' href={`tel:${numberToCall}`}>{numberToCall}</a>

            <Button
                className={"buttonInput"}
                size="small"
                onClick={checkCallResultWithCheckCode}
                disabled={isLoading || !checkCode}
                sx={{
                    color: "white", 
                    fontFamily: 'Akrobat', 
                    backgroundColor: "#F47920"
                }}
            >
                {isLoading ? "Проверка..." : "Звонок выполнен"}
            </Button>

            <Button
                variant="outlined"
                className={"buttonInput"}
                sx={{
                    color: "#6d6d6d", 
                    fontFamily: 'Akrobat', 
                    border: "none", 
                    backgroundColor: "none",
                }}
                size="small"
                onClick={() => setGetCodeRequest(0)}
            >
                Назад
            </Button>
        </form>
    )
}