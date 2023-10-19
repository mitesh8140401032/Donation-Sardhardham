import React, { useEffect, useRef, useState } from 'react'
import UserSiderbar from './UserSiderbar'
import { useFormik } from 'formik';
import { format } from 'date-fns';

import * as Yup from 'yup';
export default function Dashboard() {
    const [alldata, setAlldata] = useState([])
    const mainRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    let data = []
    useEffect(() => {
        if (localStorage.getItem("Alldata")) {
            data = JSON.parse(localStorage.getItem("Alldata"))
            console.log(data)
            setAlldata(data)
        }
    }, [])

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('નામ જરૂરી છે'),
        referencename: Yup.string(),
        village: Yup.string().required('ગામ જરૂરી છે'),
        taluk: Yup.string(),
        district: Yup.string(),
        moblie: Yup.string()
            .required("મોબાઈ જરૂરી")
            .matches(/^[0-9]{10}$/, 'નંબર અધૂરું છે')
            .required('ફોન નંબર બાકી છે'),
    });
    const currentDate = new Date();
    const formattedDate = format(currentDate, 'dd-MM-yyyy (HH:mm:ss)');

    const formik = useFormik({
        initialValues: {
            name: '',
            referencename: '',
            village: '',
            taluk: '',
            district: '',
            moblie: '',
        },
        validationSchema,
        onSubmit: (values) => {
            values.id = Date.now()
            values.BIllDT = formattedDate
            console.log(values);
            alldata.push(values)
            localStorage.setItem("Alldata", JSON.stringify(alldata))

            formik.resetForm()
        },
    });
    const autosetMoblienumber = (e) => {
        let findDoner = alldata.findIndex((i) => i.moblie === e)
        console.log(find)
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
                                        <label htmlFor="name">હસ્ત નામ:-</label>
                                        <input type="text"
                                            id='name'
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
                                        <label htmlFor="name">ગામ:-</label>
                                        <input type="text"
                                            id='name'
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
                                        <label htmlFor="name">તાલુકો:-</label>
                                        <input type="text"
                                            id='name'
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
                                        <label htmlFor="name">જીલ્લો:-</label>
                                        <input type="text"
                                            id='name'
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

                                <div className="col-lg-4">
                                    <label htmlFor="name">મોબાઈલ નંબર* :-</label>
                                    <input type="text" id='name' name='moblie' className='form-control'
                                        value={formik.values.moblie}
                                        onChange={(e) => autosetMoblienumber(e.target.value)}
                                        onBlur={formik.handleBlur}
                                    /><br />
                                    {formik.touched.moblie && formik.errors.moblie && (
                                        <div className="text-danger">{formik.errors.moblie}</div>
                                    )}
                                </div>
                                <div className='col-lg-12'>
                                    <div className=' d-flex justify-content-center'>
                                        <button className='btn btn-success'>Submit</button>

                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </main>
        </div>
    )
}
