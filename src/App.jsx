import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './Components/Navbar'
import HomePage from './Pages/HomePage'
import Footer from './Components/Footer'
import AboutPages from './Pages/AboutPages'
import Shoppage from './Pages/Shoppage'
import FeaturePage from './Pages/FeaturePage'
import FaqPage from './Pages/FaqPage'
import ContactUspage from './Pages/ContactUspage'
import ErrorPage from './Pages/ErrorPage'
import PrivacyPolicyPage from './Pages/PrivacyPolicyPage'
import TermsAndConditionPolicyPage from './Pages/TermsAndConditionPolicyPage'
import Reviewspage from './Pages/Reviewspage'
import AdminHomePage from './Pages/Admin/AdminHomePage'
import AdminMaincategoryPage from './Pages/Admin/Maincategory/AdminMaincategoryPage'
import AdminCreateMaincategorypage from './Pages/Admin/Maincategory/AdminCreateMaincategorypage'
import AdminUpdateMaincategorypage from './Pages/Admin/Maincategory/AdminUpdateMaincategorypage'
import AdminSubcategoryPage from './Pages/Admin/Subcategory/AdminSubcategory'
import AdminCreateSubcategorypage from './Pages/Admin/Subcategory/AdminCreateSubcategory'
import AdminUpdateSubcategorypage from './Pages/Admin/Subcategory/AdminUpdateSubcategory'
import AdminBrandPage from './Pages/Admin/Brand/AdminBrandPage'
import AdminCreateBrandpage from './Pages/Admin/Brand/AdminCreateBrandPage'
import AdminUpdateBrandpage from './Pages/Admin/Brand/AdminUpdateBrandPage'
import AdminFeaturePage from './Pages/Admin/Feature/AdminFeaturePage'
import AdminCreateFeaturepage from './Pages/Admin/Feature/AdminCreateFeaturepage'
import AdminUpdateFeaturepage from './Pages/Admin/Feature/AdminUpdateFeaturepage'
import AdminFaqPage from './Pages/Admin/FAQ/AdminFaqPage'
import AdminCreateFaqpage from './Pages/Admin/FAQ/AdminCreateFaqpage'
import AdminUpdateFaqpage from './Pages/Admin/FAQ/AdminUpdateFaqpage'
import AdminSettingPage from './Pages/Admin/Setting/AdminSettingPage'
import AdminProductPage from './Pages/Admin/Product/AdminProductPage'
import AdminCreateProductpage from './Pages/Admin/Product/AdminCreateProductpage'
import AdminUpdateProductpage from './Pages/Admin/Product/AdminUpdateProductpage'
import Product from './Pages/Product'
import SignupPage from './Pages/User/SignupPage'
import LoginPage from './Pages/User/LoginPage'
import ProfilePage from './Pages/User/ProfilePage'
import CartPage from './Pages/User/CartPage'
import OrderConfirmation from './Pages/User/OrderConfirmation'
import CheckoutPage from './Pages/User/CheckoutPage'
import AdminNewsletter from './Pages/Admin/Newsletter/AdminNwesletterPage'
import AdminContactUsPage from './Pages/Admin/ContactUs/AdminContactUsPage'
import AdminContactUsShowPage from './Pages/Admin/ContactUs/AdminContactUsShowPage'


import AdminCheckoutPage from './Pages/Admin/Checkout/AdminCheckoutPage'
import AdminCheckOutShowPage from './Pages/Admin/Checkout/AdminCheckoutShowPage'
import AdminUserPage from './Pages/Admin/User/AdminUserPage'
import AdminCreateUserpage from './Pages/Admin/User/AdminCreateUserPage'
import AdminUpdateUserpage from './Pages/Admin/User/AdminUpdateUserPage'
import ForgetPasswordPage from './Pages/User/ForgetPasswordPage1'
import ForgetPasswordPage1 from './Pages/User/ForgetPasswordPage1'
import ForgetPasswordPage2 from './Pages/User/ForgetPasswordPage2'
import ForgetPasswordPage3 from './Pages/User/ForgetPasswordPage3'
import Payment from './Pages/User/Payment'





