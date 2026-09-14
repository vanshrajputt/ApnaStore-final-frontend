import React, { useEffect, useState } from "react";
import { getCheckout } from "../../Redux/ActionCreators/CheckoutActionCreator";
import {
  getTestimonial,
  creatTestimonial,
  updateTestimonial,
} from "../../Redux/ActionCreators/TestimonialActionCreator";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const inputoptions = {
  message: "",
  star: "5",
  product: "",
  user: "",
};

export default function Orders() {
  let [orders, setOrders] = useState([]);
  let [reviews, setreviews] = useState([]);

  let [inputData, setInputData] = useState(inputoptions);

  let [showModal, setShowModal] = useState(false);
  let [option, setOption] = useState("");

  let CheckoutStateData = useSelector(
    (state) => state.CheckoutStateData
  );

  let TestimonialStateData = useSelector(
    (state) => state.TestimonialStateData
  );

  let dispatch = useDispatch();

  // =========================
  // CREATE REVIEW
  // =========================
  function createRecord(_id) {
    setShowModal(true);
    setOption("Create");

    setInputData({
      ...inputoptions,
      product: _id,
      user: localStorage.getItem("userid"),
    });
  }

  // =========================
  // UPDATE REVIEW
  // =========================
  function updateRecord(_id) {
    let item = reviews.find(
      (x) => x.product?._id === _id
    );

    if (!item) {
      toast.error("Review Not Found!");
      return;
    }

    setShowModal(true);
    setOption("Update");
    setInputData({ ...item });
  }

  // =========================
  // INPUT DATA
  // =========================
  function getInputData(e) {
    let { name, value } = e.target;

    setInputData({
      ...inputData,
      [name]: value,
    });
  }

  // =========================
  // POST / UPDATE REVIEW
  // =========================
  async function postData(e) {
    e.preventDefault();

    if (option === "Create") {
      dispatch(
        creatTestimonial({
          ...inputData,
          star: parseInt(inputData.star),
        })
      );

      setShowModal(false);
      setInputData(inputoptions);

      toast.success("Review Has Been Submitted!!");
    } else {
      dispatch(
        updateTestimonial({
          ...inputData,
        })
      );

      setShowModal(false);
      setInputData(inputoptions);

      toast.success("Review Has Been Updated!!");
    }
  }

  // =========================
  // CHECK REVIEW EXISTS
  // =========================
  function check(_id) {
    return reviews.find(
      (x) =>
        x.product?._id === _id &&
        x.user?._id === localStorage.getItem("userid")
    )
      ? true
      : false;
  }

  // =========================
  // GET ORDERS
  // =========================
  useEffect(() => {
    dispatch(getCheckout());
  }, []);

  useEffect(() => {
    if (CheckoutStateData.length) {
      setOrders(
        CheckoutStateData.filter(
          (x) =>
            x.user?._id === localStorage.getItem("userid")
        )
      );
    } else {
      setOrders([]);
    }
  }, [CheckoutStateData]);

  // =========================
  // GET REVIEWS
  // =========================
  useEffect(() => {
    dispatch(getTestimonial());
  }, []);

  useEffect(() => {
    if (TestimonialStateData.length) {
      setreviews(
        TestimonialStateData.filter(
          (x) =>
            x.user?._id === localStorage.getItem("userid")
        )
      );
    } else {
      setreviews([]);
    }
  }, [TestimonialStateData]);

  return (
    <>
      {orders.length ? (
        orders.map((item) => {
          return (
            <div key={item._id} className="mb-5">

              {/* =========================
                  ORDER DETAILS
              ========================= */}
              <div className="table-responsive">
                <table className="table table-bordered">

                  <thead>
                    <tr>
                      <th>Order ID</th>
                      <th>Order Status</th>
                      <th>Payment Mode</th>
                      <th>Payment Status</th>
                      <th>Payment ID</th>
                      <th>Subtotal</th>
                      <th>Shipping</th>
                      <th>Total</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>

                      {/* Order ID */}
                      <td>{item._id}</td>

                      {/* Order Status */}
                      <td>{item.orderStatus}</td>

                      {/* Payment Mode */}
                      <td>{item.paymentMode}</td>

                      {/* Payment Status */}
                      <td>
                        {item.paymentstatus}

                        {item.paymentMode === "Net Banking" &&
                        item.paymentstatus === "Pending" ? (
                          <Link
                            className="btn btn-primary btn-sm d-block mt-2"
                            to={`/payment/${item._id}`}
                          >
                            Pay Now
                          </Link>
                        ) : null}
                      </td>

                      {/* Payment ID */}
                      <td>
                        {item.rppid ? (
                          <span>{item.rppid}</span>
                        ) : (
                          <span className="text-danger">
                            Not Paid
                          </span>
                        )}
                      </td>

                      {/* Subtotal */}
                      <td>
                        &#8377;{item.subtotal}
                      </td>

                      {/* Shipping */}
                      <td>
                        &#8377;{item.shipping}
                      </td>

                      {/* Total */}
                      <td>
                        &#8377;{item.total}
                      </td>

                      {/* Date */}
                      <td>
                        {new Date(
                          item.createdAt
                        ).toLocaleDateString()}
                      </td>

                    </tr>
                  </tbody>

                </table>
              </div>

              {/* =========================
                  PRODUCTS
              ========================= */}

              <h5>Products in This Order</h5>

              <div className="row">

                {item.products?.map((p, index) => (
                  <div
                    className="col-md-4 mb-3"
                    key={index}
                  >

                    <div className="card h-60">

                      {/* Product Image */}
                      <Link
                        to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.product?.pic}`}
                        target="_blank"
                      >
                        <img
                          src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.product?.pic}`}
                          className="card-img-top"
                          style={{
                            height: "150px",
                            objectFit: "cover",
                          }}
                          alt=""
                        />
                      </Link>

                      {/* Product Name */}
                      <div className="card-body">

                        <h5
                          className="card-title"
                          style={{ height: 30 }}
                        >
                          {p.product?.name}
                        </h5>

                      </div>

                      {/* Product Details */}
                      <ul className="list-group list-group-flush">

                        <li className="list-group-item d-flex justify-content-between">
                          <span>
                            Brand :{" "}
                            {p.product?.brand?.name}
                          </span>

                          <span>
                            Size : {p.size}
                          </span>
                        </li>

                        <li className="list-group-item d-flex justify-content-between">

                          <span>
                            Price : ₹
                            {p.product?.finalPrice}
                          </span>

                          <span>
                            Total : ₹{p.total}
                          </span>

                        </li>

                        <li className="list-group-item d-flex justify-content-between">

                          <span>
                            Color : {p.color}
                          </span>

                          <span>
                            Stock :{" "}
                            {p.product?.stockQuantity}
                          </span>

                        </li>

                        <li className="list-group-item">

                          <span>
                            Quantity : {p.quantity}
                          </span>

                        </li>

                      </ul>

                      {/* =========================
                          BUTTONS
                      ========================= */}

                      <div className="btn-group">

                        {/* Buy Again */}
                        <Link
                          to={`/product/${p.product?._id}`}
                          className="btn btn-primary"
                        >
                          Buy Again
                        </Link>

                        {/* Review */}
                        {item.orderStatus ===
                        "Delivered" ? (
                          check(p.product?._id) ? (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                updateRecord(
                                  p.product?._id
                                )
                              }
                            >
                              Update Review
                            </button>
                          ) : (
                            <button
                              className="btn btn-success btn-sm"
                              onClick={() =>
                                createRecord(
                                  p.product?._id
                                )
                              }
                            >
                              Write Review
                            </button>
                          )
                        ) : null}

                      </div>

                    </div>

                  </div>
                ))}

              </div>

            </div>
          );
        })
      ) : (
        <div className="text-center my-5">

          <h4>No Order History Found</h4>

          <Link
            to="/shop"
            className="btn btn-primary"
          >
            Shop Now
          </Link>

        </div>
      )}

      {/* =========================
          REVIEW MODAL
      ========================= */}

      <div
        className={`modal fade ${
          showModal ? "show d-block" : ""
        }`}
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden={!showModal}
        aria-modal={showModal}
      >

        <div className="modal-dialog">

          <div className="modal-content">

            {/* Modal Header */}
            <div className="modal-header">

              <h1
                className="modal-title fs-5"
                id="exampleModalLabel"
              >
                {option} Review
              </h1>

              <button
                type="button"
                className="btn-close"
                onClick={() => {
                  setShowModal(false);
                  setInputData(inputoptions);
                }}
                aria-label="Close"
              ></button>

            </div>

            {/* Modal Body */}
            <div className="modal-body">

              <form onSubmit={postData}>

                {/* Message */}
                <div className="row">

                  <div className="col-12 mb-3">

                    <label>
                      Message*
                    </label>

                    <textarea
                      name="message"
                      onChange={getInputData}
                      value={inputData.message}
                      placeholder="Write Your Review Here Please...."
                      rows={5}
                      className="form-control border-primary"
                      required
                    ></textarea>

                  </div>

                  {/* Star */}
                  <div className="col-md-6 mb-3">

                    <label>
                      Star
                    </label>

                    <select
                      name="star"
                      value={inputData.star}
                      onChange={getInputData}
                      className="form-control border-primary"
                    >

                      <option value="5">
                        5
                      </option>

                      <option value="4">
                        4
                      </option>

                      <option value="3">
                        3
                      </option>

                      <option value="2">
                        2
                      </option>

                      <option value="1">
                        1
                      </option>

                    </select>

                  </div>

                  {/* Submit */}
                  <div className="col-12 mb-3">

                    <button
                      type="submit"
                      className="btn btn-primary w-100"
                    >
                      {option}
                    </button>

                  </div>

                </div>

              </form>

            </div>

          </div>

        </div>

      </div>

      <ToastContainer />

    </>
  );
}