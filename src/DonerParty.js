import React, { useEffect, useRef, useState } from 'react'
import UserSiderbar from './UserSiderbar'

import MUIDataTable from "mui-datatables";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import createCache from '@emotion/cache';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import { CacheProvider } from '@emotion/react';
import Firebase from './Firebase';
import moment from 'moment';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import Nav from 'react-bootstrap/Nav';
const muiCache = createCache({
    key: 'mui-datatables',
    prepend: true
})
export default function DonerParty() {

    const [key, setKey] = useState('home');
    const mainRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [alldata, setAlldata] = useState([])
    const [totalAmount, setTotalAmount] = useState(0);
    const [show, setShow] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [showSecondModal, setShowSecondModal] = useState(false);
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
    const handleViewClick = (rowData, rowMeta) => {
        // rowData will contain the data of the clicked row
        console.log(rowData);
        setSelectedData(rowData);
        setShow(true);
    };
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
        {
            label: "View",
            name: "alldata",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value, tableMeta) => {

                    return (
                        <button className='btn btn-success' onClick={() => handleViewClick(alldata[tableMeta.rowIndex])}>
                            View
                        </button>
                    );
                },
            },
        }
    ];
    const calculateTotalAmount = (data) => {
        const total = data.reduce((total, item) => total + parseInt(item.amount || 0), 0);
        setTotalAmount(total);
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

    let a = alldata.filter(i => i.description == 'બાંધકામ')
    let b = alldata.filter(i => i.description == 'ભૂમિદાન')
    let c = alldata.filter(i => i.description == 'બીજમંત્ર-અનુષ્ઠાન')
    let d = alldata.filter(i => i.description == 'બાંધકામ')

    const options = {
        filterType: 'checkbox',
    };
    return (<>

        <UserSiderbar />
        <div>
            <UserSiderbar />
            <main className={`main containers ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}>

                <div className=' row d-flex justify-content-end pt-5' >
                    <h3>Total Amount: {totalAmount}</h3> {/* Display the total amount */}

                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                        className="mb-3"
                    >
                        <Tab eventKey="home" title="બાંધકામ">
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Doner List"}
                                        data={a}
                                        columns={columns}
                                        options={options}
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </Tab>
                        <Tab eventKey="profile" title="ભૂમિદાન">
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Doner List"}
                                        data={b}
                                        columns={columns}
                                        options={options}
                                    />
                                </ThemeProvider>
                            </CacheProvider>
                        </Tab>
                        <Tab eventKey="contact" title=" બીજમંત્ર-અનુષ્ઠાન" >
                            <CacheProvider value={muiCache}>
                                <ThemeProvider theme={createTheme()}>
                                    <MUIDataTable
                                        title={"Doner List"}
                                        data={c}
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
                                    <div className="col-lg-6"> <h5>નામ: {selectedData.name}</h5>  </div>
                                    <div className="col-lg-6"> <h5> હસ્તક નામ: {selectedData.referencename}</h5></div>
                                    <div className="col-lg-6"> <h5>વિગત: {selectedData.description}</h5></div>
                                    <div className="col-lg-6">  <h5>ચુકવણી પદ્ધતિ: {selectedData.modeofpatment}</h5>
                                    </div>
                                    <div className="col-lg-6">  <h5>ગામ: {selectedData.village}</h5></div>
                                    <div className="col-lg-6"> <h5> મહેતાજી નંબર: {selectedData.owner}</h5></div>
                                    <div className="col-lg-6"><h5>દાન તારીખ:- {moment(selectedData.creatted || '').fromNow()}</h5></div>
                                    <div className="col-lg-6">  <h5>દાન-રકમ: {selectedData.amount}</h5></div>
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