export default function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='' element={<HomePage />} />
          <Route path='/about' element={<AboutPages />} />
          <Route path='/shop' element={<Shoppage />} />
          <Route path='/product/:_id' element={<Product />} />
          <Route path='/feature' element={<FeaturePage />} />
          <Route path='/faq' element={<FaqPage />} />
          <Route path='/testimonial' element={<Reviewspage />} />
          <Route path='/contactus' element={<ContactUspage />} />
          <Route path='/privacypolicy' element={<PrivacyPolicyPage />} />
          <Route path='/tc' element={<TermsAndConditionPolicyPage />} />


          {/* Admin Routes */}
          {
            localStorage.getItem("login") && localStorage.getItem("role") !== "Buyer" ?
              <>
                <Route path='/admin' element={<AdminHomePage />} />
                <Route path='/admin/maincategory' element={<AdminMaincategoryPage />} />
                <Route path='/admin/maincategory/create' element={<AdminCreateMaincategorypage />} />
                <Route path='/admin/maincategory/update/:_id' element={<AdminUpdateMaincategorypage />} />


                <Route path='/admin/subcategory' element={<AdminSubcategoryPage />} />
                <Route path='/admin/subcategory/create' element={<AdminCreateSubcategorypage />} />
                <Route path='/admin/subcategory/update/:_id' element={<AdminUpdateSubcategorypage />} />



                <Route path='/admin/brand' element={<AdminBrandPage />} />
                <Route path='/admin/brand/create' element={<AdminCreateBrandpage />} />
                <Route path='/admin/brand/update/:_id' element={<AdminUpdateBrandpage />} />

                <Route path='/admin/feature' element={<AdminFeaturePage />} />
                <Route path='/admin/feature/create' element={<AdminCreateFeaturepage />} />
                <Route path='/admin/feature/update/:_id' element={<AdminUpdateFeaturepage />} />

                <Route path='/admin/faq' element={<AdminFaqPage />} />
                <Route path='/admin/faq/create' element={<AdminCreateFaqpage />} />
                <Route path='/admin/faq/update/:_id' element={<AdminUpdateFaqpage />} />

                <Route path='/admin/setting' element={<AdminSettingPage />} />

                <Route path='/admin/product' element={<AdminProductPage />} />
                <Route path='/admin/product/create' element={<AdminCreateProductpage />} />
                <Route path='/admin/product/update/:_id' element={<AdminUpdateProductpage />} />
                <Route path='/admin/newsletter' element={<AdminNewsletter />} />
                <Route path='/admin/contactus' element={<AdminContactUsPage />} />
                <Route path='/admin/contactus/show/:_id' element={<AdminContactUsShowPage />} />
                <Route path='/admin/checkout' element={<AdminCheckoutPage />} />

                <Route path='/admin/checkout/show/:_id' element={<AdminCheckOutShowPage />} />


                {localStorage.getItem("role") === "Super Admin" ?
                  <>
                    <Route path='/admin/user' element={<AdminUserPage />} />
                    <Route path='/admin/user/create' element={<AdminCreateUserpage />} />
                    <Route path='/admin/user/update/:_id' element={<AdminUpdateUserpage />} />

                  </> : null}
              </> : null
          }





          {/* USER ROUTES */}
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/forget-password-1' element={<ForgetPasswordPage1 />} />
          <Route path='/forget-password-2' element={<ForgetPasswordPage2 />} />
          <Route path='/forget-password-3' element={<ForgetPasswordPage3/>} />
          {localStorage.getItem("login") ?
            <>
              <Route path='/profile' element={<ProfilePage />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/order-confirmation' element={<OrderConfirmation />} />
              <Route path='/checkout' element={<CheckoutPage />} />
              <Route path='/payment/:_id' element={<Payment/>} />
            </> : null
          }




          <Route path='/*' element={<ErrorPage />} />



        </Routes>
        <Footer />

      </BrowserRouter>

    </>
  )
}

