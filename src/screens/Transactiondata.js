import React from "react";
function Transactiondata({
  product_id,
  user_id,
  photo_url,
  pd_name,
  pd_brand,
  quantity,
}) {
  return (
    <>
      <tbody className="mb-3">
        <tr>
          <td>{product_id}</td>
          <td>{user_id}</td>
          <td>{photo_url}</td>
          <td>{pd_name}</td>
          <td>{pd_brand}</td>
          <td>{quantity}</td>
        </tr>
      </tbody>
    </>
  );
}

export default Transactiondata;
