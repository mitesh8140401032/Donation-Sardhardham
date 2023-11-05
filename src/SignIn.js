import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useFormik } from 'formik';
import Firebase from './Firebase';
import * as Yup from 'yup';
export default function SingIn() {
    const [login, setLogin] = useState([])
    const naivgate = useNavigate()
    useEffect(() => {
        getData()
    }, [])
    const getData = () => {
        let db = Firebase.firestore()
        let data = []
        db.collection("Admin")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                    console.log(doc.id, " => ", doc.data());
                    data.push(doc.data())
                    setLogin(data)
                });
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }
    const validationSchema = Yup.object({
        username: Yup.string().required('Username is required'),
        password: Yup.string().required('Password is required'),
    });
    const formik = useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validationSchema,

        onSubmit: (values) => {
            // Handle form submission here

            login.forEach((i) => {
                if (i.username == values.username && i.password == values.password) {
                    naivgate('/dashboard/' + values.username)
                    localStorage.setItem("lid", values.username)
                }
            })
            formik.resetForm()

        },
    });
    return (
        <div className='login-pages '>

            <div className="login">

                <div className="heading">
                    <h2>Welcome!</h2>
                    <p>Sign In to your account</p>
                </div>
                <form onSubmit={formik.handleSubmit}>
                    <div className="input-group">
                        <input
                            type="text"
                            id="username"
                            className="input-field"
                            placeholder="Username"
                            name="username"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.username}
                        />
                    </div>
                    {formik.touched.username && formik.errors.username && (
                        <div className="error">{formik.errors.username}</div>
                    )}
                    <div className="input-group">
                        <input
                            type="password"
                            id="password"
                            className="input-field"
                            placeholder="Password"
                            name="password"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                        />
                    </div>
                    {formik.touched.password && formik.errors.password && (
                        <div className="error">{formik.errors.password}</div>
                    )}
                    <div className="d-flex justify-content-center  rows ">
                        <Link to={'/login'} className='text-dcoration' >Forgot password?</Link>
                    </div>

                    <div className="input-group">
                        <button className='buttons'>Login <i className="fa-solid fa-arrow-right"></i></button>
                    </div>
                </form>
            </div>

        </div>

    )
}
