import { useState } from 'react';
import "./FormLogin"
import FormLogin from './FormLogin';
import FormRegister from './FormRegister';
// import FormResetPassword from './FormResetPassword';
import "./Login.css";

function Login() {

    const [isLoginForm, setIsLoginForm] = useState<number>(0)

    return (
        <>
            <header>
                <p onClick={() => setIsLoginForm(0)}>
                    <img src="/logo-big.svg" alt="Logo" />
                </p>
            </header>

            <div className={"formAutorization"}>
                {isLoginForm === 0 && (<FormLogin onSwitchForm={(x) => setIsLoginForm(x)} />)}
                {isLoginForm === 1 && (<FormRegister onSwitchForm={(x) => setIsLoginForm(x)} />)}
                {/* {isLoginForm === 2 && (<FormResetPassword onSwitchForm={(x) => setIsLoginForm(x)} />)} */}
                <p>v 0.0.0.1</p>
            </div>

        </>
    );
}

export default Login;