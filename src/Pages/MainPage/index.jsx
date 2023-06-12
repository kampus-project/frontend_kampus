import React, {useEffect, useState} from 'react';
import './mainPage.css'
import Header from "../Components/Header/index.jsx";
import UniversityData from "../Components/Statistic/UniversityData/index.jsx";
import UniversityInstituteData from "../Components/Statistic/UniversityInstituteData/index.jsx";
import AllUsers from "../Components/Statistic/AllUsersWeek/index.jsx";
import RegistrationDependency from "../Components/Statistic/RegistrationDependency/index.jsx";
import Directions from "../Components/Statistic/Directions/index"
import PaymentType from "../Components/Statistic/PaymentType/index.jsx";
import StudyingType from "../Components/Statistic/StudyingType/index.jsx";
import MainTable from "../Components/MainTable/index.jsx";

import { DataDirections } from "../Components/Statistic/Directions/Data.js";
import {useLocalState} from "../useLocalStorage/index.js";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';


function MainPage() {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [jwt, setJwt] = useLocalState('', 'jwt')

    const [activeTab, setActiveTab] = useState(0);

    const handleClickTab = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    const [allDynamicProgress, setAllDynamicProgress] = useState([]);
    const [allUsers, setAllUsers] = useState(null);
    const [registrationDependency, setRegistrationDependency] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllDynamicProgress = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/v1/dynamicProgress/getAllDynamicProgress`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + jwt,
                    },
                    method: "get",
                });
                const data = await response.json();
                setAllDynamicProgress(data);

                // Инициализируем allUsers и registrationDependency только после загрузки данных allDynamicProgress
                const usersData = {
                    labels: data.map((data) => data.progressDate),
                    datasets: [{
                        label: "Количество учеников",
                        data: data.map((data) => data.numberStudents),
                        backgroundColor: ["#FF7272"],
                    }]
                };
                setAllUsers(usersData);

                const dependencyData = {
                    labels: data.map((data) => data.numberStudents),
                    datasets: [{
                        label: "Количество учеников",
                        data: data.map((data) => data.totalAmountScholarship),
                        backgroundColor: ["#9AFA98"],
                    }]
                };
                setRegistrationDependency(dependencyData);

                setIsLoading(false); // Устанавливаем isLoading в false, когда данные загружены
            } catch (error) {
                console.error(error);
            }
        };

        fetchAllDynamicProgress();
    }, []);

/*Вторая страница с графиками*/
    const [allData, setAllData] = useLocalState([], 'allData');

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await fetch(`${backendUrl}/api/v1/student/getAllData`, {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": 'Bearer ' + jwt,
                    },
                    method: "get",
                });
                const data = await response.json();
                setAllData(data);
                setIsLoading(false); // Устанавливаем isLoading в false, когда данные загружены
            } catch (error) {
                console.error(error);
            }
        };

        fetchAllData();
    }, []);

// Пока данные загружаются, можно отобразить сообщение о загрузке или что-то подобное
    const universityData = {
        labels: allData[1]?.[1]?.map((data) => data.name),
        datasets: [{
            label: "Количество учеников",
            data: allData[1]?.[1]?.map((data) => data.value),
            backgroundColor: ["#FF7272"],
        }]
    };

    const instituteData = {
        labels: allData[1]?.[4]?.map((data) => data.name),
        datasets: [{
            label: "Количество учеников",
            data: allData[1]?.[4]?.map((data) => data.value),
            backgroundColor: ["#9AFA98"],
        }],
    };

    const directions = {
        labels: DataDirections.map((data) => data.direction),
        datasets: [{
            label: "Количество учеников",
            data: DataDirections.map((data) => data.studentsQuantity),
            backgroundColor: ["#FF7272", "#FFF170", "#9AFA98", "#8C8AF6"],
        }]
    };

    const paymentType = {
        labels: allData[1]?.[2]?.map((data) => data.name),
        datasets: [{
            label: "Количество учеников",
            data: allData[1]?.[2]?.map((data) => data.value),
            backgroundColor: ["#FF7272", "#FFF170", "#9AFA98"],
        }]
    };

    const studyingType = {
        labels: allData[1]?.[3]?.map((data) => data.name),
        datasets: [{
            label: "Количество учеников",
            data: allData[1]?.[3]?.map((data) => data.value),
            backgroundColor: ["#FF7272", "#FFF170", "#9AFA98", "#8C8AF6"],
        }]
    };
    if (isLoading) {
        return(
        <Box sx={{ width: '100%' }}>
            <LinearProgress color="inherit"/>
        </Box>); // или отображение индикатора загрузки
    }
    return (
        <div>
            <Header/>
            <div className="content-container">
                <div className="tab-header">
                    <div
                        className={`tab-item1 ${activeTab === 0 ? "active" : ""}`}
                        onClick={() => handleClickTab(0)}
                    >
                        Статистика регистрации на сервисе
                    </div>
                    <div
                        className={`tab-item2 ${activeTab === 1 ? "active" : ""}`}
                        onClick={() => handleClickTab(1)}
                    >
                        Статистика по университетам
                    </div>
                    <div
                        className={`tab-item3 ${activeTab === 2 ? "active" : ""}`}
                        onClick={() => handleClickTab(2)}
                    >
                        Преимущественные направления
                    </div>
                </div>
                <div className="tab-content">
                    {activeTab === 0 &&
                        <div className="university-stat-1">
                            <div className= "tab-content-item">
                                <AllUsers chartDataAllUsers={allUsers}/>
                            </div>
                            <div className= "tab-content-item">
                                <RegistrationDependency chartDataRegistrationDependency={registrationDependency}/>
                            </div>
                        </div>}
                    {activeTab === 1 &&
                        <div className="university-stat-2">
                        <div className= "tab-content-item">
                            <UniversityData chartDataUniversity={universityData}/>
                        </div>
                        <div className= "tab-content-item">
                            <UniversityInstituteData chartDataInstitute={instituteData}/>
                        </div>
                    </div>}
                    {activeTab === 2 &&
                        <div className="university-stat-3">
                            <div className= "tab-content-item" style={{width: 450}}>
                                <Directions chartDataDirections={directions}/>
                            </div>
                            <div className= "tab-content-item" style={{width: 450}}>
                                <PaymentType chartDataPayment={paymentType}/>
                            </div>
                            <div className= "tab-content-item" style={{width: 450}}>
                                <StudyingType chartDataStudyingType={studyingType}/>
                            </div>
                    </div>}
                </div>
            </div>

            <div className="table">
                <MainTable/>
            </div>
        </div>
    );
}

export default MainPage;