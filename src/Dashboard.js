import React, { useEffect, useRef, useState } from 'react'
import UserSiderbar from './UserSiderbar'
import ReactApexChart from "react-apexcharts";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



import Firebase from './Firebase';



export default function Dashboard() {
    const [alldata, setAlldata] = useState([])
    const mainRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [income, setIncome] = useState(0);
    const [expenses, setExpenses] = useState(0);
    const [loginId, setLoginId] = useState('')

    let data = []
    useEffect(() => {
        let url = window.location.href
        let Id = url.substring(url.lastIndexOf('/') + 1)
        setLoginId(Id)
        getData()

    }, [])




    // get Data 
    const getData = () => {
        let db = Firebase.firestore()
        let data = []
        let incomeTotal = 0;
        let expensesTotal = 0;
        db.collection("Doner")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    const data = doc.data();
                    console.log(data.amount)
                    if (data.type === "income") {
                        incomeTotal += Number(data.amount);
                    } else if (data.type === "expense") {
                        expensesTotal += Number(data.amount);
                    }
                    // setIncome(incomeTotal);
                    // setExpenses(expensesTotal);
                });
                setIncome(incomeTotal);
                console.log(income)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }

    const series = [income, expenses];
    const options = {
        chart: {
            width: 380,
            type: "pie",
        },
        labels: ['Income', 'Expenses'],
        responsive: [
            {
                breakpoint: 480,
                options: {
                    chart: {
                        width: 200,
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };
    return (
        <div>
            <UserSiderbar />
            <main className={`main containers ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}>
                <div id="chart" className='pt-5'>

                    <ReactApexChart
                        options={options}
                        series={series}
                        type="pie"
                        width={380}
                    />

                </div>

            </main >
        </div >
    )
}
