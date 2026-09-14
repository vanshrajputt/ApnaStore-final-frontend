import React, { useEffect, useState } from 'react'
// import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextValidation from '../../../FormValidations/TextValidation'

import { updateFeature, getFeature } from "../../../Redux/ActionCreators/FeatureActionCreator"
import { useDispatch, useSelector } from 'react-redux'


export default function AdminUpdateFeaturepage() {
    let { _id } = useParams()
    let [data, setData] = useState({
        name: "",
        icon: "",
        shortDescription: "",
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        icon: "",
        shortDescription: "",

    })
    let [show, setShow] = useState(false)
    let FeatureStateData = useSelector(state => state.FeatureStateData)
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
        //  agr error hai to error show hoga form fill nhi hoga 
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {

            //  dublicate naam ke liye limtiation 
            let item = FeatureStateData.find(x => x._id !== _id && x.name?.toLocaleLowerCase() === data.name?.toLocaleLowerCase())
            // let item = FeatureStateData.find(x => x.name === data.name)
            if (item) {
                setShow(true)
                setErrorMessage({ ...errorMessage, 'name': "Feature With this name Already Exist" })
                return
            }


            //  data post krna frontend to back -end 
            dispatch(updateFeature({ ...data }))

            navigate("/admin/feature")


        }


    }
    useEffect(() => {
        (() => {
            dispatch(getFeature())
            if (FeatureStateData.length) {
                let item = FeatureStateData.find(x => x._id == _id)
                if (item)
                    setData({ ...data, ...item })
                else
                    navigate("/admin/feature")
            }

        })()
    }, [FeatureStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Update Feature
                            <Link to="/admin/feature"><i className='bi bi-arrow-left text-light float-end'></i></Link>
                        </h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name <span className='text-danger'>*</span></label>
                                    <input type="text" name='name' value={data.name} onChange={getInputData} placeholder='Feature Name'
                                        className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Short description <span className='text-danger'>*</span></label>
                                    <textarea name='shortDescription' value={data.shortDescription} rows={3} onChange={getInputData} placeholder='shortDescription'
                                        className={`form-control ${show && errorMessage.shortDescription ? 'border-danger' : 'border-primary'}`}></textarea>
                                    {show && errorMessage.shortDescription ? <p className='text-danger'>{errorMessage.shortDescription}</p> : null}
                                </div>
                                <div className="col-6 mb-3">
                                    <label>Icon <span className='text-danger'>*</span></label>
                                    <input type="text" name='icon' value={data.icon} placeholder="Bootstrap icon Tag .<i class='bi-bi-list'></i>" onChange={getInputData}
                                        className={`form-control ${show && errorMessage.icon ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.icon ? <p className='text-danger'>{errorMessage.icon}</p> : null}
                                </div>

                                <div className="col-6 mb-3">
                                    <label>Status <span className='text-danger'>*</span></label>
                                    <select name="status" value={data.status ? "1" : "0"} onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inctive</option>
                                    </select>
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>Update</button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}