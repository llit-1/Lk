import { useState } from 'react';
import "./Login.css"
import GetPhone from "./GetPhone"
import GetCode from "./GetCode"
import GetPassword from "./GetPassword"

// getCodeRequest - показывает разные формы
// 0 - показать форму с вводом телефона
// 1 - показать форму с вводом кода из СМС
// 2 - показать форму с вводом пароля


function FormRegister({ onSwitchForm }: { onSwitchForm: (x: number) => void }) {
  const [phone, setPhone] = useState<string>("");
  const [getCodeRequest, setGetCodeRequest] = useState<number>(0)

  switch(getCodeRequest)
  {
      case(0): 
        return (<GetPhone onSwitchForm={onSwitchForm} phone={phone} setPhone={setPhone} setGetCodeRequest = {setGetCodeRequest}/>)
      case(1):
        return (<GetCode onSwitchForm={onSwitchForm} setGetCodeRequest = {setGetCodeRequest}/>)
      case(2):
        return (<GetPassword onSwitchForm={onSwitchForm}/>)
  }
}

export default FormRegister;
