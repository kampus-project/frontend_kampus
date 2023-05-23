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

        const [allStudent,setAllStudent] = useLocalState([],'student')

        useEffect(() => {
            fetch(`${backendUrl}/api/v1/dynamicProgress/getAllDynamicProgress`, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization" : 'Bearer ' + jwt,
                },
                method: "get",
            })
                .then((response) => response.json())
                .then((data) => setAllStudent(data))
                .catch(error => console.error(error));
        }, [])


    const [activeTab, setActiveTab] = useState(0);
    const handleClickTab = (index) => {
        setActiveTab(index);
    };

    /*Первая страница с графиками*/

    const [allUsers, setAllUsers] = useState({
        labels: allStudent.map((data)=>data.progressDate),
        datasets: [{
            label: "Количество учеников",
            data: allStudent.map((data)=>data.numberStudents),
            backgroundColor:["#FF7272"],
        }]
    })

    const [registrationDependency, setRegistrationDependency] = useState({
        labels: allStudent.map((data)=>data.numberStudents),
        datasets: [{
            label: "Количество учеников",
            data: allStudent.map((data)=>data.totalAmountScholarship),
            backgroundColor:["#9AFA98"],
        }]
    })

/*Вторая страница с графиками*/
    const [universityStudents,setUniversityStudents] = useLocalState('','universityStudents')

    useEffect(() => {
        fetch(`${backendUrl}/api/v1/student/getInfoUniversities`, {
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


    const [universityData, setUniversityData] = useState({
        labels: DataUniversity.map((data)=>data.key),
        datasets: [{
            label: "Количество учеников",
            data: DataUniversity.map((data)=>data.value),
            backgroundColor:["#FF7272"],
        }]
    })

    const [instituteData, setInstituteData] = useState({
        labels: DataUniversityInstitute.map((data)=>data.instituteName),
        datasets: [{
            label: "Количество учеников",
            data: DataUniversityInstitute.map((data)=>data.studentsQuantity),
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
        labels: DataPaymentType.map((data)=>data.type),
        datasets: [{
            label: "Количество учеников",
            data: DataPaymentType.map((data)=>data.studentsQuantity),
            backgroundColor:["#FF7272","#FFF170","#9AFA98"],
        }]
    })

    const [studyingType, setStudyingType] = useState({
        labels: DataStudyingType.map((data)=>data.type),
        datasets: [{
            label: "Количество учеников",
            data: DataStudyingType.map((data)=>data.studentsQuantity),
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