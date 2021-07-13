import React from "react";
import "../style/Homescreen.css";
import axios from "axios";
import { APP_BASE_URL } from "../Outsource";
import Navbar from "./Navbar";
import { useState } from "react";
import { useEffect } from "react";
// import necessary libraries
// export default function
function Product() {
  // array destructuring
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("Category");
  const [search, setSearch] = useState("");
  const [searchresult, setSearchresult] = useState([]);
  let isMounted = true;
  // useeffect
  useEffect(() => {
    if (isMounted) {
      Usersession();
      fetchProd();
    }

    return () => {
      isMounted = false;
    };
  },[]);
  // fetching prod
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
  // getelctronics
  const getElectro = async () => {
    const response = await axios.get(APP_BASE_URL + "/getelectro");
    const data = (await response).data;
    if (data === "noelectro") {
      console.log("electronics >>>>" + data);
    } else {
      setProducts(data);
    }
  };
  // get furnitures items
  const getFurnitures = async () => {
    const response = await axios.get(APP_BASE_URL + "/getfurn");
    const data = (await response).data;
    if (data === "noelectro") {
      console.log("electronics" + data);
    } else {
      setProducts(data);
    }
  };
  const searchData = () => {
    axios
      .post(APP_BASE_URL + "/getsearch", {
        content: search,
      })
      .then(function (response) {
        if (response.data == "fail") {
          document.getElementById("mainbtn").click();
          setSearchresult([]);
        } else {
          setSearchresult(response.data);
        }
      });
  };
  // hide product
  const hideProduct = (id) => {
    axios
      .post(APP_BASE_URL + "/hideproduct", {
        id: id,
      })
      .then(function (response) {
        if (response.data === "fail") {
          console.log("not deleted");
        }
      });
  };
  return (
    <>
      {/* importing navbar */}
      <Navbar />
      <div className="container-fluid">
        <div className=" container-fluid d-flex justify-content-between">
          <h4>Product Details</h4>
          <div className="w-75 d-flex flex-row align-items-center justify-content-end">
            <div className="dropdown mx-2">
              <a
                class="btn btn-outline-secondary dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {category}
              </a>

              <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <li>
                  <a
                    class="dropdown-item"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      getElectro();
                      setCategory("Electronics");
                    }}
                  >
                    Electronics
                  </a>
                </li>
                <li>
                  <a
                    class="dropdown-item"
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      // setting function
                      setCategory("Furnitures");
                      getFurnitures();
                    }}
                  >
                    Furnitures
                  </a>
                </li>
              </ul>
            </div>
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="form-control w-25"
              placeholder="Enter a product..."
            />
            <button
              className="btn btn-success mx-1"
              onClick={() => {
                searchData();
              }}
            >
              Search
            </button>
          </div>
        </div>
        {/* using bootstrap components */}
        <div className="container-fluid mt-4">
          <div className="row">
            {searchresult.length !== 0
              ? searchresult.map((data, i) => (
                  <div className="col-sm-12 col-md-4 col-md-3">
                    <div
                      className="card shadow-sm p-3 mb-3"
                    >
                      <div className="card-body">
                        <h3
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {data.pd_name}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img
                            src={data.photo_url}
                            style={{
                              width: 120,
                              height: 120,
                            }}
                          />
                        </div>
                        <p
                          style={{
                            marginTop: 10,
                          }}
                        >
                          Product Name: {data.pd_name}
                        </p>
                        <p style={{}}>Product Price: {data.pd_price}</p>
                        <p style={{}}>Product used Years: {data.pd_years}</p>
                      </div>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          hideProduct(data.productid);
                        }}
                      >
                        Hide Product
                      </button>
                    </div>
                  </div>
                ))
              : products.map((data, i) => (
                  <div className="col-sm-12 col-md-3 col-lg-3 h-75 ">
                    <div
                      className="card shadow-sm p-3 mb-3 h-100"
                      style={{
                        borderRadius: 10,
                        height: 200,
                      }}
                    >
                      <div className="card-body">
                        <h3
                          style={{
                            textAlign: "center",
                          }}
                        >
                          {data.pd_name}
                        </h3>
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                          }}
                        >
                          <img src={data.photo_url} width={180} />
                        </div>
                        <p
                          style={{
                            marginTop: 10,
                          }}
                        >
                          Product Name: {data.pd_name}
                        </p>
                        <p style={{}}>Product Price: {data.pd_price}</p>
                        <p style={{}}>Product used Years: {data.pd_years}</p>
                      </div>
                      <button
                        className="btn btn-success"
                        onClick={() => {
                          hideProduct(data.productid);
                        }}
                      >
                        Hide Product
                      </button>
                    </div>
                  </div>
                ))}
          </div>
        </div>

        <button
          type="button"
          class="btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          id="mainbtn"
        ></button>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" style={{}}>
            <div class="modal-content bg-danger">
              {/* <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Modal title
              </h5>
              
            </div> */}
              <div className="modal-body"></div>
              <div class="modal-footer bg-primary d-flex justify-content-between">
                <h5
                  style={{
                    color: "white",
                  }}
                >
                  No results Found
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Product;
// exporting default products
