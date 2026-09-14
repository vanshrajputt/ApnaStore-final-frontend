import React, { useState } from 'react'
import PageTitle from '../../Components/PageTitle'

import { Link, useNavigate } from 'react-router-dom'

export default function ForgetPasswordPage1() {
    let [data, setData] = useState({

        username: "",
    })
    let [errorMessage, setErrorMessage] = useState("")

    let navigate = useNavigate()
    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })

    }
    async function PostData(e) {
        e.preventDefault()

        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/forget-password-1`, {
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

        if (response.result === "Done") {
            localStorage.setItem("forget-password-username", data.username)

            navigate("/forget-password-2")


        }

        else {

            setErrorMessage(response.reason)
        }

    }
    return (
        <>
            <PageTitle title="Recover Your Account" description= "Forgot Your Password ? Don’t worry, we’ve got you covered! Enter your registered email address and we’ll help you reset your password securely. Follow the simple instructions sent to your email and get back to your ApnaStore account quickly. Your account security is important to us, and we’re here to make the recovery process easy." />
            <div className="container">
                <div className="row">
                    <div className="col-xl-10 col-lg-10 col-md-11 m-auto">
                        <div className="card p-5">
                            <h5 className='text-center  p-2 border bg-primary text-light' >Recover Your Account</h5>
                            <form onSubmit={PostData}>
                                <div className="row">

                                    <div className="col-lg-12 mb-3">
                                        <label>UserName*</label>
                                        <input type="text" name='username' onChange={getInputData} placeholder='UserName '
                                            className={`form-control ${errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                                        {errorMessage ? <p className='text-danger'>{errorMessage}</p> : null}
                                    </div>


                                    <div className="mb-3">
                                        <button type='submit' className='btn btn-primary w-100'>Send OTP</button>
                                    </div>

                                </div>
                            </form>
            
                        </div>

                    </div>
                </div>
            </div>

        </>
    )
}

