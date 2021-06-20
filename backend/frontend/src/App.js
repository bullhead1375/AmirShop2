import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Footer from "./components/Footer";
import {Container} from "react-bootstrap";
import HomeScreen from "./screens/HomeScreen";
import {BrowserRouter as Router,Route} from 'react-router-dom'
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceorderScreen from "./screens/PlaceorderScreen";
import OrderScreen from "./screens/OrderScreen";

function App() {
  return (
    <Router>
      <Header />
        <main>
            <Container className='py-5'>
                <Route path={'/'} component={HomeScreen} exact />
                <Route path={'/product/:id'} component={ProductScreen}  />
                <Route path={'/cart/:id?'} component={CartScreen}  />
                <Route path={'/login'} component={LoginScreen}  />
                <Route path={'/register'} component={RegisterScreen}  />
                <Route path={'/profile'} component={ProfileScreen}  />
                <Route path={'/shipping'} component={ShippingScreen}  />
                <Route path={'/payment'} component={PaymentScreen}  />
                <Route path={'/placeorder'} component={PlaceorderScreen}  />
                <Route path={'/order/:id'} component={OrderScreen}  />
            </Container>
        </main>
      <Footer />
    </Router>
  );
}

export default App;
