import axios from "axios";
import React from "react";
import { APP_BASE_URL } from "../Outsource";
function Usersdata({ id, name, photo }) {
  const deleteUser = (id) => {
    axios
      .post(APP_BASE_URL + "/deleteUser", {
        id: id,
      })
      .then(function (response) {
        if (response.data == "success") {
          document.getElementById("btnclose").click();
        } else {
          alert("no such user");
        }
      });
  };
  return (
    <>
      <div className="container main-container my-5">
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">User_id</th>
              <th scope="col">User_name</th>
              <th scope="col">User_photourl</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{id}</td>
              <td>{name}</td>
              <td>{photo}</td>
              <td>
                <button
                  className="btn btn-danger"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  // onClick={() => {
                  //   deleteUser(id);
                  // }}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div
        class="modal fade mt-5"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog ">
          <div class="modal-content">
            <div class="modal-header">
              <h4 class="modal-title bg-gray" id="staticBackdropLabel">
                SoltiMart
              </h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="btnclose"
              ></button>
            </div>
            <div
              class="modal-body"
              style={{
                fontFamily: "sans-serif",
              }}
            >
              Are you sure you want to delete this user?
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                class="btn btn-danger"
                onClick={() => {
                  deleteUser(id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Usersdata;
