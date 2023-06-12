import React, {useEffect, useState} from 'react';
import Header from "../Components/Header/index.jsx";
import './studentPage.css'
import {useLocalState} from "../useLocalStorage/index.js";
import {Link, useParams} from "react-router-dom";
import Avatar from "../Components/Avatar/index.jsx";
import WestIcon from '@mui/icons-material/West';

function StudentPage() {

    const { id } = useParams();

    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [jwt, setJwt] = useLocalState('', 'jwt')

    const [student, setStudent] = useState([]);

    useEffect(() => {
        fetch(`${backendUrl}/api/v1/student/getStudent/${id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + jwt,
            },
            method: "get",
        })
            .then((response) => response.json())
            .then((data) => setStudent(data))
            .catch(error => console.error(error));
    }, [id])
    console.log(student)

    const [avatarData, setAvatarData] = useState('');

    const handleAvatarChange = (data) => {
        setAvatarData(data);
        // Выполните дополнительные действия с данными, например, отправьте их на сервер или сохраните локально
        // Ниже приведен пример, как можно сохранить данные в localStorage:
        localStorage.setItem('avatarData', data);
    };

    // Обработчик для кнопки "Сохранить" в родительском компоненте
    const handleSaveClick = () => {
        // Выполните дополнительные действия, связанные с сохранением аватарки
        // Например, отправьте данные на сервер или выполните другие необходимые действия
        console.log('Аватарка сохранена:', avatarData);
    };

    return (
        <div>
            <Header/>
            <div className="back-link"><Link to="/" style={{
                textDecoration:"none",
                display:"flex",
                justifyContent:"space-between",
                color:"black",
                fontSize:"20px",
                fontWeight:"600",
                width:"100px"
            }}> <WestIcon/> Назад</Link></div>
            <div className="wrapper-student">
                <div className="main-student-container">
                    <div className="user-info">
                        <div className="avatar-container">
                            <Avatar
                                onAvatarChange={handleAvatarChange}
                            />
                        </div>
                        <div className="info-container">
                            <div className="title-info">Информация о студенте</div>
                            <div className="input-container">
                                <label>
                                    Фамилия
                                    <input type="text" defaultValue={student.lastName} disabled/>
                                </label>
                                <label>
                                    Имя
                                    <input type="text" defaultValue={student.firstName} disabled/>
                                </label>
                                <label>
                                    Отчество
                                    <input type="text" defaultValue={student.middleName} disabled/>
                                </label>
                                <label>
                                    Login
                                    <input type="text" disabled/>
                                </label>
                                <label>
                                    Номер телефона
                                    <input type="text" disabled/>
                                </label>
                                <label>
                                    Почта
                                    <input type="text" disabled/>
                                </label>
                            </div>
                        </div>
                    </div>
                    <div className="first-container-summary">
                        <label>
                            Дата регистрации
                             <input type="text" defaultValue={student.receiptDate} disabled/>
                        </label>
                        <label>
                            Университет
                             <input type="text" defaultValue={student.universityName} disabled/>
                        </label>
                        <label>
                            Институт
                             <input type="text"  disabled/>
                        </label>
                        <label>
                            Направление
                             <input type="text" defaultValue={student.courseTitle}  disabled/>
                        </label>
                        <label>
                            Вид обучения
                             <input type="text" defaultValue={student.studyForm} disabled/>
                        </label>
                        <label>
                            Форма обучения
                             <input type="text" defaultValue={student.educationForm} disabled/>
                        </label>
                        <label>
                            Уровень образования
                             <input type="text" defaultValue={student.typeHighEducation} disabled/>
                        </label>
                        <label>
                            Курс
                             <input type="text" defaultValue={student.courseNumber} disabled/>
                        </label>
                        <label>
                            Ср.балл
                             <input type="text" defaultValue={student.averageGrade} disabled/>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentPage;
