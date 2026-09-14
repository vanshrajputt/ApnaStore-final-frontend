import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link } from 'react-router-dom'
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getSubCategory, deleteSubCategory } from "../../../Redux/ActionCreators/subcategoryActionCreators"


export default function AdminSubcategoryPage() {
    let [data, setData] = useState([])

    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let dispatch = useDispatch()

    //  delete krne ke liye item koo
     function deleteRecord(_id) {
        if (window.confirm("Are you sure to delete this Record:")) {
           dispatch(deleteSubCategory({_id:_id}))
           setData(data.filter(x=> x._id!==_id))   
        }
    }
    //  delete end 

    useEffect(() => {
        let time = ( () => {
            dispatch(getSubCategory())
            if (SubcategoryStateData.length) {
                setData(SubcategoryStateData)
            }

            let time = setTimeout(() => {
                new DataTable('#myTable');
            }, 500)
            return time
        })()
        return () => clearTimeout(time)

    }, [SubcategoryStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Subcategory
                            <Link to="/admin/subcategory/create"><i className='bi bi-plus text-light float-end'></i></Link></h5>
                        <div className="table-responsive">
                            <table className='table table-borderd' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Pic</th>
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
                                            <td>
                                                <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} target='_blank'></Link>
                                                <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} height={60} width={80} alt="" />
                                            </td>
                                            <td>{item.status ? "Active" : "Inactive"}</td>
                                            <td><Link to={`/admin/subcategory/update/${item._id}`} className='btn btn-primary'><i className='bi bi-pencil'></i></Link></td>
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
