import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSetting } from "../Redux/ActionCreators/SettingActionCreator"

export default function About() {
   let SettingStateData = useSelector(state => state.SettingStateData)
      let dispatch = useDispatch()
      let [settingData, setSettingData] = useState({
        siteName: import.meta.env.VITE_APP_SITE_NAME,
        
      })
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
   <section id="home-about" className="home-about section">

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row align-items-center">
          <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right" data-aos-delay="200">
            <div className="about-content">
              <h2 className="section-heading">About {settingData.siteName}</h2>
              <p className="lead-text text-justify">{settingData.siteName} is a modern and customer-focused e-commerce platform built to simplify the way people shop online. Our mission is to provide a seamless shopping experience where users can explore a wide range of high-quality products at competitive prices. From fashion and accessories to daily essentials, {settingData.siteName} ensures that every item meets quality standards and customer expectations. We focus on user-friendly design, secure payment options, and fast delivery services, 
                making online shopping easy and reliable. With a strong commitment to customer satisfaction, {settingData.siteName} continues to grow as a trusted destination for smart and convenient shopping.</p>

              <p className='text-justify'>At {settingData.siteName}, we believe that shopping should be more than just buying products—it should be an enjoyable and hassle-free experience. Our platform is designed using the latest technologies to ensure smooth navigation, quick loading times, and secure transactions. We continuously update our product collection to bring you the latest trends and best deals. Customer trust is at the heart of everything we do, which is why we offer reliable support and transparent policies. 
                Whether you are shopping for everyday needs or special occasions, {settingData.siteName} is dedicated to delivering value, quality, and convenience right to your doorstep, making it your go-to online shopping partner..</p>

              

              
            </div>
          </div>

          <div className="col-lg-6" data-aos="fade-left" data-aos-delay="300">
            <div className="about-visual">
              <div className="main-image">
                {/* <img src="public/assets/Images/banner11.jpg" alt="Modern medical facility" className="img-fluid"/> */}
                <img src="public/assets/Images/pexels-abdullahg-13598511.jpg" alt="Modern medical facility" className="img-fluid mb-3"/>
                <img src="public/assets/Images/imagebanner.webp" alt="Modern medical facility" className="img-fluid"/>
              </div>
              <div className="floating-card">
                <div className="card-content">
                  <div className="icon">
                    <i className="bi bi-headphones"></i>
                  </div>
                  <div className="card-text">
                    <h4>24/7 Customer Care</h4>
                    <p>Always here when you need us most</p>
                  </div>
                </div>
              </div>
              <div className="experience-badge">
                <div className="badge-content">
                  <span className="years">100+</span>
                  <span className="text">Top Brands</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

    </section>
    </>
  )
}
