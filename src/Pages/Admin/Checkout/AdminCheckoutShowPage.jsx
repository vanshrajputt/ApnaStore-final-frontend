import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getCheckout, deleteCheckout, updateCheckout } from "../../../Redux/ActionCreators/CheckoutActionCreator"


export default function AdminCheckOutShowPage() {
    let { _id } = useParams()
    let [data, setData] = useState({})
    let [flag, setFlag] = useState(false)
    let [orderStatus, setOrderStatus] = useState("")
    let [paymentstatus, setPaymentstatus] = useState("")


    let CheckoutStateData = useSelector(state => state.CheckoutStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()


    function updateStatus() {
        if (window.confirm("Are You Sure to Update Status:")) {
            data.orderStatus = orderStatus
            data.paymentstatus = paymentstatus
           
            dispatch(updateCheckout({ ...data }))
            setData(data)
            setFlag(!flag)
        }

    }

    useEffect(() => {
        (() => {
            dispatch(getCheckout())
            if (CheckoutStateData.length) {
                let item = CheckoutStateData.find(x => x._id === _id)
                if (item)
                    setData({ ...item })
                else
                    navigate("/admin/checkout")
            }
        })()


    }, [CheckoutStateData.length])

    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>CheckOut Query</h5>
                        <div className="table-responsive">
                            <table className='table table-bordered'>
                                <tbody>
                                    <tr>
                                        <th>ID</th>
                                        <td>{data._id}</td>
                                    </tr>
                                    <tr>
                                        <th>Delivery Address</th>
                                        <td>
                                            {data.deliveryAddress?.name}<br />
                                            {data.deliveryAddress?.phone}<br />
                                            {data.deliveryAddress?.email}<br />
                                            {data.deliveryAddress?.address}<br />
                                            {data.deliveryAddress?.city} <br />
                                            {data.deliveryAddress?.state}
                                            {/* {data.deliveryAddress?.country}<br />
                                            {data.deliveryAddress?.pincode} */}

                                        </td>
                                    </tr>

                                    <tr>
                                        <th> Order Status</th>
                                        <td>{data.orderStatus}
                                            {data.orderStatus !== "Delivered" ?
                                                <select className='mt-3 form-select border-primary' onChange={(e) => setOrderStatus(e.target.value)} value={orderStatus}>
                                                    <option>Order Has Placed</option>
                                                    <option>Order is Ready to Ship</option>
                                                    <option>Order Has Been Shipped</option>
                                                    <option>Order Has Been In Transit</option>
                                                    <option>Order is Reached At The Final Delivery Station</option>
                                                    <option>Order is Out for Delivery</option>
                                                    <option>Delivered</option>


                                                </select> : null}
                                        </td>



                                    </tr>
                                    <tr>
                                        <th>Payment Mode</th>
                                        <td>{data.paymentMode}

                                        </td>
                                    </tr>
                                    <tr>
                                        <th> Payment Status</th>
                                        <td>{data.paymentstatus}
                                            {data.paymentstatus === "Pending" ?
                                                <select className='mt-3 form-select border-primary' onChange={(e) => setPaymentstatus(e.target.value)} value={paymentstatus}>
                                                    <option>Pending</option>
                                                    <option>Done</option>
                                                </select> : null}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>SubTotal</th>
                                        <td>&#8377;{data.subtotal}</td>
                                    </tr>
                                    <tr>
                                        <th>Shipping</th>
                                        <td>&#8377;{data.shipping}</td>
                                    </tr>
                                    <tr>
                                        <th>Total</th>
                                        <td>&#8377;{data.total}</td>
                                    </tr>
                                    <tr>
                                        <th>RPPID</th>
                                        <td>{data.rppid ? data.rppid : "N/A"}</td>
                                    </tr>
                                    <tr>
                                        <th>Date</th>
                                        <td>{new Date(data.createdAt).toLocaleDateString()}</td>
                                    </tr>
                                    <tr>

                                        <td colSpan={2}>
                                            {data.orderStatus !== "Delivered" || data.paymentstatus === "Pending" ?
                                                <button onClick={updateStatus} className='btn btn-primary w-100'>Update</button> : null


                                            }
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <h5>Products in This Order</h5>

                            <div className="row">
                                {data.products?.map((item, index) => (
                                    <div className="col-md-4 mb-3" key={index}>
                                        <div className="card h-100">
                                            <Link
                                                to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic}`}
                                                target="_blank"
                                            >
                                                <img
                                                    src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.product?.pic}`}
                                                    className="card-img-top"
                                                    style={{ height: "150px", objectFit: "cover" }}
                                                    alt=""
                                                />
                                            </Link>

                                            <div className="card-body">
                                                <h5 className="card-title text-dark" style={{ height: 30 }} >{item.product?.name}</h5>
                                            </div>

                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item d-flex justify-content-between">
                                                    <span>Brand : {item.product?.brand?.name}</span>
                                                    <span>Size : {item.size}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between">
                                                    <span>Price : ₹{item.product?.finalPrice}</span>
                                                    <span>Total : ₹{item.total}</span>
                                                </li>
                                                <li className="list-group-item d-flex justify-content-between">
                                                    <span>Color : {item.color}</span>
                                                    <span>Stock : {item.product?.stockQuantity}</span>
                                                </li>

                                            </ul>



                                        </div>
                                    </div>
                                ))
                                }

                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}
