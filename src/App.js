import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoginScreen from "./screens/LoginScreen"
import {APP_BASE_URL}  from "./Outsource"
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Homescreen from './screens/Homescreen';
import Catgeory from './screens/Category';
import { Productcontext } from './screens/Productcontext';
import { useState } from 'react';
import { useEffect } from 'react';
import Errorpage from './screens/Errorpage';
import Chart from './screens/Chart';
import Khaltiapp from './screens/Khaltiapp';
import Product from './screens/Product';
function App() {
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    // const interval = setInterval(() => {
      fetchData();
      fetchProd();
    //   });
    //  return () => clearInterval(interval);
},[])
  const fetchData = () => {
    fetch(APP_BASE_URL+"/getdetails", {
      method: "get",
    })
      .then((res) => res.json())
      .then((json) => setUser(json));
  };
  const fetchProd = () => {
    fetch(APP_BASE_URL+"/getproddetails", {
      method: "get",
    })
      .then((res) => res.json())
      .then((json) => setProducts(json));
  };
  return (
    <Router>
      <Switch>
        <Route exact path="/">
         <LoginScreen />
        </Route>
        <Route exact path="/home">
         <Homescreen />
        </Route>
        <Route exact path="/category">
         <Catgeory />
        </Route>
        <Route exact path="/khalti">
            <Khaltiapp />
          </Route>
        <Route exact path="/product">
            <Product />
          </Route>
        {/* <Route exact path="/chart">
         <Chart />
        </Route> */}
        <Route exact path="/*">
          <Errorpage />
          </Route>
          
      </Switch>
  </Router>
  );
}

export default App;
