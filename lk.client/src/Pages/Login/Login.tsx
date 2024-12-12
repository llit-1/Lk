import { useState } from 'react';
import "./FormLogin"
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
import "./Login.css";
import Snowfall from 'react-snowfall'

function Login() {

    const [isLoginForm, setIsLoginForm] = useState<number>(0)

    return (
        <>
            <Snowfall changeFrequency={400} radius={[1,4]} wind={[-2,3]} rotationSpeed={[-2,2]}/>
            <header>
                <p className='login_p' onClick={() => setIsLoginForm(0)}>
                    <img src="/logo-big.svg" alt="Logo" />
                </p>
            </header>

            <div className={"formAutorization"}>
                {isLoginForm === 0 && (<FormLogin onSwitchForm={(x) => setIsLoginForm(x)} />)}
                {isLoginForm === 1 && (<FormRegister onSwitchForm={(x) => setIsLoginForm(x)} />)}
                <p className='login_p'>{import.meta.env.VITE_VERSION}</p>
            </div>

        </>
    );
}

export default Login;