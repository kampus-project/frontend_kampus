import React, {useState} from 'react';
import './loginPage.css'
import {useLocalState} from "../useLocalStorage/index.js";
import {Navigate} from "react-router-dom";
function LoginPage() {

    const [password, setPassword] = useState('');
    const [jwt, setJwt] = useLocalState('', 'jwt')
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const handleMainSubmit = (event) => {
        event.preventDefault();

        // send survey data to server
        const surveyMainData = {
            password,
        };
        console.log(surveyMainData);

        fetch(`${backendUrl}/api/v1/auth/login`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "post",
            body: JSON.stringify(surveyMainData)
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("OK");
                    return Promise.all([response.json(), response.headers]);
                } else if (response.status === 401){
                    console.log("Неверное имя пользователя или пароль")
                } else {
                    return Promise.reject("Invalid login response attempt");
                }
            })
            .then((response) => {
                setJwt(response['0']['token']);
                window.location.href = "/"
            });

        // reset survey state
        setPassword('');
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    return jwt?(
        <Navigate to="/"/>
    ): (
        <div>
            <div className="login-wrapper">
                <form className="login-form" onSubmit={handleMainSubmit}>
                    <h1>Djkfr2233</h1>
                    <div className="title-form"> Добро пожаловать!</div>
                    <div className="subtitle-form">Чтобы продолжить работу, пожалуйста, авторизуйтесь.</div>
                    <label className="label-form">
                        Пароль:
                        <input type="password"
                               className="input-form"
                               placeholder="Введите пароль..."
                               value={password}
                               onChange={handleChangePassword}/>
                        {(password.length < 1) ? <div className="alert-form">Пароль не может быть пустым</div> : null}
                    </label>
                    <button className="form-button" type="submit" disabled={ password.length < 6 }> Войти </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;