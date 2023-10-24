import React, { useEffect, useRef, useState } from 'react'
import UserSiderbar from './UserSiderbar'
import MUIDataTable from "mui-datatables";
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import Firebase from './Firebase';


const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
})

export default function Billfiles() {
    const mainRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [alldata, setAlldata] = useState([])
    useEffect(() => {
        getData()
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
            label: "BIllDT",
            name: "BIllDT"
        }

    ];

    const getData = () => {
        let db = Firebase.firestore()
        let data = []
        db.collection("Doner")
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
                <div className='pt-5'>
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
            </main>
        </div>
    )
}
