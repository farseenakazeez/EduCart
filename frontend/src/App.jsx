import  "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomeScreen from "./screens/HomeScreen"
import { Container } from "react-bootstrap";
import './assets/styles/bootstrap.custom.css';
import { Route, Routes } from "react-router-dom";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RegisterScreen from "./screens/RegisterScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PrivateRoutes from "./components/PrivateRoutes";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";


function App() {
 
  return (
    <>
       <Header />
          <main className="py-3">
            <Container>
             <Routes>
              <Route path = "/" element={<HomeScreen/>}></Route>
              <Route path = "product/:id" element={<ProductScreen />}></Route>
              <Route path = "/cart" element={<CartScreen/>}></Route>
              <Route path ="/login" element={<LoginScreen/>}></Route>
              <Route path ="/register" element={<RegisterScreen/>}></Route>
              <Route path ="" element={<PrivateRoutes/>}>

               <Route path="/shipping" element={<ShippingScreen/>}></Route>
                <Route path="/payment" element={<PaymentScreen/>}></Route>
                 <Route path ="/placeorder" element={<PlaceOrderScreen/>}></Route>
                 <Route path ="/order/:id" element={<OrderScreen/>}></Route>
              
              </Route>
             
       
             
             </Routes>

            </Container>
          </main>
  
         

          <Footer />
       
       {/*<ToastContainer/>*/}
    </>
  )
}

export default App
