
import React, { useEffect, useRef, useState, useContext } from 'react';
import UserSiderbar from './UserSiderbar';
import ReactApexChart from 'react-apexcharts';
import MUIDataTable from 'mui-datatables';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CacheProvider } from '@emotion/react';
import Firebase from './Firebase';
import moment from 'moment';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import CountUp from 'react-countup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Eng, Guj } from './HandleLanuage';
import { MyContext } from './ContextProvider';
import createCache from '@emotion/cache';
const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
})
export default function DonerParty() {
    const { lang, setLang } = useContext(MyContext);
    const languageData = lang === 'Eng' ? Eng : Guj;
    const [key, setKey] = useState('home');
    const mainRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [alldata, setAlldata] = useState([])
    const [totalAmount, setTotalAmount] = useState(0);
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [showSecondModal, setShowSecondModal] = useState(false);

    const [description0, setDescription0] = useState('')
    const [description1, setDescription1] = useState('')
    const [description2, setDescription2] = useState('')
    const [description3, setDescription3] = useState('')
    const [description4, setDescription4] = useState('')
    const [description5, setDescription5] = useState('')
    const handleClose = () => {
        setShow(false);
        setSelectedData(null);
    };
    const handleShowSecondModal = () => {
        setShowSecondModal(true);
    };

    const handleCloseSecondModal = () => {
        setShowSecondModal(false);
    };

    useEffect(() => {
        getData();

    }, []);

    useEffect(() => {
        // Calculate the total amount whenever the 'alldata' array changes
        calculateTotalAmount(alldata);
    }, [alldata]);
    const formatTimeAgo = (created) => {
        const currentDate = moment();
        const createdDate = moment(created);
        const duration = moment.duration(currentDate.diff(createdDate));
        const hoursAgo = duration.asHours();

        if (hoursAgo >= 24) {
            return createdDate.format('YYYY-MM-DD HH:mm:ss');
        } else {
            return duration.humanize(true);
        }
    };
    const handleViewClick = (rowData) => {
        for (let i = 0; i < alldata.length; i++) {
            if (alldata[i].id == rowData) {
                setSelectedData(alldata[i])
            }
        }


        setShow(true);
    };
    const columns = [
        {
            name: "name",
            label: languageData.name,
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "referencename",
            label: languageData.referencename,
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "village",
            label: languageData.village,
            options: {
                filter: true,
                sort: false,
            }
        },

        {
            label: languageData.moblie,
            name: "moblie",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            label: languageData.amount,
            name: "amount",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            label: languageData.description,
            name: "description",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta) => {
                    return (
                        value === "0" ? languageData.construction :
                            value === "1" ? languageData.landdonation :
                                value === "2" ? languageData.anushthan :
                                    value === "3" ? languageData.saintscokking :
                                        value === "4" ? languageData.thakorjithal :
                                            value === "5" ? languageData.otherdonations :
                                                "--"
                    );
                }
            }
        },
        {
            label: languageData.owner,
            name: "owner",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            label: languageData.view,
            name: "id",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {

                    return (
                        <button className='btn btn-success' onClick={() => handleViewClick(value)}>
                            {languageData.view}
                        </button>
                    );
                },
            },
        }
    ];
    const calculateTotalAmount = (data) => {
        const total = data.reduce((total, item) => total + parseInt(item.amount || 0), 0);
        setTotalAmount(total);

        let a0 = 0;
        let a1 = 0;
        let a2 = 0;
        let a3 = 0;
        let a4 = 0;
        let a5 = 0;
        let find0 = alldata.filter((i) => i.description === "0")
        let find1 = alldata.filter((i) => i.description === "1")
        let find2 = alldata.filter((i) => i.description === "2")
        let find3 = alldata.filter((i) => i.description === "3")
        let find4 = alldata.filter((i) => i.description === "4")
        let find5 = alldata.filter((i) => i.description === "5")

        find0.forEach(i => {
            a0 += parseInt(i.amount)
        });

        find1.forEach(i => {
            a1 += parseInt(i.amount)
        });

        find2.forEach(i => {
            a2 += parseInt(i.amount)
        });

        find3.forEach(i => {
            a3 += parseInt(i.amount)
        });

        find4.forEach(i => {
            a4 += parseInt(i.amount)
        });

        find5.forEach(i => {
            a5 += parseInt(i.amount)
        });
        setDescription0(a0)
        setDescription1(a1)
        setDescription2(a2)
        setDescription3(a3)
        setDescription4(a4)
        setDescription5(a5)
    }
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

    let a = alldata.filter(i => i.description == '0')
    let b = alldata.filter(i => i.description == '1')
    let c = alldata.filter(i => i.description == '2')
    let d = alldata.filter(i => i.description == '3')
    let e = alldata.filter(i => i.description == '4')
    let f = alldata.filter(i => i.description == '5')
    const series = [parseInt(description0), parseInt(description1), parseInt(description2), parseInt(description3), parseInt(description4), parseInt(description5)];
    const options2 = {
        chart: {
            width: 380,
            type: "pie",

        },
        labels: [languageData.construction, languageData.landdonation, languageData.anushthan, languageData.saintscokking, languageData.thakorjithal, languageData.otherdonations],
        // colors: ['#73BBC9', '#080202', '#73BBC9', "#080202", "#73BBC9", "#080202"],
        responsive: [
            {
                breakpoint: 450,
                options: {
                    chart: {
                        width: 350,
                        type: "pie",
                    },
                    legend: {
                        position: 'bottom',
                    },
                },
            },
        ],
    };

    const options = {
        filterType: 'checkbox',
    };



    return (<>

        <UserSiderbar />
        <div>
            <UserSiderbar />
            <main className={`main containers ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}>
                <div className="row pt-5 d-flex align-items-center">
                    <div className="col-lg-7 mt-4 mb-4 d-flex  justify-content- center align-items-center">
                        <div id="chart" className=''>

                            <ReactApexChart

                                options={options2}
                                series={series}
                                type="pie"
                                width={480}
                            />
                        </div>
                    </div>
                    <div className="col-lg-5 mt-4 mb-4 d-flex justify-content- center align-items-center">
                        <div>

                            <h3>{languageData.construction}:- <CountUp end={description0} duration={4} /></h3>
                            <h3>{languageData.landdonation}:-  <CountUp end={description1} duration={5} /> </h3>
                            <h3>{languageData.anushthan}:-  <CountUp end={description2} duration={5} /> </h3>
                            <h3>{languageData.saintscokking}:-  <CountUp end={description3} duration={5} /> </h3>
                            <h3>{languageData.thakorjithal}:-  <CountUp end={description4} duration={5} /> </h3>
                            <h3>{languageData.otherdonations}:-  <CountUp end={description5} duration={5} /> </h3>
                            <h3>{languageData.total}:-<CountUp end={totalAmount} duration={5} /> </h3>
                        </div>

                    </div>
                </div>
                <div className=' row d-flex justify-content-end pt-5' >


                    <Tabs
                        defaultActiveKey="1"
                        id="fill-tab-example"
                        className="mb-3"
                        fill
                    >
                        <Tab eventKey="1" title={languageData.construction}>
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Income"}
                                        data={a}
                                        columns={columns}
                                        options={options}
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </Tab>
                        <Tab eventKey="2" title={languageData.landdonation}>
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Income"}
                                        data={b}
                                        columns={columns}
                                        options={options}
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </Tab>
                        <Tab eventKey="3" title={languageData.anushthan} >
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Income"}
                                        data={c}
                                        columns={columns}
                                        options={options}
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </Tab>
                        <Tab eventKey="4" title={languageData.saintscokking} >
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Income"}
                                        data={d}
                                        columns={columns}
                                        options={options}
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </Tab><Tab eventKey="5" title={languageData.thakorjithal} >
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Income"}
                                        data={e}
                                        columns={columns}
                                        options={options}
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </Tab>
                        <Tab eventKey="6" title={languageData.otherdonations} >
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Income"}
                                        data={f}
                                        columns={columns}
                                        options={options}
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </Tab>
                    </Tabs>


                </div>


                <Modal show={show} onHide={handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>View Data</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {selectedData && (
                            <div>
                                <div className="row">
                                    <div className="col-lg-6"> <h5>{languageData.name}: {selectedData.name}</h5>  </div>
                                    <div className="col-lg-6"> <h5> {languageData.referencename}: {selectedData.referencename}</h5></div>
                                    <div className="col-lg-6"> <h5>{languageData.description}:


                                        {
                                            selectedData.description === "0" ? languageData.construction :
                                                selectedData.description === "1" ? languageData.landdonation :
                                                    selectedData.description === "2" ? languageData.anushthan :
                                                        selectedData.description === "3" ? languageData.saintscokking :
                                                            selectedData.description === "4" ? languageData.thakorjithal :
                                                                selectedData.description === "5" ? languageData.otherdonations :
                                                                    "--"
                                        }

                                    </h5></div>
                                    <div className="col-lg-6">  <h5>{languageData.amounts}: {selectedData.modeofpatment == "0" ? languageData.modeofpatment1 : languageData.modeofpatment2}</h5>
                                    </div>
                                    <div className="col-lg-6">  <h5>{languageData.village}: {selectedData.village}</h5></div>
                                    <div className="col-lg-6"> <h5> {languageData.owner}: {selectedData.owner}</h5></div>
                                    <div className="col-lg-6"><h5>{languageData.dontationdate}:- {moment(selectedData.creatted || '').fromNow()}</h5></div>
                                    <div className="col-lg-6">  <h5>{languageData.donation_amount}: {selectedData.amount}</h5></div>
                                    <div>

                                        <button
                                            disabled={selectedData.modeofpayment !== "હપ્તે દાન"}

                                            className="btn btn-success"
                                            onClick={handleShowSecondModal}
                                        >
                                            <FontAwesomeIcon icon={faPlus} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal
                    show={showSecondModal}
                    onHide={handleCloseSecondModal}
                    backdrop="static"
                    keyboard={false}
                >
                    <Modal.Header>
                        <Modal.Title>My Modal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Formik
                            initialValues={{
                                number: '', // Initialize your form field values here
                                paymentMethod: '',
                            }}
                            onSubmit={(values) => {
                                // Handle form submission here
                                console.log(values);
                                setShowSecondModal(false);
                            }}
                        >
                            <Form>
                                <div>
                                    <label htmlFor="number">Number:</label>
                                    <Field type="number" id="number" name="number" />
                                    <ErrorMessage name="number" component="div" />
                                </div>

                                <div>
                                    <label htmlFor="paymentMethod">Payment Method:</label>
                                    <Field as="select" id="paymentMethod" name="paymentMethod">
                                        <option value="">કેશ</option>
                                        <option value="online">ઓનલાઇન/બૈંક</option>
                                    </Field>
                                    <ErrorMessage name="paymentMethod" component="div" />
                                </div>

                                <button type="submit">Submit</button>
                            </Form>
                        </Formik>
                    </Modal.Body>

                </Modal>
            </main >
        </div >
    </>
    )
}
