import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link } from 'react-router-dom'
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getNewsLetter, deleteNewsLetter, updateNewsLetter } from "../../../Redux/ActionCreators/NewsLetterActionCreator"


export default function AdminNewsletter() {
    let [data, setData] = useState([])
    let[flag , setFlag] = useState(false)

    let NewsLetterStateData = useSelector(state => state.NewsLetterStateData)
    let dispatch = useDispatch()

    //  delete krne ke liye item koo
    function deleteRecord(_id) {
        if (window.confirm("Are you sure to delete this Record:")) {
            dispatch(deleteNewsLetter({ _id: _id }))
            setData(data.filter(x => x._id !== _id))
        }
    }
    function updateStatus(_id) {
        let item = data.find(x => x._id === _id)
        let index = data.findIndex(x => x._id === _id)

        item.status = !item.status
        dispatch(updateNewsLetter({...item}))
       data[index].status=item.status
       setData(data)
       setFlag(!flag)

    }

    useEffect(() => {
        let time = (() => {
            dispatch(getNewsLetter())
            if (NewsLetterStateData.length) {
                setData(NewsLetterStateData)
            }

            let time = setTimeout(() => {
                new DataTable('#myTable');
            }, 500)
            return time
        })()
        return () => clearTimeout(time)

    }, [NewsLetterStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>NewsLetter</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Email</th>
                                        <th>Status</th>
                                        <th></th>
          


                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => {
                                        return <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>{item.email}</td>

                                            <td style={{cursor:"pointer"}} onClick={()=>updateStatus(item._id)}>{item.status ? "Active" : "Inactive"}</td>
                                            
                                            <td>
                                                {localStorage.getItem("role")==="Super Admin"?
                                                <button className='btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='bi bi-trash'></i></button>:null
                                                }
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
