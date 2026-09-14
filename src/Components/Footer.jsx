import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getSetting } from "../Redux/ActionCreators/SettingActionCreator"
import { creatNewsLetter } from "../Redux/ActionCreators/NewsLetterActionCreator"
// import { getNewsLetter, creatNewsLetter } from "../Redux/ActionCreators/NewsLetterActionCreator"

export default function Footer() {
  let [email, setEmail] = useState("")
  let [massege, setMassege] = useState()


  let SettingStateData = useSelector(state => state.SettingStateData)
  // let NewsLetterStateData = useSelector(state => state.NewsLetterStateData)

  let dispatch = useDispatch()

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
  function postData(e) {
    e.preventDefault()
    if (email == "")
      setMassege("Please Enter a Valid Email")

    else {
      // if (NewsLetterStateData.find(x => x.email?.toLowerCase() === email.toLocaleLowerCase()))
      //   setMassege("This Email Address is Already Registered With US")
      // else {
      // dispatch(creatNewsLetter({ email: email, status: true }))
      // setMassege("Thanks To Subscribe Our News Letter Service")
      // setEmail("")
      // }

      dispatch(creatNewsLetter({ email: email, status: true }))
      setMassege("Thanks To Subscribe Our News Letter Service")
      setEmail("")

    }


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


  // useEffect(() => {
  //   (() => {
  //     dispatch(getNewsLetter())
  //   })()

  // }, [NewsLetterStateData.length])


  return (
    <footer id="footer" className="footer-16 footer position-relative bg-dark">

      <div className="container">

        <div className="footer-main" data-aos="fade-up" data-aos-delay="100">
          <div className="row align-items-start">

            <div className="col-lg-4">
              <div className="brand-section">
                <Link to="/" className="logo d-flex align-items-center mb-2">
                  <span className="sitename text-light">{settingData.siteName}</span>
                </Link>
                <p className=" text-light" >{settingData.siteName} is your trusted online shopping destination, offering quality products at affordable prices. We focus on customer satisfaction, fast delivery, and a smooth, reliable shopping experience for everyone.</p>

                <div className="contact-info mt-2 ">
                  <div className="contact-item">
                    <Link to={settingData.map1} target='_blank'>
                      <i className=" text-light bi bi-geo-alt"></i>
                      <span className='text-light'>{settingData.address}</span>
                    </Link>
                  </div>
                  <div className="contact-item">
                    <Link to={`mailto:${settingData.email}`} target='_blank'>
                      <i className=" text-light bi bi-envelope"></i>
                      <span className='text-light'>{settingData.email}</span>
                    </Link>
                  </div>
                  <div className="contact-item text-light">
                    <Link to={`tel:${settingData.phone}`} target='_blank'>
                      <i className=" text-light bi bi-telephone"></i>
                      <span className='text-light'>{settingData.phone}</span>
                    </Link>
                  </div>
                  <div className="contact-item text-light">
                    <Link to={`https://wa.me/${settingData.whatsapp}`} target='_blank'>
                      <i className=" text-light bi bi-whatsapp"></i>
                      <span className='text-light'>{settingData.whatsapp}</span>
                    </Link>
                  </div>

                </div>
              </div>
            </div>

            <div className="col-lg-8">
              <div className="footer-nav-wrapper">
                <div className="row">
                  {/* mobile screen prr single aajyga  */}
                  <div className="col-md-3 col-12">
                    <div className="nav-column">
                      <h6 className='text-light'>Quick Links</h6>
                      <nav className="footer-nav">
                        <Link to="/" className='text-light'>Home</Link>
                        <Link to="/about" className='text-light' >About Us</Link>
                        <Link to="/shop" className='text-light'>Shop</Link>
                        <Link to="/feature" className='text-light'>Features</Link>
                        <Link to="/faq" className='text-light'>Faq</Link>
                      </nav>
                    </div>
                  </div>

                  <div className="col-md-3 col-12 ">
                    <div className="nav-column">
                      <h6 className='text-light'>Impotant Link</h6>
                      <nav className="footer-nav">
                        <Link to="/review" className='text-light'>Reviews</Link>
                        <Link to="/contactus" className='text-light'>Contact Us</Link>
                        <Link to="/privacypolicy" className='text-light'>Privacy-Policy</Link>
                        <Link to="/tc" className='text-light'>Term and Condition</Link>

                      </nav>
                    </div>
                  </div>

                  <div className="col-md-6 col-12 ">
                    <div className="nav-column">
                      <h6 className='text-light'>Subscribe Our Newsletter Service</h6>
                      <p className='text-light my-3'>Stay updated with the latest offers, new arrivals, and exclusive deals from {settingData.siteName}. Subscribe to our newsletter and never miss exciting discounts, shopping tips, and special promotions delivered straight to your inbox.</p>
                      <div>
                        <form onSubmit={postData}>
                          <div className="btn-group w-100">
                            <input type="email" name="email" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter Your Email Address' className='form-control rounded-0 rounded-start ' />
                            <button type='submit' className='btn btn-dark border'>Subscribe</button>
                          </div>
                        </form>
                        {massege ? <p className='text-light fs-5'>{massege}</p> : null}
                      </div>
                      <div className='mt-3'>
                        <div className="social-links  d-md-flex align-items-center">
                          <Link to={settingData.twitter} target='_blank' className="text-light me-3"><i className="ms-2 bi bi-twitter-x"></i></Link>
                          <Link to={settingData.facebook} target='_blank' className="text-light me-3"><i className="ms-2 bi bi-facebook"></i></Link>
                          <Link to={settingData.instagram} target='_blank' className="text-light me-3"><i className="ms-2 bi bi-instagram"></i></Link>
                          <Link to={settingData.linkdin} target='_blank' className="text-light me-3"><i className="ms-2 bi bi-linkedin"></i></Link>
                          <Link to={settingData.youtube} target='_blank' className="text-light me-3"><i className="ms-2 bi bi-youtube"></i></Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

      <div className="footer-bottom " style={{ marginTop: -100 }}>
        <div className="container">
          <div className="bottom-content" data-aos="fade-up" data-aos-delay="300">
            <div className="row align-items-center">

              <div className="col-lg-6">
                <div className="copyright ">
                  <p className='text-light'>© <span className="sitename text-light">{settingData.siteName}</span>. All rights reserved.</p>
                </div>
              </div>

              <div className="col-lg-6">
                <div className="legal-links">
                  <Link to="/" className='text-light'>Home</Link>
                  <Link to="/about" className='text-light'>About</Link>
                  <Link to="/shop" className='text-light'>Shop</Link>
                  <Link to="/feature" className='text-light'>Feature</Link>
                  <Link to="contactus" className='text-light'>Contact Us</Link>


                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

    </footer>

  )
}
