import * as React from 'react';
import {useLocalState} from "../../useLocalStorage/index.js";
import {useEffect, useState} from "react";
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom'

const columns = [
    { field: 'id', headerName: 'ID', width: 70, },
    {
        field: 'fullName',
        headerName: 'Ф.И.О',
        description: 'Ф.И.О не сортируется',
        sortable: false,
        width: 300,
        valueGetter: (params) =>
            `${params.row.firstName || ''} ${params.row.middleName || ''} ${params.row.lastName || ''}`,
    },
    { field: 'universityName', headerName: 'Университет', width: 130,
        valueGetter: (params) =>
            `${params.row.universityName || ''} (${params.row.universityName || ''}) `
    },
    { field: 'courseNumber', headerName: 'Курс', width: 130 },
    { field: 'studyForm', headerName: 'Вид обучения', width: 130 },
    { field: 'averageGrade', headerName: 'Ср.балл', width: 130 },
    { field: 'educationForm', headerName: 'Форма обучения', width: 130 },
    {
        sortable: false,
        width: 140,
        renderCell: (params) => (
            <Link className="link-table" to={`/student/${params.row.id}`} > Дополнительно </Link>
        )},
];


export default function DataTable() {


    const [jwt, setJwt] = useLocalState('', 'jwt')
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [studentsData, setStudentsData] = useState([]);

    useEffect(() => {
        // Тут находится код, который должен выполниться только один раз при загрузке страницы
        const fetchAllStudents = async () =>{
        await fetch(`${backendUrl}/api/v1/student/getAllStudents`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization" : 'Bearer ' + jwt,
            },
            method: "get",
        })
            .then((response) => {
                if (response.status === 200) {
                    console.log("OK");
                    return Promise.all([response.json(), response.headers]);
                } else {
                    return Promise.reject("Exception");
                }
            })
            .then((result) => {
                setStudentsData(result[0])
            })
            .catch(error => console.error(error));
    }
    fetchAllStudents()
    }, []);
    console.log(studentsData)


    return (
        <>
            <h2>Пользователи</h2>

            <div style={{ height: 400, width: '100%',cursor: 'default' }}>
                <DataGrid
                    rows={studentsData}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 5 },
                        },
                    }}
                    pageSizeOptions={[5, 10]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        </>
    );
}
