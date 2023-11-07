import React, { useContext, useEffect, useRef, useState } from 'react';
import UserSiderbar from './UserSiderbar';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Firebase from './Firebase';
import { useNavigate } from 'react-router-dom';
import './App.css'
import { Eng, Guj } from './HandleLanuage';
import { MyContext } from './ContextProvider';

export default function Expenses() {
    const { lang, setLang } = useContext(MyContext);
    const languageData = lang === 'Eng' ? Eng : Guj;
    const mainRef = useRef(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const Naivgate = useNavigate()
    const [alldata, setAlldata] = useState([])
    const validationSchema = Yup.object().shape({
        name: Yup.string().required(languageData.nameyup),
        referencename: Yup.string(),
        description: Yup.string().required(languageData.detailyup),

        modeofpaytment: Yup.string().required(languageData.modeofpaymentyup),
        moblie: Yup.string()
            .matches(/^[0-9]{10}$/, languageData.moblieyup)
            .required(languageData.moblieyup2),
    });

    useEffect(() => {
        console.log("zcxxfvcx")
        getData()
    }, [])
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
    const randomString = makeid();
    const getData = () => {
        let db = Firebase.firestore()
        let data = []
        db.collection("Expenses")
            .get()
            .then((querySnapshot) => {
                querySnapshot.forEach((doc) => {

                    data.push(doc.data())
                    setAlldata(data)
                    console.log(alldata)
                });

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
    }
    const formik = useFormik({
        initialValues: {
            name: '',
            referencename: '',
            moblie: '',
            description: '',
            modeofpaytment: '',
            amount: ""
        },
        validationSchema,
        onSubmit: (values) => {
            values.id = randomString
            values.owner = localStorage.getItem("lid")
            values.type = "expense"
            values.creatted = Date.now()
            console.log(values);

            let db = Firebase.firestore()
            db.collection("Expenses").add(values)
                .then(() => {
                    console.log("Document successfully written!");
                    Naivgate('/dashboard/' + localStorage.getItem("lid"))

                    formik.resetForm()
                })
                .catch((error) => {
                    console.error("Error writing document: ", error);
                });
            formik.resetForm()
        }
    });
    const handleMobileChange = (e) => {
        const inputMobile = e.target.value;

        if (alldata.length > 0) {
            const matchingData = alldata.find((item) => item.moblie === inputMobile);

            if (matchingData) {
                formik.setValues({
                    ...formik.values,
                    name: matchingData.name,
                    referencename: matchingData.referencename,
                    moblie: matchingData.moblie,
                    modeofpaytment: matchingData.modeofpaytment,
                    description: matchingData.description,
                    amount: matchingData.amount
                });
            } else {
                console.log('Mobile number not found in data');
            }
        } else {
            console.log('Data is still loading...');
        }
    };


    return (
        <div>
            <UserSiderbar />
            <main className={`main containers ${sidebarOpen ? 'main-pd' : ''}`} ref={mainRef}>
                <div className="main-container">
                    <div className="container pt-5">

                        <form onSubmit={formik.handleSubmit}>
                            <div className="row">

                                <div className="col-lg-4">

                                    <label className='lablel' htmlFor="name">{languageData.name}:</label>
                                    <input type="text" className='form-control' id="name" name="name" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} />
                                    {formik.touched.name && formik.errors.name && (
                                        <div className="text-danger">{formik.errors.name}</div>
                                    )}
                                </div>
                                <div className="col-lg-4">
                                    <label className='lablel' htmlFor="referencename">{languageData.referencename}:</label>
                                    <input type="text" id='referencename' name='referencename' className='form-control'
                                        value={formik.values.referencename}

                                        onChange={formik.handleChange} onBlur={formik.handleBlur}

                                    />
                                </div>
                                <div className="col-lg-4">
                                    <label className='lablel' htmlFor="moblie">{languageData.moblie}* :-</label>
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
                                    <label className='lablel' htmlFor="description">{languageData.description}:</label>
                                    <select as="select" id="description" className='form-select' name="description" onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.description}>
                                        <option value="">~~~</option>
                                        <option value="પગાર">{languageData.salary}</option>
                                        <option value="ભાડું">{languageData.rent}</option>
                                        <option value="લાઇટ">{languageData.lightbill}</option>
                                        <option value="શાકભાજી">{languageData.vegetables}</option>
                                        <option value="ડેરી">{languageData.dairy}</option>
                                        <option value="કરિયાણું">{languageData.grocery}</option>
                                        <option value="ગેસ બિલ">{languageData.gasbill}</option>
                                        <option value="પેટ્રોલ /ડીઝલ">{languageData.petroldiesel}</option>
                                    </select>
                                    {formik.touched.description && formik.errors.description && (
                                        <div className="text-danger">{formik.errors.description}</div>
                                    )}
                                </div>
                                <div className="col-lg-4">
                                    <label className='lablel' htmlFor="amounts">{languageData.amounts}* :-</label>
                                    <div className='row d-flex align-items-center'>
                                        <div className="form-check">
                                            <label className='lablel' htmlFor="fullDonation">
                                                <input
                                                    type="radio"
                                                    id="fullDonation"
                                                    name="modeofpaytment" // Use a unique name for this group
                                                    value="કેશ"
                                                    checked={formik.values.modeofpaytment === "કેશ"} // Match the value attribute
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                /> {languageData.cash}
                                            </label> <br />
                                            <label className='lablel' htmlFor="monthlyDonation">
                                                <input
                                                    type="radio"
                                                    id="monthlyDonation"
                                                    name="modeofpaytment" // Use a unique name for this group
                                                    value="બઁક"
                                                    checked={formik.values.modeofpaytment === "બઁક"} // Match the value attribute
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />   {languageData.bank}
                                            </label>
                                        </div>
                                        {formik.touched.modeofpaytment && formik.errors.modeofpaytment && (
                                            <div className="text-danger">{formik.errors.modeofpaytment}</div>
                                        )}
                                    </div>
                                </div>
                                <div className="col-lg-4">
                                    <label className='lablel' htmlFor="amount">{languageData.amount}* :-</label>
                                    <input type="text" id='amount' name='amount' className='form-control'
                                        value={formik.values.amount}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    /><br />
                                    {formik.touched.amount && formik.errors.amount && (
                                        <div className="text-danger">{formik.errors.amount}</div>
                                    )}
                                </div>

                                <div className=' row' >
                                    <div className=' d-flex justify-content-center'>
                                        <button className='btn btn-success mt-3'>Submit</button>

                                    </div>
                                </div>

                            </div>
                        </form>


                    </div>
                </div>
            </main >
        </div >
    );
}
