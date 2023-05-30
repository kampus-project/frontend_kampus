import React, {useEffect, useState} from 'react';
import Header from "../Components/Header/index.jsx";
import './studentPage.css'
import {useLocalState} from "../useLocalStorage/index.js";
import {useParams} from "react-router-dom";


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

    return (
        <div>
            <Header/>
            <div className="wrapper-student">
                <div className="main-student-container">
                    <div className="title-student"> Информация о студенте</div>
                    <div className="main-information">
                        <div className="main-info">
                            <label className="info-label">
                                ФИО Студента
                                <input type="text" value={student.lastName + " " + student.firstName} disabled/>
                                <input type="text" defaultValue={student.middleName} disabled/>
                            </label>
                            <label className="info-label">
                                Курс
                                <input type="text" defaultValue={student.courseNumber} disabled/>
                            </label>
                            <label className="info-label">
                                Название университета
                                <input type="text"  defaultValue={student.universityName} disabled/>
                            </label>
                            <label  className="info-label">
                                Название направления
                                <input type="text"  defaultValue={student.courseTitle} disabled/>
                            </label>
                        </div>
                        <div className="main-info">
                            <label  className="info-label">
                                Вид обучения
                                <input type="text"  defaultValue={student.studyForm} disabled/>
                            </label>
                            <label  className="info-label">
                                Форма обучения
                                <input type="text"  defaultValue={student.educationForm} disabled/>
                            </label>
                            <label  className="info-label">
                                Уровень обучения
                                <input type="text"  defaultValue={student.typeHighEducation} disabled/>
                            </label>
                            <label  className="info-label">
                                Средний балл
                                <input type="text"  defaultValue={student.averageGrade} disabled/>
                            </label>
                        </div>
                        <div className="main-info">
                            колонка параметров 3
                        </div>
                        <div className="main-info">
                            колонка параметров 4
                        </div>
                    </div>
                </div>
                <div className="sub-student-container">
                    <div className="title-student"> Портфолио студента</div>
                </div>
            </div>
        </div>
    );
}

export default StudentPage;

/*

* */