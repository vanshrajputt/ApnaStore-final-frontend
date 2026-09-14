import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFeature } from "../Redux/ActionCreators/FeatureActionCreator"

export default function Features() {
  let FeatureStateData = useSelector(state => state.FeatureStateData)
        let dispatch = useDispatch()
       
        useEffect(() => {
          (() => {
            dispatch(getFeature())
            
          })()
      
      
        }, [FeatureStateData.length])
  return (
   <>
     <section id="featured-departments" className="featured-departments section">

      <div className="container" data-aos="fade-up" data-aos-delay="100">

        <div className="row g-5">
          {
            FeatureStateData.filter(x=>x.status).map((item)=>{
               return  <div className="col-lg-4" data-aos="fade-up" data-aos-delay="100" key={item._id}>
            <div className="department-highlight">
              <div className="highlight-icon">
                <span dangerouslySetInnerHTML={{__html:item.icon}}></span>
              </div>
              <h4>{item.name}</h4>
              <p>{item.shortDescription}</p>
              
            </div>
          </div>
            })
          }

    

        </div>

      
      </div>

    </section>
   </>
  )
}

