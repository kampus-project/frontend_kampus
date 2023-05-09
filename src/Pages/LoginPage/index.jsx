import React, {useState} from 'react';
import './loginPage.css'
function LoginPage() {

    const [password, setPassword] = useState('');

    const handleMainSubmit = (event) => {
        event.preventDefault();

        // send survey data to server
        const surveyMainData = {
            password,
        };
        console.log(surveyMainData);

        // reset survey state
        setPassword('');
        
        window.location.href = "/"
    };

    const handleChangePassword = (event) => {
        setPassword(event.target.value);
    };

    return (
        <div>
            <div className="login-wrapper">
                <form className="login-form" onSubmit={handleMainSubmit}>
                    <div className="title-form"> Добро пожаловать!</div>
                    <div className="subtitle-form">Чтобы продолжить работу, пожалуйста, авторизуйтесь.</div>
                    <label className="label-form">
                        Пароль:
                        <input type="password"
                               className="input-form"
                               placeholder="Введите пароль..."
                               value={password}
                               onChange={handleChangePassword}/>
                        {password.length === 0 ? <div className="alert-form">Пароль не может быть пустым</div> : null}
                        {(password.length < 6 && 1 <= password.length ) ? <div className="alert-form">Нехватает {6-password.length} символа</div> : null}
                    </label>
                    <button className="form-button" type="submit" disabled={ password.length < 6 }> Войти </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;