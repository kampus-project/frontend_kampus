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

import { DataUniversityInstitute } from "../Components/Statistic/UniversityInstituteData/Data.js";
import { DataDirections } from "../Components/Statistic/Directions/Data.js";
import { DataPaymentType} from "../Components/Statistic/PaymentType/Data.js";
import { DataStudyingType } from "../Components/Statistic/StudyingType/Data.js";
import {useLocalState} from "../useLocalStorage/index.js";
import {DataUniversity} from "../Components/Statistic/UniversityData/Data.js";


function MainPage() {

        const backendUrl = import.meta.env.VITE_BACKEND_URL;
        const [jwt, setJwt] = useLocalState('', 'jwt')

        const [allDynamicProgress,setAllDynamicProgress] = useLocalState([],'allDynamicProgress')

        useEffect(() => {
            fetch(`${backendUrl}/api/v1/dynamicProgress/getAllDynamicProgress`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : 'Bearer ' + jwt,
                },
                method: "get",
            })
                .then((response) => response.json())
                .then((data) => setAllDynamicProgress(data))
                .catch(error => console.error(error));
        }, [])


    const [activeTab, setActiveTab] = useState(0);
    const handleClickTab = (index) => {
        setActiveTab(index);
    };
    console.log(allDynamicProgress)
    /*Первая страница с графиками*/

    const [allUsers, setAllUsers] = useState({
        labels: allDynamicProgress.map((data)=>data.progressDate),
        datasets: [{
            label: "Количество учеников",
            data: allDynamicProgress.map((data)=>data.numberStudents),
            backgroundColor:["#FF7272"],
        }]
    })

    const [registrationDependency, setRegistrationDependency] = useState({
        labels: allDynamicProgress.map((data)=>data.numberStudents),
        datasets: [{
            label: "Количество учеников",
            data: allDynamicProgress.map((data)=>data.totalAmountScholarship),
            backgroundColor:["#9AFA98"],
        }]
    })

/*Вторая страница с графиками*/
    const [allData,setAllData] = useLocalState([],'allData')

<<<<<<< HEAD
    useEffect(() => {
        fetch(`${backendUrl}/api/v1/student/getAllData`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + jwt,
            },
            method: "get",
        })
            .then((response) => response.json())
            .then((data) => setAllData(data))
            .catch(error => console.error(error));
    }, [])
    console.log(allData[1][1])
=======
    // useEffect(() => {
    //     fetch(`${backendUrl}/api/v1/student/getInfoUniversities`, {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Authorization" : 'Bearer ' + jwt,
    //         },
    //         method: "get",
    //     })
    //         .then((response) => response.json())
    //         .then((data) => setUniversityStudents(data))
    //         .catch(error => console.error(error));
    // }, [])
>>>>>>> f01a055df604bd01667cfe382dc7f3a5fd3cd479


    const [universityData, setUniversityData] = useState({
        labels: allData[1][1].map((data)=>data.name),
        datasets: [{
            label: "Количество учеников",
            data: allData[1][1].map((data)=>data.value),
            backgroundColor:["#FF7272"],
        }]
    })

    useEffect(() => {
        fetch(`${backendUrl}/api/v1/student/getInfoCourseTitle`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + jwt,
            },
            method: "get",
        })
            .then((response) => response.json())
            .then((data) => setUniversityStudents(data))
            .catch(error => console.error(error));
    }, [])

    const [instituteData, setInstituteData] = useState({
<<<<<<< HEAD
        labels: allData[1][4].map((data)=>data.name),
        datasets: [{
            label: "Количество учеников",
            data: allData[1][4].map((data)=>data.value),
=======
        labels: DataUniversity.map((data)=>data.universityName),
        datasets: [{
            label: "Количество учеников",
            data: DataUniversity.map((data)=>data.studentsQuantity),
>>>>>>> f01a055df604bd01667cfe382dc7f3a5fd3cd479
            backgroundColor:["#9AFA98"],
        }],
    })


    /*Третья страница с графиками*/

    const [directions, setDirections] = useState({
        labels: DataDirections.map((data)=>data.direction),
        datasets: [{
            label: "Количество учеников",
            data: DataDirections.map((data)=>data.studentsQuantity),
            backgroundColor:["#FF7272","#FFF170","#9AFA98","#8C8AF6"],
        }]
    })

    const [paymentType, setPaymentType] = useState({
        labels: allData[1][2].map((data)=>data.name),
        datasets: [{
            label: "Количество учеников",
            data: allData[1][2].map((data)=>data.value),
            backgroundColor:["#FF7272","#FFF170","#9AFA98"],
        }]
    })

    const [studyingType, setStudyingType] = useState({
        labels: allData[1][3].map((data)=>data.name),
        datasets: [{
            label: "Количество учеников",
            data: allData[1][3].map((data)=>data.value),
            backgroundColor:["#FF7272","#FFF170","#9AFA98","#8C8AF6"],
        }]
    })

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