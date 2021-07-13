import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";
import clsx from "clsx";
import "../style/category.css";
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
const data = [
  { label: "January", sales: 21, leads: 41 },
  { label: "February", sales: 35, leads: 79 },
  { label: "March", sales: 75, leads: 57 },
  { label: "April", sales: 51, leads: 47 },
  { label: "May", sales: 41, leads: 63 },
  { label: "June", sales: 47, leads: 71 },
];

export default function Chart() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
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
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar className="main-nav w-100">
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              SoltiMart
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
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
            {["Home", "Users"].map((text, index) => (
              <ListItem button key={text}>
                <ListItemIcon>
                  {index % 2 === 0 ? (
                    <HomeIcon onClick={handleHome} />
                  ) : (
                    <PermIdentityIcon onClick={handleCategory} />
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
      <div className="row">
        <div className="section col-md-6">
          <h4
            className="section-title"
            style={{
              textAlign: "center",
            }}
          >
            Line Chart
          </h4>
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
          </div>
        </div>

        <div className="section col-md-6">
          <h4
            className="section-title"
            style={{
              textAlign: "center",
            }}
          >
            Bar Chart
          </h4>
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
          </div>
        </div>
        <div className="col-sm-12 ">
          <h3
            style={{
              marginLeft: 30,
            }}
          >
            Total number of Sales
          </h3>
        </div>
      </div>
    </>
  );
}
