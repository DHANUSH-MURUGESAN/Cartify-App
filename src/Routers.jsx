import React from "react";
import { Route, Routes } from "react-router";
import Layout from "./Layout";
import Home from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Login from "./pages/Login/Login";
import PrivateRouter from "./PrivateRouter/PrivateRouter";
import UpdateProfile from "./pages/Dashboard/UpdateProfile";
import AdminDashboard from "./pages/Dashboard/AdminDashboard";
import { CartProvider } from "./contexts/CartContext";
import Cart from "./pages/Cart/Cart";
import Checkout from "./pages/Cart/Checkout";
import Orders from "./pages/Orders/Orders";
import MenuPage from "./pages/Menu/All";
import Services from "./pages/Services/Services";
import Aboutus from "./pages/Aboutus/Aboutus";
import AdminRoutes from "./AdminRoutes";
import MenuItemDetail from "./pages/Menu/MenuItemDetails";
import Wishlist from "./pages/Wishlist/Wishlist";
import Faq from "./pages/FAQ/Faq";
import Offers from "./pages/Offers/Offers";

const Routers = () => {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Protected Home */}
          <Route
            index
            element={
              <PrivateRouter>
                <Home />
              </PrivateRouter>
            }
          />

          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          {/* <Route
            path="/menu"
            element={
              <PrivateRouter>
                <All />
              </PrivateRouter>
            }
          /> */}
          <Route
            path="/menu"
            element={
              <PrivateRouter>
                <MenuPage />
              </PrivateRouter>
            }
          />
          <Route path="/menu/:id"
            element={
              <PrivateRouter>
                <MenuItemDetail/>
              </PrivateRouter>
            }
          />
          <Route
            path="/menu/electronics"
            element={
              <PrivateRouter>
                <MenuPage />
              </PrivateRouter>
            }
          />
          <Route
            path="/menu/jewelery"
            element={
              <PrivateRouter>
                <MenuPage />
              </PrivateRouter>
            }
          />
          <Route
            path="/menu/mens-clothing"
            element={
              <PrivateRouter>
                <MenuPage />
              </PrivateRouter>
            }
          />
          <Route
            path="/menu/womens-clothing"
            element={
              <PrivateRouter>
                <MenuPage />
              </PrivateRouter>
            }
          />
          <Route
            path="/services"
            element={
              <PrivateRouter>
                <Services />
              </PrivateRouter>
            }
          />
          <Route
            path="/offers"
            element={
              <PrivateRouter>
                <Offers />
              </PrivateRouter>
            }
          />
          <Route
            path="/aboutus"
            element={
              <PrivateRouter>
                <Aboutus />
              </PrivateRouter>
            }
          />
          <Route
            path="/faq"
            element={
              <PrivateRouter>
                <Faq />
              </PrivateRouter>
            }
          />
          <Route
            path="/cart"
            element={
              <PrivateRouter>
                <Cart />
              </PrivateRouter>
            }
          />
          <Route
            path="/checkout"
            element={
              <PrivateRouter>
                <Checkout />
              </PrivateRouter>
            }
          />
          <Route
            path="/orders"
            element={
              <PrivateRouter>
                <Orders />
              </PrivateRouter>
            }
          />
          <Route
            path="/wishlist"
            element={
              <PrivateRouter>
                <Wishlist />
              </PrivateRouter>
            }
          />
          <Route
            path="/update-profile"
            element={
              <PrivateRouter>
                <UpdateProfile />
              </PrivateRouter>
            }
          />
          {/* <Route
            path="/admin-dashboard"
            element={
              <PrivateRouter>
                <AdminDashboard />
              </PrivateRouter>
            }
          /> */}
          <Route
            path="/admin-dashboard"
            element={
              <PrivateRouter>
                <AdminRoutes>
                  <AdminDashboard />
                </AdminRoutes>
              </PrivateRouter>
            }
          />
        </Route>
      </Routes>
    </CartProvider>
  );
};
//   return (
//     <Routes>
//       <Route path="/" element={<Layout/>}>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/signup' element={<Signup/>}/>
//         <Route path='/login' element={<Login/>}/>
//         <Route path='/menu' element={<All/>}/>
//       </Route>
//     </Routes>
//   )
// }

export default Routers;
