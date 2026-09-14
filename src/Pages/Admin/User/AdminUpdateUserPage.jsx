import React, { useEffect, useState } from 'react'
// import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextValidation from '../../../FormValidations/TextValidation'

import { updateUser, getUser } from "../../../Redux/ActionCreators/UserActionCreator"
import { useDispatch, useSelector } from 'react-redux'


export default function AdminUpdateUserpage() {
    let { _id } = useParams()
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
        role: "Admin",
        status: true
    })
    let [errorMessage, setErrorMessage] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",



    })
    let [show, setShow] = useState(false)
    let UserStateData = useSelector(state => state.UserStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()  // ek page se dusre page pr jane ke liye eska use hoga 
    function getInputData(e) {
        let name = e.target.name
        let value = e.target.value


        setData({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })
        setErrorMessage({ ...errorMessage, [name]: TextValidation(e) })


    }
    async function postData(e) {
        e.preventDefault()
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
       


        else {

            let item = UserStateData.find(x => x._id !== _id &&( x.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() || x.email?.toLocaleLowerCase() === data.email?.toLocaleLowerCase()))
            if (item) {
                setShow(true)
                setErrorMessage({
                    ...errorMessage,
                    username: item.username?.toLocaleLowerCase() === data.username?.toLocaleLowerCase() ? "Username Already Taken" : "",
                    email: item.email?.toLocaleLowerCase() === data.email?.toLocaleLowerCase() ? "Email Address Already Registered" : ""

                })
            }
            else {
                dispatch(updateUser({
                  ...data
                }))
                navigate("/admin/user")
            }

        }


    }
    useEffect(() => {
        (() => {
            dispatch(getUser())
            if (UserStateData.length) {
                let item = UserStateData.find(x => x._id == _id)
                if (item)
                    setData({ ...data, ...item })
                else
                    navigate("/admin/user")
            }

        })()
    }, [UserStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Update User
                            <Link to="/admin/user"><i className='bi bi-arrow-left text-light float-end'></i></Link>
                        </h5>
                        <form onSubmit={postData}>
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

                                <div className="col-lg-6 mb-3">
                                    <label> Role*</label>
                                    <select name="role" value={data.role} onChange={getInputData} className='form-select border-primary'>
                                        <option>Admin</option>
                                        <option>Super Admin</option>
                                    </select>
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <label> Status*</label>
                                    <select name="status" value={data.status} onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inactive</option>
                                    </select>
                                </div>
                                <div className="col-12 mb-3">
                                    <button type='submit' className='btn btn-primary w-100'>Update</button>
                                </div>

                            </div>
                        </form>


                    </div>
                </div>
            </div>
        </>
    )
}