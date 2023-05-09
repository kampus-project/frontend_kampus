import React from 'react';
import Header from "../Components/Header/index.jsx";
import './studentPage.css'
import Avatar from '@mui/material/Avatar';

import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';


function StudentPage() {

    const CssTextField = styled(TextField)({
        width:"280px",
        '& label.Mui-focused': {
            color: 'grey',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'grey',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'grey',
            },
            '&:hover fieldset': {
                borderColor: 'red',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'red',
            },
        },
    });

    return (
        <div>
            <Header/>
            <div className="wrapper-student">
                <div className="main-student-container">
                    <div className="student-photo">
                        <Avatar
                            alt="U"
                            src="/static/images/avatar/1.jpg"
                            sx={{ width: 200, height: 200, fontSize: 100 }}
                        />
                    </div>
                    <div className="main-information">
                        <div className="main-info">
                            <CssTextField label="Ф.И.О студента"  size="small"/>
                            <CssTextField label="Курс"  size="small"/>
                            <CssTextField label="Университет"  size="small"/>
                            <CssTextField label="Институт"  size="small"/>
                        </div>
                        <div className="main-info">
                            <CssTextField label="Направление"  size="small"/>
                            <CssTextField label="Средний балл"  size="small"/>
                            <CssTextField label="Форма обучения"  size="small"/>
                            <CssTextField label="Форма обучения (оплата)"  size="small"/>
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