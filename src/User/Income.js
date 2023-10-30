import React, { useEffect, useRef, useState } from 'react'
import UserSiderbar from './UserSiderbar'
import MUIDataTable from "mui-datatables";
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import Firebase from './Firebase';
import moment from 'moment';

const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
})

export default function Income() {
    const mainRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [alldata, setAlldata] = useState([])
    const [totalAmount, setTotalAmount] = useState(0);
    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        // Calculate the total amount when the data changes
        const total = alldata.reduce((total, item) => total + parseInt(item.price || 0), 0);
        setTotalAmount(total);
    }, [alldata]);
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
            name: "taluk",
            label: "તાલુકો",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "district",
            label: "જીલ્લો",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            label: "મોબાઈલ નંબર",
            name: "moblie"
        },
        {
            label: "રકમ",
            name: "price"
        },
        {
            label: "BIllDT",
            name: "BIllDT",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    const currentDate = moment();
                    const billDate = moment(value);
                    const duration = moment.duration(currentDate.diff(billDate));
                    const hoursAgo = duration.asHours();

                    if (hoursAgo < 24) {
                        // If it's within the last 24 hours, show time ago
                        const formattedDuration = moment.duration(-hoursAgo, 'hours').humanize(true);
                        return <p>{formattedDuration} </p>;
                    } else {
                        // If it's older than 24 hours, show the full date
                        const formattedDate = billDate.format('YYYY-MM-DD HH:mm:ss');
                        return <p>{formattedDate}</p>;
                    }
                }

            }
        }

    ];

    const getData = () => {
        let db = Firebase.firestore()
        let data = []
        db.collection("Doner")
            .orderBy("BIllDT", 'desc')
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());


                    data.push(doc.data())
                    setAlldata(data)
                    console.log(alldata)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }



    const options = {
        filterType: 'checkbox',
    };
    return (
        <div>
            <UserSiderbar />
            <main className={`main containers ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}>

                <div className=' row d-flex justify-content-end pt-5' >
                    <h3>Total Amount: {totalAmount}</h3> {/* Display the total amount */}
                </div>

                <CacheProvider value={muiCache}>
                    <ThemeProvider theme={createTheme()}>
                        <MUIDataTable
                            title={"Employee List"}
                            data={alldata}
                            columns={columns}
                            options={options}
                        />
                    </ThemeProvider>
                </CacheProvider>
            </main >
        </div >
    )
}
