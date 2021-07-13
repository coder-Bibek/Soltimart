import React from "react";

function Addcategory() {
  return (
    <div className="container">
      <div
        className="card "
        style={{
          width: "28rem",
        }}
      >
        <div className="card-header">Add Category</div>
        <div className="card-body">
          <label>Category</label>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Dropdown
            </a>
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li>
                <a class="dropdown-item" href="#">
                  Action
                </a>
              </li>
              <li>
                <a class="dropdown-item" href="#">
                  Another action
                </a>
              </li>
            </ul>
          </li>
        </div>
      </div>
    </div>
  );
}

export default Addcategory;
