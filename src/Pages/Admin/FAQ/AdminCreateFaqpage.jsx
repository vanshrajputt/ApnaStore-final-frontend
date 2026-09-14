import React, { useEffect, useState } from 'react'
// import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import TextValidation from '../../../FormValidations/TextValidation'

import { creatFaq, getFaq } from "../../../Redux/ActionCreators/FaqActionCreator"
import { useDispatch, useSelector } from 'react-redux'

export default function AdminCreateFaqpage() {
    let [data, setData] = useState({
        question: '',
        answer: '',
        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        question: "Question field is Mendatory",
      
        answer: "answer field is Mendatory",
    })
    let [show, setShow] = useState(false)
    let FaqStateData = useSelector(state => state.FaqStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()  // ek page se dusre page pr jane ke liye eska use hoga 
    function getInputData(e) {
        // let [name, value] = e.target
        let name = e.target.name
        let value = e.target.value


        setData({ ...data, [name]: name === "status" ? (value === "1" ? true : false) : value })
        setErrorMessage({ ...errorMessage, [name]: TextValidation(e) })


    }
    function postData(e) {
        e.preventDefault()
        //  agr error hai to error show hoga form fill nhi hoga 
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {

            //  dublicate naam ke liye limtiation 
            let item = FaqStateData.find(x => x.question?.toLocaleLowerCase() === data.name?.toLocaleLowerCase())
            // let item = FaqStateData.find(x => x.name === data.name)
            if (item) {
                setShow(true)
                setErrorMessage({ ...errorMessage, 'question': "Faq Record With this question Already Exist" })
                return
            }


            //  data post krna frontend to back -end 

            dispatch(creatFaq({ ...data }))

            navigate("/admin/faq")


        }


    }
    useEffect(() => {
        (() => dispatch(getFaq()))()
    }, [FaqStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Create Faq
                            <Link to="/admin/faq"><i className='bi bi-arrow-left text-light float-end'></i></Link>
                        </h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Question <span className='text-danger'>*</span></label>
                                    <input type="text" name='question' onChange={getInputData} placeholder='Faq Question'
                                        className={`form-control ${show && errorMessage.question ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.question ? <p className='text-danger'>{errorMessage.question}</p> : null}
                                </div>
                                <div className="col-12 mb-3">
                                    <label>Answer <span className='text-danger'>*</span></label>
                                    <textarea name='answer' rows={3} onChange={getInputData} placeholder='Answer'
                                        className={`form-control ${show && errorMessage.answer ? 'border-danger' : 'border-primary'}`}></textarea>
                                    {show && errorMessage.answer ? <p className='text-danger'>{errorMessage.answer}</p> : null}
                                </div>
                                
                                <div className="col-6 mb-3">
                                    <label>Status <span className='text-danger'>*</span></label>
                                    <select name="status" onChange={getInputData} className='form-select border-primary'>
                                        <option value="1">Active</option>
                                        <option value="0">Inctive</option>
                                    </select>
                                </div>
                                <button type='submit' className='btn btn-primary w-100'>Create</button>

                            </div>
                        </form>

                    </div>
                </div>
            </div>
        </>
    )
}
