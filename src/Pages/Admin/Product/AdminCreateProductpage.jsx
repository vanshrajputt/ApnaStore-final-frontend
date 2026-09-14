import React, { useEffect, useRef, useState } from 'react'
// import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import AdminSidebar from '../../../Components/Admin/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import TextValidation from '../../../FormValidations/TextValidation'
import ImageValidation from '../../../FormValidations/ImageValidation'
import { creatProduct } from "../../../Redux/ActionCreators/ProductActionCreator"
import { getMainCategory } from "../../../Redux/ActionCreators/MainCategoryActionCreators"
import { getSubCategory } from "../../../Redux/ActionCreators/SubCategoryActionCreators"
import { getBrand } from "../../../Redux/ActionCreators/BrandActionCreator"


const colors = ["White", "Black", "Blue", "Red", "Orange", "Yellow", "Green", "Purple", "Pink", "Gray", "Navy Blue", "N/A"]
const size = ["XXXL", "XXL", "XL", "L", "MD", "SM", "XS", "NB", "24", "26", "28", "30", "32", "34", "36", "38", "40", "42", "44", "46"]
var rte
export default function AdminCreateProductpage() {
    var refdiv = useRef(null);


    let [data, setData] = useState({
        name: "",
        maincategory: "",
        subcategory: "",
        brand: "",
        basePrice: "",
        discount: "",
        finalPrice: "",
        stock: true,
        stockQuantity: '',
        color: [],
        size: [],
        pic: [],

        status: true
    })

    let [errorMessage, setErrorMessage] = useState({
        name: "Name field is Mendatory",
        color: "Color field is Mendatory",
        size: "Size field is Mendatory",
        basePrice: "BasePrice field is Mendatory",
        discount: "Discount field is Mendatory",
        stockQuantity: "StockQuantity field is Mendatory",

        pic: "Pic field is Mendatory",
    })
    let [show, setShow] = useState(false)

    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
    let BrandStateData = useSelector(state => state.BrandStateData)

    let dispatch = useDispatch()
    let navigate = useNavigate()  // ek page se dusre page pr jane ke liye eska use hoga 
    function getInputData(e) {
        let name = e.target.name
        // let value = name === "pic" ? Array.from(e.target.files).map(x => "product/" + x.name) : e.target.value
        let value = name === "pic" ? e.target.files: e.target.value //real backend ke liye ye use hoga


        setData({ ...data, [name]: name === "status" || name === "stock" ? (value === "1" ? true : false) : value })
        setErrorMessage({ ...errorMessage, [name]: name === "pic" ? ImageValidation(e) : TextValidation(e) })


    }
    function getInputCheckBox(key, value) {
        let arr = key === "color" ? data.color : data.size
        if (arr.includes(value))
            arr = arr.filter(x => x !== value)
        else
            arr.push(value)
        setData({ ...data, [key]: arr })
        setErrorMessage({ ...errorMessage, [key]: arr.length === 0 ? `please select Atleast one ${key}` : '' })


    }
    function postData(e) {
        e.preventDefault()
        //  agr error hai to error show hoga form fill nhi hoga 
        let error = Object.values(errorMessage).find(x => x !== "")
        if (error)
            setShow(true)
        else {

            let basep = parseInt(data.basePrice)
            let disc = parseInt(data.discount)
            let stockq = parseInt(data.stockQuantity)
            let finalp = parseInt(basep - basep * disc / 100)
            let description = rte.getHTMLCode()

            // dispatch(creatProduct({
            //     ...data,
            //     maincategory: data.maincategory || MaincategoryStateData[0].name,
            //     subcategory: data.subcategory || SubcategoryStateData[0].name,
            //     brand: data.brand || BrandStateData[0].name,
            //     basePrice: basep,
            //     discount: disc,
            //     stockQuantity: stockq,
            //     finalPrice: finalp,
            //     description: description
            // }))

            let formData = new FormData()
            formData.append("name", data.name)
            formData.append("maincategory", data.maincategory || MaincategoryStateData[0]._id)
            formData.append("subcategory", data.subcategory || SubcategoryStateData[0]._id)
            formData.append("brand", data.brand || BrandStateData[0]._id)
            data.color.forEach(x => formData.append("color", x))
            data.size.forEach(x => formData.append("size", x))
            Array.from(data.pic).forEach(x => formData.append("pic", x))
            formData.append("basePrice", basep)
            formData.append("discount", disc)
            formData.append("finalPrice", finalp)
            formData.append("stockQuantity", stockq)
            formData.append("stock", data.stock)
            formData.append("description", description)
            formData.append("status", data.status)
            dispatch(creatProduct(formData))
            navigate("/admin/product")


        }



    }
    useEffect(() => {
        (() => dispatch(getMainCategory()))()
    }, [MaincategoryStateData.length])


    useEffect(() => {
        (() => dispatch(getSubCategory()))()
    }, [SubcategoryStateData.length])


    useEffect(() => {
        (() => dispatch(getBrand()))()
    }, [BrandStateData.length])
    useEffect(() => {
        rte = new window.RichTextEditor(refdiv.current);
        rte.setHTMLCode("");
    }, [])
    return (
        <>
            <div className="container my-3 admin">
                <div className="row">
                    <div className="col-md-3">
                        <AdminSidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-center p-2 text-light'>Create Product
                            <Link to="/admin/product"><i className='bi bi-arrow-left text-light float-end'></i></Link>
                        </h5>
                        <form onSubmit={postData}>
                            <div className="row">
                                <div className="col-12 mb-3">
                                    <label>Name <span className='text-danger'>*</span></label>
                                    <input type="text" name='name' onChange={getInputData} placeholder='Product Name'
                                        className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.name ? <p className='text-danger'>{errorMessage.name}</p> : null}
                                </div>


                                <div className="col-lg-3 mb-3">
                                    <label>Maincategory <span className='text-danger'>*</span></label>
                                    <select name="maincategory" onChange={getInputData} className='form-select border-primary' >
                                        {MaincategoryStateData.filter(x => x.status).map(item => {
                                            // return <option key={item._id}>{item.name}</option>
                                            return <option key={item._id} value={item._id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label>Subcategory <span className='text-danger'>*</span></label>
                                    <select name="subcategory" onChange={getInputData} className='form-select border-primary' >
                                        {SubcategoryStateData.filter(x => x.status).map(item => {
                                            // return <option key={item._id}>{item.name}</option>
                                            return <option key={item._id} value={item._id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>
                                <div className="col-lg-3 mb-3">
                                    <label>Brand <span className='text-danger'>*</span></label>
                                    <select name="brand" onChange={getInputData} className='form-select border-primary' >
                                        {BrandStateData.filter(x => x.status).map(item => {
                                            // return <option key={item._id}>{item.name}</option>
                                            return <option key={item._id} value={item._id}>{item.name}</option>
                                        })}
                                    </select>
                                </div>


                                <div className="col-lg-3 mb-3">
                                    <label> Stock <span className='text-danger'>*</span></label>
                                    <select name="stock" className='form-select border-primary' onClick={getInputData} >

                                        <option value="1">In Stock</option>,
                                        <option value="0">Out Of  Stock</option>

                                    </select>
                                </div>


                                <div className="col-lg-6 mb-3">
                                    <label>Base Price <span className='text-danger'>*</span></label>
                                    <input type="number" name='basePrice' onChange={getInputData} placeholder='Product Base Price'
                                        className={`form-control ${show && errorMessage.basePrice ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.basePrice ? <p className='text-danger'>{errorMessage.basePrice}</p> : null}
                                </div>
                                <div className="col-lg-6 mb-3">
                                    <label>Discount <span className='text-danger'>*</span></label>
                                    <input type="number" name='discount' onChange={getInputData} placeholder='Product Discount'
                                        className={`form-control ${show && errorMessage.discount ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.discount ? <p className='text-danger'>{errorMessage.discount}</p> : null}
                                </div>

                                <div className="col-12 mb-3 p-2">
                                    <label>Color <span className='text-danger'>*</span></label>
                                    <div className='border border-primary rounded'>
                                        <div className="row">
                                            {colors.map((item, index) => {
                                                return <div className='col-xl-2 col-lg-3 col-lg-4' key={index}>
                                                    <input type='checkbox' id={item} onChange={() => getInputCheckBox('color', item)} />
                                                    <label htmlFor={item}>{item}</label>

                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    {show && errorMessage.color ? <p className='text-danger'>{errorMessage.color}</p> : null}
                                </div>

                                <div className="col-12 mb-3 p-2">
                                    <label>Size <span className='text-danger'>*</span></label>
                                    <div className='border border-primary rounded'>
                                        <div className="row">
                                            {size.map((item, index) => {
                                                return <div className='col-xl-2 col-lg-3 col-lg-4' key={index}>
                                                    <input type='checkbox' id={item} onChange={() => getInputCheckBox('size', item)} />
                                                    <label htmlFor={item}>{item}</label>

                                                </div>
                                            })}
                                        </div>
                                    </div>
                                    {show && errorMessage.size ? <p className='text-danger'>{errorMessage.size}</p> : null}
                                </div>



                                <div className="col-12 mb-3">
                                    <label>Description<span className='text-danger'>*</span></label>

                                    <div className='border border-primary' ref={refdiv}></div>

                                </div>
                                <div className="col-lg-4 mb-3">
                                    <label>Stock Quantity <span className='text-danger'>*</span></label>
                                    <input type="number" name='stockQuantity' onChange={getInputData} placeholder='Product Stock Quantity'
                                        className={`form-control ${show && errorMessage.stockQuantity ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.stockQuantity ? <p className='text-danger'>{errorMessage.stockQuantity}</p> : null}
                                </div>
                                <div className="col-lg-4 mb-3">
                                    <label>Pic <span className='text-danger'>*</span></label>
                                    <input type="file" name='pic' multiple onChange={getInputData}
                                        className={`form-control ${show && errorMessage.pic ? 'border-danger' : 'border-primary'}`} />
                                    {show && errorMessage.pic ? errorMessage.pic?.split("|").map((item, index) => {
                                        return <p className='text-danger' key={index}>{item}</p>
                                    }) : null}
                                </div>
                                <div className="col-lg-4 mb-3">
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
