import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextValidation from '../../FormValidations/TextValidation'


export default function Updateprofile({ changeParams }) {

    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",

    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        username: "",
        email: "",
        phone: ""


    })
    let [show, setShow] = useState(false)

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })
        setErrorMessage({ ...errorMessage, [name]: TextValidation(e) })
    }
    async function PostData(e) {


        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")


        if (error) {

            setShow(true)
        }


        else {

            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${data._id}`, {
                method: "PUT",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                },
                body: JSON.stringify({
                    ...data,
                    name: data.name,
                    username: data.username,
                    email: data.email,
                    phone: data.phone,

                })

            })
            response = await response.json()
          if(response.result==="Done")
            changeParams("Profile")
        else{
            setShow(true)
            setErrorMessage({...errorMessage,...response.reason})
        }


        }


    }
    useEffect(() => {
        (async () => {
            let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                    "authorization": localStorage.getItem("token")
                }
            })
            response = await response.json()
            setData({ ...data, ...response?.data })

        })()

    }, [])

    return (
        <>
            <form onSubmit={PostData}>
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <label>Name*</label>
                        <input type="text" name='name' value={data.name} onChange={getInputData} placeholder='Full Name ' className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                        {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label>Phone*</label>
                        <input type="number" name='phone' value={data.phone} onChange={getInputData} placeholder='Phone Number' className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} />
                        {show && errorMessage.phone ? <p className='text-danger'>{errorMessage.phone}</p> : null}
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label>UserName*</label>
                        <input type="text" name='username' value={data.username} onChange={getInputData} placeholder='UserName ' className={`form-control ${show && errorMessage.username ? 'border-danger' : 'border-primary'}`} />
                        {show && errorMessage.username ? <p className='text-danger'>{errorMessage.username}</p> : null}
                    </div>
                    <div className="col-lg-6 mb-3">
                        <label>Email*</label>
                        <input type="email" name='email' value={data.email} onChange={getInputData} placeholder='Full Email Adress' className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} />
                        {show && errorMessage.email ? <p className='text-danger'>{errorMessage.email}</p> : null}
                    </div>


                    <div className="mb-3">
                        <button type='submit' className='btn btn-primary w-100'>Update</button>
                    </div>

                </div>
            </form>
        </>
    )
}
