import React, { useEffect, useState } from 'react'
// import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TextValidation from '../../../FormValidations/TextValidation'
import ImageValidation from '../../../FormValidations/ImageValidation'
import { updateSubCategory, getSubCategory } from "../../../Redux/ActionCreators/subcategoryActionCreators"
import { useDispatch, useSelector } from 'react-redux'


export default function AdminUpdateSubcategorypage() {
    let { _id } = useParams()
    let [data, setData] = useState({
        name: "",
        pic: "",
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "",
        pic: "",
    })
    let [show, setShow] = useState(false)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let dispatch = useDispatch()

    let navigate = useNavigate()  // ek page se dusre page pr jane ke liye eska use hoga 
    function getInputData(e) {
        let name = e.target.name
        let value = name === "pic" ? "Subcategory/" + e.target.files[0].name : e.target.value
        // let value = name === "pic" ?e.target.files[0]: e.target.value //real backend ke liye ye use hoga


        setData({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? ImageValidation(e) : TextValidation(e) })


    }
    async function postData(e) {
        e.preventDefault()
        //  agr error hai to error show hoga form fill nhi hoga 
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {

            //  dublicate naam ke liye limtiation 
            let item = SubcategoryStateData.find(x => x._id !== _id && x.name?.toLocaleLowerCase() === data.name?.toLocaleLowerCase())
            // let item = SubcategoryStateData.find(x => x.name === data.name)
            if (item) {
                setShow(true)
                setErrorMessage({ ...errorMessage, 'name': "SubCategory With this name Already Exist" })
                return
            }


            //  data post krna frontend to back -end 
            dispatch(updateSubCategory({ ...data }))
            // let formData = new FormData()
            // formData.append("name",data.name)
            // formData.append("_id",data._id)
            // formData.append("pic",data.pic)
            // formData.append("status",data.status)
            // dispatch(creatSubCategory(formData))
            navigate("/admin/subcategory")


        }


    }
    useEffect(() => {
        (() => {
            dispatch(getSubCategory())
            if (SubcategoryStateData.length) {
                let item = SubcategoryStateData.find(x => x._id == _id)
                if (item)
                    setData({ ...data, ...item })
                else
                    navigate("/admin/subcategory")
            }

        })()
    }, [SubcategoryStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Update Subcategory
                            <Link to="/admin/subcategory"><i className='bi bi-arrow-left text-light float-end'></i></Link>
                        </h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name <span className='text-danger'>*</span></label>
                                    <input type="text" name='name' value={data.name} onChange={getInputData} placeholder='Product Name'
                                        className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>
                                <div className="col-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name='pic' onChange={getInputData}
                                        className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.pic ? <p className='text-danger'>{errorMessage.pic}</p> : null}
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