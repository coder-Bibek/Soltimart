// import necessary packages
import React, { useState, useEffect, useContext } from "react";
import "../style/Homescreen.css";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import HomeIcon from "@material-ui/icons/Home";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import CategoryIcon from "@material-ui/icons/Category";
import HistoryIcon from "@material-ui/icons/History";
import axios from "axios";
import { APP_BASE_URL } from "../Outsource";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Link } from "react-router-dom";
import Transactiondata from "./Transactiondata";
const drawerWidth = 240;
// setting themes for components
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));
// calling main function
export default function Homescreen() {
  const [user, setUser] = useState([]);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  let lead = parseInt (cart.length)-parseInt(products.length)
  const data = [
    { label: "January", sales: 30, leads: 42  },
    { label: "February", sales: 35, leads: 79 },
    { label: "March", sales: 75, leads: 57 },
    { label: "April", sales: 51, leads: 47 },
    { label: "May", sales: cart.length, leads: lead },
    { label: "June", sales: 47, leads: 71 },
  ];
  let isMounted = true;
  // usefecct function
  useEffect(() => {
    if (isMounted) {
      Usersession();
      fetchProd();
      countUser();
      fecthCart();
    }

    return () => {
      isMounted = false;
    };
  }, []);
  // const products = useContext(Productcontext);
  // fetching products
  const fetchProd = () => {
    fetch(APP_BASE_URL + "/getproddetails", {
      method: "get",
    })
      .then((res) => res.json())
      .then((json) => setProducts(json));
  };
  const Usersession = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      console.log("login first");
      window.location.href = "/";
    } else {
    }
  };
  // counting user
  const countUser = async () => {
    const response = await axios.get(APP_BASE_URL + "/getdetails");
    const data = response.data;
    setUser(data);
  };
  //getting all data from cart
  const fecthCart = async () => {
    const response = await axios.get(APP_BASE_URL + "/soltimart/cart");
    if (response.data == "valueless") {
      setCart([]);
    } else {
      setCart(response.data);
    }
  };
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleHome = () => {
    window.location.href = "/home";
  };
  const handleCatgeory = () => {
    window.location.href = "/category";
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };
  const logoutUser = async () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };
  return (
    // returning main statements
    <>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className="main-nav">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              noWrap
              className="w-100 d-flex justify-content-between align-items-center"
            >
              SoltiMart
              <a
                onClick={() => {
                  logoutUser();
                }}
              >
                <i
                  className="fa fa-sign-out m-3"
                  style={{
                    fontSize: 30,
                  }}
                  aria-hidden="true"
                ></i>
              </a>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="temporary"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            {["Home", "Users", "Products"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index == 0 ? (
                    <HomeIcon onClick={handleHome} />
                  ) : index == 1 ? (
                    <PermIdentityIcon onClick={handleCatgeory} />
                  ) : index == 2 ? (
                    <CategoryIcon
                      onClick={() => {
                        window.location.href = "/product";
                      }}
                    />
                  ) : (
                    <></>
                  )}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}
        >
          <div className={classes.drawerHeader} />
        </main>
      </div>
      <div className="container-fluid mb-5">
        <div className="container w-100">
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <div
                className="card shadow p-3 mb-2 bg-primary"
                style={{
                  height: "120px",
                }}
              >
                <Link to="/category">
                  <div className="card-body main-cardbody">
                    <h4
                      className="card-text text-center"
                      style={{
                        color: "white",
                        marginTop: "-20px",
                      }}
                    >
                      Total No. of Users
                    </h4>
                    <h4
                      className="text-center"
                      style={{
                        color: "white",
                      }}
                    >
                      {user.length}
                    </h4>
                  </div>
                </Link>
              </div>
            </div>
            <div className="col-sm-12 col-md-4">
              <div
                className="card shadow p-3 mb-2"
                style={{
                  height: "120px",
                  backgroundColor: "purple",
                }}
              >
                <div
                  className="card-body main-cardbody"
                  style={{
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    window.location.href = "/product";
                  }}
                >
                  <h4
                    className="card-text text-center"
                    style={{
                      color: "white",
                      marginTop: "-20px",
                    }}
                  >
                    Total No. of Products
                  </h4>
                  <h4
                    className="text-center"
                    style={{
                      color: "white",
                    }}
                  >
                    {products.length}
                  </h4>
                </div>
              </div>
            </div>
            <div className="col-sm-12 col-md-4">
              <div
                className="card shadow p-3 mb-2"
                style={{
                  height: "120px",
                  backgroundColor: "orange",
                }}
              >
                <div className="card-body main-cardbody">
                  <h4
                    className="card-text text-center"
                    style={{
                      color: "white",
                      marginTop: "-20px",
                    }}
                  >
                    Total No. of Sales
                  </h4>
                  <h4
                    className="text-center"
                    style={{
                      color: "white",
                    }}
                  >
                    6
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="row mb-3"
          style={{
            border: "1px solid black",
            margin: 10,
          }}
        >
          <div className="section col-md-6 mt-4">
            <div className="section-content">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={data}
                  margin={{ top: 15, right: 10, bottom: 15, left: 0 }}
                >
                  <XAxis dataKey="label" />
                  <YAxis />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="sales" fill="#FB8833" />
                  <Bar dataKey="leads" fill="#17A8F5" />
                </BarChart>
              </ResponsiveContainer>
              <h5 className="text-center">Total Sales (Barchart)</h5>
            </div>
          </div>
          <div className="section col-md-6 mt-4">
            <div className="section-content">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart
                  data={data}
                  margin={{ top: 15, right: 0, bottom: 15, left: 20 }}
                >
                  <Tooltip />
                  <XAxis dataKey="label" />
                  <YAxis />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <Legend />
                  <Line type="monotone" dataKey="sales" stroke="#FB8833" />
                  <Line type="monotone" dataKey="leads" stroke="#17A8F5" />
                </LineChart>
              </ResponsiveContainer>
              <h5 className="text-center">Total Sales (Line-chart)</h5>
            </div>
          </div>
        </div>
      </div>
      <div className="card p-3 mt-3 mx-2 border-1">
        <h3 className="form-label mx-2">Transaction Details</h3>
        <div className="row border-bottom-0">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th scope="col">productid</th>
                  <th scope="col">userid</th>
                  <th scope="col">Image</th>
                  <th scope="col">product name</th>
                  <th scope="col">product brand</th>
                  <th scope="col">Quantity</th>
                </tr>
              </thead>
              {cart.map((data, i) => (
                <Transactiondata
                  key={i}
                  user_id={data.user_id}
                  product_id={data.product_id}
                  photo_url={data.photo_url}
                  pd_name={data.pd_name}
                  pd_brand={data.pd_brand}
                  quantity={data.quantity}
                />
              ))}
            </table>
          </div>
        </div>
      </div>
      {/* <Mainbody user={user.length} products={products.length} /> */}
    </>
  );
}
