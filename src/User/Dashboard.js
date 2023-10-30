import React, { useEffect, useRef, useState } from 'react'
import UserSiderbar from './UserSiderbar'


import { useFormik } from 'formik';
import { format } from 'date-fns';
import Firebase from './Firebase';
import * as Yup from 'yup';

export default function Dashboard() {
    const [alldata, setAlldata] = useState([])
    const mainRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);



    let data = []
    useEffect(() => {
        getData()
    }, [])




    // get Data 
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
        moblie: Yup.string()

            .matches(/^[0-9]{10}$/, 'નંબર અધૂરો છે')
            .required('ફોન નંબર બાકી છે'),
    });
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd-MM-yyyy (hh:mm:ss a)');

    const formik = useFormik({
        initialValues: {
            name: '',
            referencename: '',
            village: '',
            taluk: '',
            district: '',
            moblie: '',
            price: ''

        },
        validationSchema,
        onSubmit: (values) => {
            values.id = Date.now()
            values.BIllDT = Date.now()

            console.log(values)
            let db = Firebase.firestore()
            db.collection("Doner").add(values)
                .then(() => {
                    console.log("Document successfully written!");
                    formik.resetForm()
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });

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

                    <div className="container   pt-5">
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

                                </div>

                                <div className=" row col-lg-12">

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

                                </div>
                                <div className="row">
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
                                        <label htmlFor="price">રકમ* :-</label>
                                        <input type="text" id='price' name='price' className='form-control'
                                            value={formik.values.price}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        /><br />
                                        {formik.touched.price && formik.errors.price && (
                                            <div className="text-danger">{formik.errors.price}</div>
                                        )}
                                    </div>
                                </div>


                                <div className='col-lg-12'>
                                    <div className=' d-flex justify-content-center'>
                                        <button className='btn btn-success'>Submit</button>

                                    </div>
                                </div>
                            </form>


                        </div>
                    </div>
                </div >

            </main >
        </div >
    )
}
