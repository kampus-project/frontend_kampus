import React, {useState} from 'react';
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

import { DataUniversity } from "../Components/Statistic/UniversityData/Data"
import { DataUniversityInstitute } from "../Components/Statistic/UniversityInstituteData/Data.js";
import { DataAllUsers } from "../Components/Statistic/AllUsersWeek/Data.js";
import { DataRegistrationDependency } from "../Components/Statistic/RegistrationDependency/Data.js";
import { DataDirections } from "../Components/Statistic/Directions/Data.js";
import { DataPaymentType} from "../Components/Statistic/PaymentType/Data.js";
import { DataStudyingType } from "../Components/Statistic/StudyingType/Data.js";

function MainPage() {

    const [activeTab, setActiveTab] = useState(0);

    const handleClick = (index) => {
        setActiveTab(index);
    };

    const [universityData, setUniversityData] = useState({
        labels: DataUniversity.map((data)=>data.universityName),
        datasets: [{
            label: "Количество учеников",
            data: DataUniversity.map((data)=>data.studentsQuantity),
            backgroundColor:["#FF7272"]
        }]
    })

    const [instituteData, setInstituteData] = useState({
        labels: DataUniversityInstitute.map((data)=>data.instituteName),
        datasets: [{
            label: "Количество учеников",
            data: DataUniversityInstitute.map((data)=>data.studentsQuantity),
            backgroundColor:["#9AFA98"]
        }],
    })

    const [allUsers, setAllUsers] = useState({
        labels: DataAllUsers.map((data)=>data.week),
        datasets: [{
            label: "Количество учеников",
            data: DataAllUsers.map((data)=>data.studentsQuantity),
            backgroundColor:["#FF7272"]
        }]
    })

    const [registrationDependency, setRegistrationDependency] = useState({
        labels: DataRegistrationDependency.map((data)=>data.status),
        datasets: [{
            label: "Количество учеников",
            data: DataRegistrationDependency.map((data)=>data.users),
            backgroundColor:["#FF7272","#F5F5F5"]
        }]
    })

    const [directions, setDirections] = useState({
        labels: DataDirections.map((data)=>data.direction),
        datasets: [{
            label: "Количество учеников",
            data: DataDirections.map((data)=>data.studentsQuantity),
            backgroundColor:["#FF7272","#FFF170","#9AFA98","#8C8AF6"]
        }]
    })

    const [paymentType, setPaymentType] = useState({
        labels: DataPaymentType.map((data)=>data.type),
        datasets: [{
            label: "Количество учеников",
            data: DataPaymentType.map((data)=>data.studentsQuantity),
            backgroundColor:["#FF7272","#FFF170","#9AFA98"]
        }]
    })

    const [studyingType, setStudyingType] = useState({
        labels: DataStudyingType.map((data)=>data.type),
        datasets: [{
            label: "Количество учеников",
            data: DataStudyingType.map((data)=>data.studentsQuantity),
            backgroundColor:["#FF7272","#FFF170","#9AFA98","#8C8AF6"]
        }]
    })

    return (
        <div>
            <Header/>
            <div className="content-container">
                <div className="tab-header">
                    <div
                        className={`tab-item1 ${activeTab === 0 ? "active" : ""}`}
                        onClick={() => handleClick(0)}
                    >
                        Статистика регистрации на сервисе
                    </div>
                    <div
                        className={`tab-item2 ${activeTab === 1 ? "active" : ""}`}
                        onClick={() => handleClick(1)}
                    >
                        Статистика по университетам
                    </div>
                    <div
                        className={`tab-item3 ${activeTab === 2 ? "active" : ""}`}
                        onClick={() => handleClick(2)}
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
                            <div className= "tab-content-item" style={{width: 450}}>
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