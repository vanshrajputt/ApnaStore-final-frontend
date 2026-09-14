import { all } from "redux-saga/effects";
import MaincategorySagas from "./MainCategorySagas";
import SubcategorySagas from "./SubCategorySagas";
import BrandSagas from "./BrandSagas";
import FaqSagas from "./FaqSagas";
import FeatureSagas from "./FeatureSagas";
import SettingSagas from "./SettingSagas";
import UserSagas from "./UserSagas";
import CartSagas from "./CartSagas";
import WishlistSagas from "./WishlistSagas";
import TestimonialSagas from "./TestimonialSagas";
import ContactUsSagas from "./ContactUsSagas";
import NewsLetterSagas from "./NewsLetterSagas";
import CheckoutSagas from "./CheckoutSagas";
import ProductSagas from "./ProductSagas";





export default function* RootSaga() {
    yield all([
        MaincategorySagas(),
        SubcategorySagas(),
        BrandSagas(),
        FaqSagas(),
        ProductSagas(),
        FeatureSagas(),
        SettingSagas(),
        UserSagas(),
        CartSagas(),
        CheckoutSagas(),
        WishlistSagas(),
        ContactUsSagas(),
        NewsLetterSagas(),
        TestimonialSagas(),


    ])

}