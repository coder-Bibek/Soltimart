// import necessary libarries
import React from "react";
import "../style/category.css";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Usersdata from "./Usersdata";
import { useEffect } from "react";
import { useState } from "react";
import { APP_BASE_URL } from "../Outsource";
import Navbar from "./Navbar";
const drawerWidth = 240;

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
// exporting defult function
export default function Catgeory() {
  const [user, setUser] = useState([]);
  useEffect(() => {
    fetchData();
    Usersession();
  }, []);
  const Usersession = () => {
    const token = localStorage.getItem("token");
    if (token === null) {
      console.log("login first");
      window.location.href = "/";
    } else {
    }
  };
  const [open, setOpen] = React.useState(false);
  const fetchData = () => {
    fetch(APP_BASE_URL + "/getdetails", {
      method: "get",
    })
      .then((res) => res.json())
      .then((json) => setUser(json));
  };
  const fetchsecondData = () => {
    fetch(APP_BASE_URL + "/getseconddetails", {
      method: "get",
    })
      .then((res) => res.json())
      .then((json) => setUser(json));
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleHome = () => {
    window.location.href = "/home";
  };
  const handleCategory = () => {
    window.location.href = "/category";
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <>
      {/* importing navbar */}
      <Navbar />
      <div className="container-fluid  shadow p-3 second-container mb-5 bg-body rounded bg-aqua position-fixed">
        <h3 className="text-center">Users Dashboard</h3>
      </div>
      {user.map((data, i) => (
        <Usersdata
          key={i}
          id={data.user_id}
          name={data.user_name}
          photo={data.user_photourl}
        />
      ))}
      <div className="container mt-5">
        <nav aria-label="Page navigation example">
          <ul className="pagination">
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                id="first-ten"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  fetchData();
                }}
              >
                1
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                style={{
                  cursor: "pointer",
                }}
                onClick={() => {
                  fetchsecondData();
                }}
              >
                2
              </a>
            </li>
            <li className="page-item">
              <a
                className="page-link"
                style={{
                  cursor: "pointer",
                }}
              >
                3
              </a>
            </li>
            <li className="page-item">
              <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
