import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link } from 'react-router-dom'
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getProduct, deleteProduct } from "../../../Redux/ActionCreators/ProductActionCreator"


export default function AdminProductPage() {
    let [data, setData] = useState([])

    let ProductStateData = useSelector(state => state.ProductStateData)
    let dispatch = useDispatch()

    //  delete krne ke liye item koo
    function deleteRecord(_id) {
        if (window.confirm("Are you sure to delete this Record:")) {
            dispatch(deleteProduct({ _id: _id }))
            setData(data.filter(x => x._id !== _id))
        }
    }
    //  delete end 

    useEffect(() => {
        let time = (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                setData(ProductStateData)
            }

            let time = setTimeout(() => {
                new DataTable('#myTable');
            }, 500)
            return time
        })()
        return () => clearTimeout(time)

    }, [ProductStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Product
                            <Link to="/admin/product/create"><i className='bi bi-plus text-light float-end'></i></Link></h5>
                        <div className="table-responsive">
                            <table className=' table table-bordered' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Maincategory</th>
                                        <th>Subcategory</th>
                                        <th>Brand</th>
                                        <th>Color</th>
                                        <th>Size</th>
                                        <th>Base Price</th>
                                        <th>Discount</th>
                                        <th>Final Price</th>
                                        <th>Stock</th>
                                        <th>Stock Quantity</th>
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
                                            <td>{item.maincategory?.name}</td>
                                            <td>{item.subcategory?.name}</td>
                                            <td>{item.brand?.name}</td>
                                            <td>{item.color?.join()}</td>
                                            <td>{item.size?.join()}</td>
                                            <td>&#8377;{item.basePrice}</td>
                                            <td>{item.discount}%of</td>
                                            <td>&#8377;{item.finalPrice}</td>
                                            <td>{item.stock ? "In Stock" : 'Out Of Stock'}</td>
                                            <td>{item.stockQuantity}</td>

                                            <td >
                                                <div style={{ width: 400 }}>
                                                    {item.pic?.map((p, index) => {


                                                        return <Link key={index} to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p}`} target='_blank'>
                                                            <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p}`} className='m-1' height={60} width={80} alt="" />
                                                        </Link>
                                                    })}
                                                </div>
                                            </td>
                                            <td>{item.status ? "Active" : "Inactive"}</td>
                                            <td><Link to={`/admin/product/update/${item._id}`} className='btn btn-primary'><i className='bi bi-pencil'></i></Link></td>
                                            <td>
                                                {localStorage.getItem("role") === "Super Admin" ?
                                                    <button className='btn btn-danger' onClick={() => deleteRecord(item._id)}><i className='bi bi-trash'></i></button> : null
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
