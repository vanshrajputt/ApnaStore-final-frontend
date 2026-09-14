import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link } from 'react-router-dom'
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getContactUs, deleteContactUs, updateContactUs } from "../../../Redux/ActionCreators/ContactUsActionCreator"


export default function AdminContactUsPage() {
    let [data, setData] = useState([])
    let [flag, setFlag] = useState(false)

    let ContactUsStateData = useSelector(state => state.ContactUsStateData)
    let dispatch = useDispatch()

    //  delete krne ke liye item koo
    function deleteRecord(_id) {
        if (window.confirm("Are you sure to delete this Record:")) {
            dispatch(deleteContactUs({ _id: _id }))
            setData(data.filter(x => x._id !== _id))
        }
    }
    function updateStatus(_id) {
        if (window.confirm("Are You Sure to Update Status:")) {
            let item = data.find(x => x._id === _id)
            let index = data.findIndex(x => x._id === _id)

            item.status = !item.status
            dispatch(updateContactUs({ ...item }))
            data[index].status = item.status
            setData(data)
            setFlag(!flag)
        }

    }

    useEffect(() => {
        let time = (() => {
            dispatch(getContactUs())
            if (ContactUsStateData.length) {
                setData(ContactUsStateData)
            }

            let time = setTimeout(() => {
                new DataTable('#myTable');
            }, 500)
            return time
        })()
        return () => clearTimeout(time)

    }, [ContactUsStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Contact Us</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Phone</th>
                                        <th>Subject</th>
                                        <th>Date</th>
                                        <th>Status</th>

                                        <th></th>
                                        <th></th>



                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => {
                                        return <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>{item.name}</td>
                                            <td>{item.email}</td>
                                            <td>{item.phone}</td>
                                            <td>
                                               
                                                    {item.subject}
                                               
                                            </td>
                                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>


                                            <td style={{ cursor: "pointer" }} onClick={() => updateStatus(item._id)}>{item.status ? "Active" : "Inactive"}</td>
                                              <td><Link to={`/admin/contactus/show/${item._id}`} className='btn btn-primary'><i className='bi bi-eye'></i></Link></td>
                                            <td>

                                                {item.status ? null : <button className='btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='bi bi-trash'></i></button>}
                                            </td>
                                        </tr>
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
