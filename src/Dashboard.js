import React, { useEffect, useRef, useState } from 'react'
import UserSiderbar from './UserSiderbar'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useFormik } from 'formik';
import { format } from 'date-fns';
import Firebase from './Firebase';
import * as Yup from 'yup';


export default function Dashboard() {
    const [alldata, setAlldata] = useState([])
    const mainRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const [loginId, setLoginId] = useState('')

    let data = []
    useEffect(() => {
        let url = window.location.href
        let Id = url.substring(url.lastIndexOf('/') + 1)
        setLoginId(Id)
        getData()
        makeid()
    }, [])




    // get Data 
    const getData = () => {
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
    const validationSchema = Yup.object().shape({
        name: Yup.string().required('નામ જરૂરી છે'),
        referencename: Yup.string(),
        village: Yup.string().required('ગામ જરૂરી છે'),
        taluk: Yup.string(),
        district: Yup.string(),
        description: Yup.string().required('Please select an option'),
        moblie: Yup.string()

            .matches(/^[0-9]{10}$/, 'નંબર અધૂરો છે')
            .required('ફોન નંબર બાકી છે'),
    });
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd-MM-yyyy (hh:mm:ss a)');
    let makeid = () => {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < 7) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }

    // Call the function to generate a random string
    const randomString = makeid();

    const formik = useFormik({
        initialValues: {
            name: '',
            referencename: '',
            village: '',
            taluk: '',
            district: '',
            moblie: '',
            id: "",
            amount: '',
            modeofpatment: '',
            description: '',

        },
        validationSchema,
        onSubmit: (values) => {

            values.id = randomString

            values.owner = loginId || localStorage.getItem("lid")
            values.creatted = Date.now()

            const isAlreadyRegistered = alldata.some((entry) => entry.moblie === values.moblie);
            if (isAlreadyRegistered) {
                toast.error('Already Registered !', {
                    position: toast.POSITION.TOP_RIGHT
                });
            } else {

                toast.success('Success Registered  !', {
                    position: toast.POSITION.TOP_RIGHT
                });
                let db = Firebase.firestore()
                db.collection("Doner").add(values)
                    .then(() => {
                        console.log("Document successfully written!");
                        formik.resetForm()
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                    });
            }


        },
    });

    const handleMobileChange = (e) => {
        if (alldata.length > 0) {
            let autoset = alldata.findIndex((item) => item.moblie === e.target.value);
            if (autoset !== -1) {
                formik.setFieldValue('name', alldata[autoset].name);
                formik.setFieldValue('referencename', alldata[autoset].referencename);
                formik.setFieldValue('village', alldata[autoset].village);
                formik.setFieldValue('taluk', alldata[autoset].taluk);
                formik.setFieldValue('district', alldata[autoset].district);
                formik.setFieldValue('moblie', alldata[autoset].moblie);
                formik.setFieldValue('modeofpatment', alldata[autoset].modeofpatment);
                formik.setFieldValue('description', alldata[autoset].description);
                formik.setFieldValue('amount', alldata[autoset].amount);
            } else {
                console.log('Mobile number not found in data');
            }
        } else {
            console.log('Data is still loading...');
        }
    }

    return (
        <div>
            <UserSiderbar />
            <main className={`main containers ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}>
                <div className="main-container">

                    <div className="container   pt-2">
                        <div className="row pt-5 ">
                            <form onSubmit={formik.handleSubmit}>
                                <div className="row col-lg-12">
                                    <div className="col-lg-6">
                                        <label htmlFor="name">નામ:-</label>
                                        <input type="text"
                                            id='name'
                                            name='name'
                                            className='form-control'
                                            value={formik.values.name}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} /><br />
                                        {formik.touched.name && formik.errors.name && (
                                            <div className="text-danger">{formik.errors.name}</div>
                                        )}
                                    </div>
                                    <div className="col-lg-6">
                                        <label htmlFor="referencename">હસ્તક નામ:-</label>
                                        <input type="text"
                                            id='referencename'
                                            name='referencename'
                                            className='form-control'
                                            value={formik.values.referencename}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} /><br />
                                        {formik.touched.referencename && formik.errors.referencename && (
                                            <div className="text-danger">{formik.errors.referencename}</div>
                                        )}
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="village">ગામ:-</label>
                                        <input type="text"
                                            id='village'
                                            name='village'
                                            className='form-control'
                                            value={formik.values.village}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} /><br />
                                        {formik.touched.village && formik.errors.village && (
                                            <div className="text-danger">{formik.errors.village}</div>
                                        )}
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="taluk">તાલુકો:-</label>
                                        <input type="text"
                                            id='taluk'
                                            name='taluk'
                                            className='form-control'
                                            value={formik.values.taluk}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} /><br />
                                        {formik.touched.taluk && formik.errors.taluk && (
                                            <div className="text-danger">{formik.errors.taluk}</div>
                                        )}
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="district">જીલ્લો:-</label>
                                        <input type="text"
                                            id='district'
                                            name='district'
                                            className='form-control'
                                            value={formik.values.district}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur} /><br />
                                        {formik.touched.district && formik.errors.district && (
                                            <div className="text-danger">{formik.errors.district}</div>
                                        )}
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="moblie">મોબાઈલ નંબર* :-</label>
                                        <input type="text" id='moblie' name='moblie' className='form-control'
                                            value={formik.values.moblie}
                                            onChange={(e) => {
                                                formik.handleChange(e); // This handles changing the moblie field in formik
                                                handleMobileChange(e); // This triggers your custom logic
                                            }}
                                            onBlur={formik.handleBlur}
                                        /><br />
                                        {formik.touched.moblie && formik.errors.moblie && (
                                            <div className="text-danger">{formik.errors.moblie}</div>
                                        )}
                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="amount">દાન-રકમ* :-</label>
                                        <input type="text" id='amount' name='amount' className='form-control'
                                            value={formik.values.amount}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        /><br />
                                        {formik.touched.amount && formik.errors.amount && (
                                            <div className="text-danger">{formik.errors.amount}</div>
                                        )}
                                    </div>

                                    <div className="col-lg-4">
                                        <label htmlFor="amounts">ચુકવણી પદ્ધતિ* :-</label>
                                        <div className='row d-flex align-items-center'>
                                            <div className="form-check">
                                                <label htmlFor="fullDonation">
                                                    <input
                                                        type="radio"
                                                        id="fullDonation"
                                                        name="modeofpatment" // Use a unique name for this group
                                                        value="સંપૂર્ણ  દાન"
                                                        checked={formik.values.modeofpatment === "સંપૂર્ણ  દાન"} // Match the value attribute
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    /> સંપૂર્ણ  દાન
                                                </label>
                                                <label htmlFor="monthlyDonation">
                                                    <input
                                                        type="radio"
                                                        id="monthlyDonation"
                                                        name="modeofpatment" // Use a unique name for this group
                                                        value="હપ્તે દાન"
                                                        checked={formik.values.modeofpatment === "હપ્તે દાન"} // Match the value attribute
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                    />   હપ્તે દાન
                                                </label>
                                            </div>

                                            {formik.touched.modeofpatment && formik.errors.modeofpatment && (
                                                <div className="text-danger">{formik.errors.modeofpatment}</div>
                                            )}
                                        </div>

                                    </div>
                                    <div className="col-lg-4">
                                        <label htmlFor="description">વિગત:-</label>
                                        <select
                                            name="description"
                                            id="description"
                                            className='form-select'
                                            value={formik.values.description}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        >
                                            <option value="">વિગત-દાન</option>
                                            <option value="બાંધકામ">બાંધકામ</option>
                                            <option value="ભૂમિદાન">ભૂમિદાન</option>
                                            <option value="બીજમંત્ર-અનુષ્ઠાન">બીજમંત્ર-અનુષ્ઠાન</option>
                                            <option value="સંતો રસોઈ">સંતો રસોઈ</option>
                                            <option value="ઠાકોરજી થાળ">ઠાકોરજી થાળ</option>
                                            <option value="અન્ય દાન">અન્ય દાન</option>
                                        </select>

                                        {formik.touched.description && formik.errors.description ? (
                                            <div className="text-danger">{formik.errors.description}</div>
                                        ) : null}

                                    </div>
                                </div>
                                <div className=' row' >
                                    <div className=' d-flex justify-content-center'>
                                        <button className='btn btn-success mt-3'>Submit</button>

                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>
                    <ToastContainer style={{ zIndex: 99999 }} />
                </div >

            </main >
        </div >
    )
}
