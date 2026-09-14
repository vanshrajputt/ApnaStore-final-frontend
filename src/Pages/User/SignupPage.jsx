import React, { useState } from 'react'
import PageTitle from '../../Components/PageTitle'
import TextValidation from '../../FormValidations/TextValidation'
import { Link, useNavigate } from 'react-router-dom'

export default function SignupPage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmpassword: "",
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "Name Field Is Mendatory",
        username: "User Name Field Is Mendatory",
        email: "Email Field Is Mendatory",
        phone: "Phone Number Field Is Mendatory",
        password: "Password Field Is Mendatory",


    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()
    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: TextValidation(e) })
    }
    async function PostData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else if (data.password !== data.confirmpassword) {
            setShow(true)
            setErrorMessage({ ...errorMessage, password: "Password and Confirm Passeord Doesn't Matched" })
        }


        else {
            // let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
            //     method: "GET",
            //     headers: {
            //         "content-type": "application/json"
            //     },

            // })
            // response = await response.json()
            // let item = response.find(x => x.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.email?.toLocaleLowerCase())



            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": import.meta.env.VITE_APP_PUBLIC_TOKEN
                },
                body: JSON.stringify({
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,
                    password: data.password,
                    role: "Buyer",
                    status: true,
                })

            })
            response = await response.json()
            console.log(response)
            if (response.result === "Done")
                navigate("/login")
            else {
                setShow(true)
                setErrorMessage({ ...errorMessage, ...response.reason })
            }


        }


    }
    return (
        <>
            <PageTitle title="Create Your Free Acount" description="Create your ApnaStore account to enjoy faster checkout, track orders, save favorite products, 
            and access exclusive offers for a personalized and convenient shopping experience." />
            <div className="container">
                <div className="row">
                    <div className="col-xl-10 col-lg-10 col-md-11 m-auto">
                        <div className="card p-5">
                            <h5 className='text-center  p-2 border bg-primary text-light' >Create Your Free Acount</h5>
                            <form onSubmit={PostData}>
                                <div className="row">
                                    <div className="col-lg-6 mb-3">
                                        <label>Name*</label>
                                        <input type="text" name='name' onChange={getInputData} placeholder='Full Name ' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label>Phone*</label>
                                        <input type="number" name='phone' onChange={getInputData} placeholder='Phone Number' className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label>UserName*</label>
                                        <input type="text" name='username' onChange={getInputData} placeholder='UserName ' className={`form-control ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label>Email*</label>
                                        <input type="email" name='email' onChange={getInputData} placeholder='Full Email Adress' className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                                        {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label>Password*</label>
                                        <input type="password" name='password' onChange={getInputData} placeholder='Enter Password ' className={`form-control ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />

                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <label> Confirm Password*</label>
                                        <input type="password" name='confirmpassword' onChange={getInputData} placeholder='Enter Confirm Password '
                                            className={`form-control ${show && errorMessage.password ? 'border-danger' : 'border-primary'}`} />

                                    </div>
                                    <div className="col-12">
                                        {show && errorMessage.password ? errorMessage.password?.split("|").map((x, index) => {
                                            return <p className='text-danger' key={index}>{x}</p>
                                        }) : null}
                                    </div>
                                    <div className="mb-3">
                                        <button type='submit' className='btn btn-primary w-100'>Signup</button>
                                    </div>

                                </div>
                            </form>
                            <Link to="/login" className='text-dark'> Already Have an Account? <span className='text-primary'> Login</span> </Link>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}
