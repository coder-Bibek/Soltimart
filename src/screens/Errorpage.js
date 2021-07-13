import React from "react";
// calling main function
function Errorpage() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <h2
        style={{
          textAlign: "center",
        }}
      >
        Error
      </h2>
      <button
        className="btn btn-primary"
        onClick={() => {
          window.location.href = "http://localhost:3000/";
        }}
      >
        Back to Login
      </button>
    </div>
  );
}

export default Errorpage;
