import {  GLAV_ROUTE,SHOP_ROUTE,SHOPITEM_ROUTE,SHOPFAQ_ROUTE,SHOPAbout_ROUTE,SHOPOrder_Complete_ROUTE,SHOPShop_cart_ROUTE,SHOPShop_checkout_ROUTE } from "./utils/consts";
import GlavPages from "./pages/GlavPages";
import Shop from "./pages/Shop";
import Shop_item from "./pages/Shop_item";
import Shop_checkout from "./pages/Shop_checkout";
import Shop_cart from "./pages/Shop_cart";

import Order_Complete from "./pages/Order_Complete";
import About from "./pages/About";
import FAQ from "./pages/FAQ";


export const adminRoutes = [


]

export const publicRoutes = [
    {
        path: GLAV_ROUTE,
        Component: GlavPages
    },
    {
        path: SHOP_ROUTE ,
        Component: Shop
    },
    {
        path: SHOPITEM_ROUTE + '/:id',
        Component: Shop_item
    },
    {
        path: SHOPShop_checkout_ROUTE,
        Component: Shop_checkout
    },
    {
        path: SHOPShop_cart_ROUTE,
        Component: Shop_cart
    },



    {
        path: SHOPOrder_Complete_ROUTE,
        Component: Order_Complete
    },

    {
        path: SHOPFAQ_ROUTE,
        Component: FAQ
    },

    {
        path: SHOPAbout_ROUTE,
        Component: About
    },
 
]