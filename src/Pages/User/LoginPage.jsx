import React, { useState } from 'react'
import PageTitle from '../../Components/PageTitle'
import TextValidation from '../../FormValidations/TextValidation'
import { Link, useNavigate } from 'react-router-dom'

export default function LoginPage() {
    let [data, setData] = useState({

        username: "",
        password: "",
        confirmpassword: "",
    })
    let [errorMessage, setErrorMessage] = useState("")

    let navigate = useNavigate()
    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })

    }
    async function PostData(e) {
        e.preventDefault()

        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/login`, {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "authorization": import.meta.env.VITE_APP_PUBLIC_TOKEN
            },
            body: JSON.stringify({ ...data })

        })
        response = await response.json()
        console.log(response)
        // let item = response.find(x => x.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.username?.toLocaleLowerCase())
        if (response.result === "Done" && response.data?.status === false) {

            setErrorMessage("Your Account Has Been Deactivated (Bloked) Deu to Sone Anutorized Activity , Please Contact Us to Unbloked your Account ")
        }
        else if (response.result === "Done") {
            localStorage.setItem("login", true)

            localStorage.setItem("name", response.data?.name)
            localStorage.setItem("userid", response.data?._id)
            localStorage.setItem("role", response.data?.role)
            localStorage.setItem("token", response.token)
            if (response.data?.role === "Buyer")
                navigate("/profile")
            else {
                navigate("/admin")
            }

        }

        else {

            setErrorMessage("Invalid User Name  or Paasword")
        }

    }
    return (
        <>
            <PageTitle title="Login To Your  Account" description="Log in to your ApnaStore account to access your orders,
             wishlist, saved details, and exclusive offers for a faster, secure, and personalized shopping experience." />
            <div className="container">
                <div className="row">
                    <div className="col-xl-10 col-lg-10 col-md-11 m-auto">
                        <div className="card p-5">
                            <h5 className='text-center  p-2 border bg-primary text-light' >Login Your Account</h5>
                            <form onSubmit={PostData}>
                                <div className="row">

                                    <div className="col-lg-12 mb-3">
                                        <label>UserName*</label>
                                        <input type="text" name='username' onChange={getInputData} placeholder='UserName '
                                            className={`form-control ${errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                                        {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label>Password*</label>
                                        <input type="password" name='password' onChange={getInputData} placeholder='Enter Password '
                                            className={`form-control ${errorMessage.password ? 'border-danger' : 'border-primary'}`} />

                                    </div>


                                    <div className="mb-3">
                                        <button type='submit' className='btn btn-primary w-100'>Login</button>
                                    </div>

                                </div>
                            </form>
                            <div className='d-flex justify-content-between'>
                                <Link to="/forget-password-1" className='text-dark'> Reset Your Password? <span className='text-primary'>Forget Password</span> </Link>
                                <Link to="/signup" className='text-dark'> Doesn't Have an Account? <span className='text-primary'> Create</span> </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

