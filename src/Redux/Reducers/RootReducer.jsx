import { combineReducers } from "@reduxjs/toolkit";
import MaincategoryReducer from "./MaincategoryReducer";
import SubcategoryReducer from "./SubcategoryReducer";
import BrandReducer from "./BrandReducer";
import FaqReducer from "./FaqReducer";
import ProductReducer from "./ProductReducer";
import SettingReducer from "./SettingReducer";
import FeatureReducer from "./FeatureReducer";
import UserReducer from "./UserReducer";
import WishlistReducer from "./WishlistReducer";
import NewsLetterReducer from "./NewsLetterReducer";
import CheckoutReducer from "./CkeckoutReducer";
import ContactUsReducer from "./ContactUsReducer";
import CartReducer from "./CartReducer";
import TestimonialReducer from "./TestimonialReducer";

export default combineReducers({
    MaincategoryStateData: MaincategoryReducer,
    SubcategoryStateData: SubcategoryReducer,
    BrandStateData: BrandReducer,
    FaqStateData: FaqReducer,
    ProductStateData: ProductReducer,
    FeatureStateData: FeatureReducer,
    SettingStateData: SettingReducer,
    UserStateData: UserReducer,
    ContactUsStateData: ContactUsReducer,
    CartStateData: CartReducer,
    TestimonialStateData: TestimonialReducer,
    NewsLetterStateData: NewsLetterReducer,
    WishlistStateData: WishlistReducer,
    CheckoutStateData: CheckoutReducer,


})