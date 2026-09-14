import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link } from 'react-router-dom'
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getFeature, deleteFeature } from "../../../Redux/ActionCreators/FeatureActionCreator"


export default function AdminFeaturePage() {
    let [data, setData] = useState([])

    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()

    //  delete krne ke liye item koo
     function deleteRecord(_id) {
        if (window.confirm("Are you sure to delete this Record:")) {
           dispatch(deleteFeature({_id:_id}))
           setData(data.filter(x=> x._id!==_id))   
        }
    }
    //  delete end 

    useEffect(() => {
        let time = ( () => {
            dispatch(getFeature())
            if (FeatureStateData.length) {
                setData(FeatureStateData)
            }

            let time = setTimeout(() => {
                new DataTable('#myTable');
            }, 500)
            return time
        })()
        return () => clearTimeout(time)

    }, [FeatureStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Feature
                            <Link to="/admin/feature/create"><i className='bi bi-plus text-light float-end'></i></Link></h5>
                        <div className="table-responsive">
                            <table className='table table-bordered' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Icon</th>
                                        <th>Short Description</th>
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
                                            
                                            <td><span className='fs-1 text-primary' dangerouslySetInnerHTML={{__html:item.icon}} /></td>
                                            <td>{item.shortDescription}</td>
                                            
                                            <td>{item.status ? "Active" : "Inactive"}</td>
                                            <td><Link to={`/admin/feature/update/${item._id}`} className='btn btn-primary'><i className='bi bi-pencil'></i></Link></td>
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
