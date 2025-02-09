import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { lazy } from "react";
import { SuspenseFeedBack } from "../components/feedback";
import LottieHandler from "../components/feedback/LottieFiles/LottieHandler";

const MainLayouts = lazy(() => import("../layouts/MainLayout"))


const Home = lazy(() => import("../pages/User/Home/Home"))
const CatagoryProduct = lazy(() => import("../pages/User/CatagoryProduct/CatagoryProduct"))
const Cart = lazy(() => import("../pages/User/Cart/Cart"))
const Wishlist = lazy(() => import("../pages/User/Wishlist/Wishlist"))
const ProductPage = lazy(() => import("../pages/User/ProductPage/ProductPage"))
const Order = lazy(() => import("../pages/User/Order/Order"))
const StripeCheckout = lazy(() => import("../pages/User/Checkout/StripeCheckout"))
const OrderDetails = lazy(() => import("../pages/User/OrderDetails/OrderDetails"))



const Login = lazy(() => import("../pages/Auth/Login/Login"))
const Register = lazy(() => import("../pages/Auth/Register/Register"))



const router = createBrowserRouter([
  {
    path: "/",
    errorElement:
      <LottieHandler pageName="Error_404" />
    ,

    element: (
      <SuspenseFeedBack>
        < MainLayouts />
      </SuspenseFeedBack>
    ),
    children: [
      {
        index: true,
        element: < Home />
      },
      {
        path: "catagoryProducts",
        element: <SuspenseFeedBack> < CatagoryProduct />  </SuspenseFeedBack>
      },
      {
        path: "cart",
        element: <SuspenseFeedBack>  < Cart /> </SuspenseFeedBack>
      },
      {
        path: "wishlist",
        element: <SuspenseFeedBack>< Wishlist /> </SuspenseFeedBack>
      },
      {
        path: "productPage",
        element: <SuspenseFeedBack>< ProductPage />  </SuspenseFeedBack>
      },
      {
        path: "login",
        element: <SuspenseFeedBack>< Login /> </SuspenseFeedBack>
      },
      {
        path: "register",
        element: <SuspenseFeedBack>< Register />  </SuspenseFeedBack>
      },
      {
        path: "orders",
        element: <SuspenseFeedBack>< Order />  </SuspenseFeedBack>
      },
      {
        path: "checkout",
        element: <SuspenseFeedBack>< StripeCheckout /></SuspenseFeedBack>
      },
      {
        path: "orderDetails",
        element: <SuspenseFeedBack>< OrderDetails /></SuspenseFeedBack>
      }

    ]
  }
])

const AppRouter = () => {
  return <RouterProvider router={router} />;
};


export default AppRouter;