// importing packages
var express = require("express");
var app = express();
var sql = require("mysql");
var cors = require("cors");
var passwordHash = require("password-hash");
var session = require("express-session");
var config = require("./config");
var jwt = require("jsonwebtoken");
var cookieparser = require("cookie-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieparser());
// cfreating connection
var connection = sql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "soltimart",
});
// using session
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("connected");
  }
});
// getting method
app.get("/getdetails", cors(), (req, res) => {
  connection.query(
    "select * from user_details where activeFlag = 0 LIMIT 0,10",
    (err, rows, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});
app.get("/getelectro", (req, res) => {
  connection.query(
    "select * from seller_product where pd_category = 'Electronics' and status = 0 and counter = 0 ",
    (err, result) => {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("noelectro");
      }
    }
  );
});
app.get("/soltimart/cart", (req, res) => {
  connection.query(
    "select c.product_id,c.user_id,sp.photo_url,sp.pd_name,sp.pd_brand,c.quantity from soltimart_cart c join seller_product sp on c.product_id = sp.productid  where c.status = 1",
    (err, result) => {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("valueless");
      }
    }
  );
});
app.get("/getfurn", (req, res) => {
  connection.query(
    "select * from seller_product where pd_category = 'Furnitures' and status = 0 and counter = 0 ",
    (err, result) => {
      if (result.length > 0) {
        res.send(result);
      } else {
        res.send("noelectro");
      }
    }
  );
});
app.get("/getseconddetails", cors(), (req, res) => {
  connection.query(
    "select * from user_details where activeFlag = 1 LIMIT 10,20",
    (err, rows, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
      }
    }
  );
});
app.get("/getproddetails", cors(), (req, res) => {
  connection.query(
    "select * from seller_product where counter = 0 and status = 0",
    (err, rows, results) => {
      if (err) {
        console.log(err);
      } else {
        res.send(rows);
        console.log(rows);
      }
    }
  );
});
// posting method
app.post("/postadmin", cors(), (req, res) => {
  connection.query(
    "select * from admin_details where email = '" +
      req.body.email +
      "' and password = '" +
      req.body.password +
      "'",
    (err, results) => {
      if (results.length == 1) {
        const id = results[0].id;
        const token = jwt.sign({ id }, config.secret, {
          expiresIn: config.expires,
        });
        res.status(200).send({ token, id });
      } else {
        res.status(400).send("invalid");
      }
    }
  );
});
app.post("/getsearch", cors(), (req, res) => {
  connection.query(
    "select * from seller_product where pd_name = '" +
      req.body.content +
      "' and status = 0 and counter = 0",
    (err, results) => {
      if (results.length > 0) {
        res.send(results);
      } else {
        res.send("fail");
      }
    }
  );
});
app.post("/deleteUser", cors(), (req, res) => {
  connection.query(
    "UPDATE user_details SET activeFlag = 1 WHERE user_id = " +
      req.body.id +
      " ",
    (err) => {
      if (!err) {
        res.send("success");
      } else {
        res.send("failure");
      }
    }
  );
});
app.post("/hideproduct", (req, res) => {
  connection.query(
    "update seller_product SET counter = 1,status = 1 where productid = " +
      req.body.id +
      "",
    (err) => {
      if (err) {
        res.send("fail");
      }
    }
  );
});
app.post("/khaltipay", (req, res) => {
  let sql = "INSERT INTO khaltipay SET ?";
  let post = {
    khalti_id: "",
    status: req.body.status,
  };
  connection.query(sql, post, (err) => {
    if (err) {
      res.send("fail");
    } else {
      res.send("success");
    }
  });
});
// lsitening to server
app.listen(4000, console.log("started"));