import Vue from 'vue'

import NavBar from "~/components/Navigation/NavBar"
import NavBarMobile from "~/components/Navigation/NavBarMobile"
import SideBarShop from "~/components/Navigation/SideBarShop"
import SideBarInbox from "~/components/Navigation/SideBarInbox"
import Footer from "~/components/Navigation/Footer"

import ModalLogin from "~/components/UI/ModalLogin"
import ItemCardHome from "~/components/UI/Card/ItemCardHome"
import ItemCardShop from "~/components/UI/Card/ItemCardShop"
import ShopCardHome from "~/components/UI/Card/ShopCardHome"
import ImageUploader from "~/components/UI/ImageUploader"
import LogoUploader from "~/components/UI/LogoUploader"
import AvatarUploader from "~/components/UI/AvatarUploader"
import ItemTypes from "~/components/UI/ItemTypes"
import Loading from "~/components/UI/Loading"

import ButtonSaveItem from "~/components/UI/ButtonSaveItem"
import ButtonSaveShop from "~/components/UI/ButtonSaveShop"
import ButtonSale from "~/components/UI/ButtonSale"
import ButtonSaleCard from "~/components/UI/ButtonSaleCard"
import ButtonSwitch from "~/components/UI/ButtonSwitch"

import SliderHomePanel from "~/components/UI/SliderHomePanel"
import SliderHomeShop from "~/components/UI/SliderHomeShop"
import SliderShopPanel from "~/components/UI/SliderShopPanel"
import SliderItemImage from "~/components/UI/SliderItemImage"


Vue.component('app-navbar', NavBar)
Vue.component('app-navbar-mobile', NavBarMobile)
Vue.component('app-sidebar-shop', SideBarShop)
Vue.component('app-sidebar-inbox', SideBarInbox)
Vue.component('app-footer', Footer)
Vue.component('app-img-uploader', ImageUploader)
Vue.component('app-logo-uploader', LogoUploader)
Vue.component('app-avatar-uploader', AvatarUploader)
Vue.component('app-item-types', ItemTypes)
Vue.component('app-loading', Loading)

Vue.component('app-modal-login', ModalLogin)
Vue.component('app-item-card-home', ItemCardHome)
Vue.component('app-item-card-shop', ItemCardShop)
Vue.component('app-shop-card-home', ShopCardHome)

Vue.component('app-btn-sale', ButtonSale)
Vue.component('app-btn-salecard', ButtonSaleCard)
Vue.component('app-btn-saveshop', ButtonSaveShop)
Vue.component('app-btn-saveitem', ButtonSaveItem)
Vue.component('app-btn-switch', ButtonSwitch)

Vue.component('app-slider-homepanel', SliderHomePanel)
Vue.component('app-slider-homeshop', SliderHomeShop)
Vue.component('app-slider-shoppanel', SliderShopPanel)
Vue.component('app-slider-item', SliderItemImage)