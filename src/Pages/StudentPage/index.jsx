import React, {useEffect, useState} from 'react';
import Header from "../Components/Header/index.jsx";
import './studentPage.css'
import Avatar from '@mui/material/Avatar';

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import {useLocalState} from "../useLocalStorage/index.js";
import {useParams} from "react-router-dom";


function StudentPage() {

    const { id } = useParams();

    const CssTextField = styled(TextField)({
        width:"290px",
        marginTop:"10px",
        marginBottom:"10px",
        '& label.Mui-focused': {
            color: 'red',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'red',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'red',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'red',
            },
        },
    });

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
                    <div className="main-information">
                        <div className="main-info">
                            <CssTextField label="Ф.И.О студента" size="small" value = {student.lastName + " " + student.firstName + " " + student.middleName}/>
                            <CssTextField label="Курс"  size="small"  value = {student.courseNumber}/>
                            <CssTextField label="Университет"  size="small"  value = {student.universityName}/>
                            <CssTextField label="Институт"  size="small"  value = {student.universityName}/>
                        </div>
                        <div className="main-info">
                            <CssTextField label="Направление"  size="small" value={student.courseTitle}/>
                            <CssTextField label="Средний балл"  size="small" value={student.averageGrade}/>
                            <CssTextField label="Форма обучения"  size="small" value={student.educationForm}/>
                            <CssTextField label="Форма обучения (оплата)"  size="small" value={student.trainingForm}/>
                        </div>
                        <div className="main-info">
                            <CssTextField label="Форма образования"  size="small"/>
                            <CssTextField label="Стипендия"  size="small"/>
                            <CssTextField label="Параметр"  size="small"/>
                            <CssTextField label="Параметр"  size="small"/>
                        </div>
                        <div className="main-info">
                            <CssTextField label="Параметр"  size="small"/>
                            <CssTextField label="Параметр"  size="small"/>
                            <CssTextField label="Параметр"  size="small"/>
                            <CssTextField label="Параметр"  size="small"/>
                        </div>
                    </div>
                </div>
                <div className="sub-student-container">

                </div>
            </div>
        </div>
    );
}

export default StudentPage;