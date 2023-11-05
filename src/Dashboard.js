import React, { useEffect, useRef, useState } from 'react'
import UserSiderbar from './UserSiderbar'
import ReactApexChart from "react-apexcharts";
import MUIDataTable from "mui-datatables";
import CountUp from 'react-countup';
import 'react-toastify/dist/ReactToastify.css';
import Firebase from './Firebase';

import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
})


export default function Dashboard() {
    const [alldata, setAlldata] = useState([])
    const [alldata2, setAlldata2] = useState([])
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
        getData2()
        getIcome()
        getExpenses()
    }, [])
    const columns = [
        {
            name: "name",
            label: "નામ",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "referencename",
            label: "હસ્ત નામ",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "village",
            label: "ગામ",
            options: {
                filter: true,
                sort: false,
            }
        },

        {
            label: "મોબાઈલ નંબર",
            name: "moblie",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            label: "રકમ",
            name: "amount",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            label: "વિગત",
            name: "description",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            label: "મહેતાજી નંબર",
            name: "owner",
            options: {
                filter: true,
                sort: false,
            }
        },

    ];

    const columns2 = [
        {
            name: "name",
            label: "નામ",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "referencename",
            label: "હસ્ત નામ",
            options: {
                filter: true,
                sort: false,
            }
        },


        {
            label: "મોબાઈલ નંબર",
            name: "moblie",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            label: "રકમ",
            name: "amount",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            label: "વિગત",
            name: "description",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            label: "મહેતાજી નંબર",
            name: "owner",
            options: {
                filter: true,
                sort: false,
            }
        },

    ];

    // get Data 
    const getData = () => {
        let db = Firebase.firestore()
        let datas = []
        let incomeTotal = 0;
        db.collection("Doner")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    const data = doc.data();
                    datas.push(doc.data())

                    if (data.type === "income") {
                        incomeTotal += Number(data.amount);
                    }
                    setAlldata(data)

                });
                setIncome(incomeTotal);

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });



    }
    let getIcome = () => {
        let db = Firebase.firestore()
        let data = []
        db.collection("Doner")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data.push(doc.data())
                    setAlldata(data)


                });

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }
    let getExpenses = () => {
        let db = Firebase.firestore()
        let data = []
        db.collection("Expenses")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    data.push(doc.data())
                    setAlldata2(data)


                });

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }
    const getData2 = () => {
        let db = Firebase.firestore()
        let expensesTotal = 0;

        db.collection("Expenses")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    const data = doc.data();

                    if (data.type === "expense") {
                        expensesTotal += Number(data.amount);
                    }

                });
                setExpenses(expensesTotal);

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
                breakpoint: 400,
                options: {
                    chart: {
                        width: 345,
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
                <div className="container">
                    <div className="row pt-5 d-flex align-items-center">
                        <div className="col-lg-6 d-flex  justify-content- center align-items-center">
                            <div id="chart" className=''>

                                <ReactApexChart
                                    options={options}
                                    series={series}
                                    type="pie"
                                    width={380}
                                />
                            </div>
                        </div>
                        <div className="col-lg-6 d-flex justify-content- center align-items-center">
                            <div>

                                <h1>Total_Income:-  <CountUp end={income} duration={4} /></h1>
                                <h1>Total_Expenses:-  <CountUp end={expenses} duration={5} /> </h1>
                                <h1>Total_Amount:- <CountUp end={income - expenses} duration={6} /></h1>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="container pt-5">
                    <div className="row">
                        <div className="col-lg-6">
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={" Income"}
                                        data={alldata}
                                        columns={columns}
                                        options={{
                                            responsive: "standard",  // Make sure to set a valid value here
                                            // Other options...
                                        }}
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </div>
                        <div className="col-lg-6">
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Expenses"}
                                        data={alldata2}
                                        columns={columns2}
                                        options={{
                                            responsive: "standard",  // Make sure to set a valid value here
                                            // Other options...
                                        }}
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </div>
                    </div>

                </div>

            </main >
        </div >
    )
}
