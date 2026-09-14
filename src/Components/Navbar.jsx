import React, { useEffect, useState } from 'react'
import { data, Link, NavLink, useNavigate } from 'react-router-dom'
import { getSetting } from "../Redux/ActionCreators/SettingActionCreator"
import { useDispatch, useSelector } from 'react-redux'

export default function Navbar() {
  let SettingStateData = useSelector(state => state.SettingStateData)
  let dispatch = useDispatch()
  let [showmenu, setShowmenu] = useState(false)
  let navigate = useNavigate()
  //  agr data base me setting data hai to vha se uthyga vrna yha se like email , phone ect
  let [settingData, setSettingData] = useState({
    siteName: import.meta.env.VITE_APP_SITE_NAME,
    map1: import.meta.env.VITE_APP_MAP1,
    address: import.meta.env.VITE_APP_ADDRESS,
    email: import.meta.env.VITE_APP_EMAIL,
    phone: import.meta.env.VITE_APP_PHONE,
    whatsapp: import.meta.env.VITE_APP_WHATSAPP,
    facebook: import.meta.env.VITE_APP_FACEBOOK,
    twitter: import.meta.env.VITE_APP_TWITTER,
    instagram: import.meta.env.VITE_APP_INSTAGRAM,
    linkdin: import.meta.env.VITE_APP_LINKDIN,
    youtube: import.meta.env.VITE_APP_YOUTUBE,
  })
  function Logout() {
    localStorage.clear()
    alert("Are you sure you want to log out from your ApnaStore account? You can log in again anytime to continue shopping.")
    navigate("/login")
  }
  useEffect(() => {
    (() => {
      dispatch(getSetting())
      if (SettingStateData.length) {
        let obj = []
        Object.keys(settingData).forEach((x => {
          obj.push([x, SettingStateData[0][x] ? SettingStateData[0][x] : settingData[x]])


        }))
        setSettingData(Object.fromEntries(obj))

      }
    })()


  }, [SettingStateData.length])

  return (
    <>

      <header id="header" className={`header fixed-top ${showmenu ? "mobile-nav-active" : ""}`}>

        <div className="topbar d-flex align-items-center dark-background">
          <div className="container d-flex justify-content-center justify-content-md-between">
            <div className="contact-info d-flex align-items-center">

              <Link
                to={`${settingData.map1}`} target='_blank' className='text-light d-flex me-2'>
                <i className="ms-2 bi bi-geo-alt me-1  "></i>
                <span className='d-none d-xl-block'>{settingData.address}</span>
              </Link>
              <Link
                to={`mailto:${settingData.email}`} target='_blank' className='text-light d-flex me-2'>
                <i className="ms-2 bi bi-envelope me-1  "></i>
                <span className='d-none d-xl-block'>{settingData.email}</span>
              </Link>

              <Link
                to={`tel:${settingData.phone}`} target='_blank' className='text-light d-flex me-2'>
                <i className="ms-2 bi bi-telephone me-1  "></i>
                <span className='d-none d-xl-block'>{settingData.phone}</span>
              </Link>
              <Link
                to={`https://wa.me/${settingData.whatsapp}`} target='_blank' className='text-light d-flex me-2'>
                <i className="ms-2 bi bi-whatsapp me-1  "></i>
                <span className='d-none d-xl-block'>{settingData.whatsapp}</span>
              </Link>
            </div>
            <div className="social-links  d-md-flex align-items-center">
              <Link to={settingData.twitter} target='_blank' className="text-light"><i className="ms-2 bi bi-twitter-x"></i></Link>
              <Link to={settingData.facebook} target='_blank' className="text-light"><i className="ms-2 bi bi-facebook"></i></Link>
              <Link to={settingData.instagram} target='_blank' className="text-light"><i className="ms-2 bi bi-instagram"></i></Link>
              <Link to={settingData.linkdin} target='_blank' className="text-light"><i className="ms-2 bi bi-linkedin"></i></Link>
              <Link to={settingData.youtube} target='_blank' className="text-light"><i className="ms-2 bi bi-youtube"></i></Link>
            </div>
          </div>
        </div>

        <div className="branding d-flex align-items-cente">

          <div className="container position-relative d-flex align-items-center justify-content-between">
            <Link to="/" className="logo d-flex align-items-center">
              <h1 className="sitename">{settingData.siteName}</h1>
            </Link>

            <nav id="navmenu" className="navmenu">
              <ul>
                <li> <NavLink to="/">Home</NavLink></li>
                <li> <NavLink to="/about">About</NavLink></li>
                <li> <NavLink to="/shop">Shop</NavLink></li>
                <li> <NavLink to="/feature">Features</NavLink></li>
                <li> <NavLink to="/faq">Faq</NavLink></li>
                <li> <NavLink to="/contactus">Contact Us</NavLink></li>
                {/* <li> <NavLink to="/admin">Admin</NavLink></li> */}
                <li> <NavLink to="/review">Reviews</NavLink></li>
                {localStorage.getItem("login") ?

                  <li className="dropdown"><a href="#"><span>{localStorage.getItem("name")}</span> <i className="ms-2 bi bi-chevron-down toggle-dropdown"></i></a>
                    <ul>
                      <li><Link to="/profile?option=Profile">Profile</Link></li>
                      {localStorage.getItem("role")!=="Buyer"?<li><Link to="/admin">Admin Dashboard</Link></li>:null}
                      <li><Link to="/profile?option=Wishlist">Wishlist</Link></li>
                      <li><Link to="/profile?option=Orders">Order</Link></li>
                      <li><Link to="/profile?option=Address">Address</Link></li>
                      <li><Link to="/cart">Cart</Link></li>
                      <li><Link to="/checkout">Checkout</Link></li>
                      
                      <li><button className='btn ms-2' onClick={Logout}>Logout</button></li>

                    </ul>
                  </li> : <li> <NavLink to="/login">Login</NavLink></li>
                }


              </ul>
              <i className={`ms-2 mobile-nav-toggle d-xl-none bi ${showmenu ? 'bi-x' : 'bi-list'}`} onClick={() => setShowmenu(!showmenu)}></i>
            </nav>

          </div>

        </div>

      </header>
    </>
  )
}
