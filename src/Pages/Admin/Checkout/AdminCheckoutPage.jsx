import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link } from 'react-router-dom'
import DataTable from 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import { getCheckout, deleteCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreator"


export default function AdminCheckoutPage() {
    let [data, setData] = useState([])
    let [flag, setFlag] = useState(false)


    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()


    function updateStatus(_id) {
        if (window.confirm("Are You Sure to Update Status:")) {
            let item = data.find(x => x._id === _id)
            let index = data.findIndex(x => x._id === _id)

            item.status = !item.status
            dispatch(updateCheckout({ ...item }))
            data[index].status = item.status
            setData([...data])
            setFlag(!flag)
        }

    }

    useEffect(() => {
        let time = (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                setData(CheckoutStateData)
            }

            let time = setTimeout(() => {
                new DataTable('#myTable');
            }, 500)
            return time
        })()
        return () => clearTimeout(time)

    }, [CheckoutStateData.length])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Checkout Orders</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered' id='myTable'>
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>User</th>
                                        <th>Order Status</th>
                                        <th>Payment Status</th>
                                        <th>Payment Mode</th>
                                        <th>Total</th>
                                        <th>Date</th>
                                        
                                        <th></th>

                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item) => {
                                        return <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>{item.deliveryAddress.name},{item.deliveryAddress.city}</td>
                                            <td>{item.orderStatus}</td>
                                            <td>{item.paymentstatus}</td>
                                            <td>{item.paymentMode}</td>

                                            <td>{item.total}</td>
                                            <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                                
                                            {/* <td style={{ cursor: "pointer" }} onClick={() => updateStatus(item._id)}>{item.status ? "Active" : "Inactive"}</td> */}
                                            <td><Link to={`/admin/checkout/show/${item._id}`} className='btn btn-primary'><i className='bi bi-eye'></i></Link></td>

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
