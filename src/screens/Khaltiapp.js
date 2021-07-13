import React from "react";
import { useEffect } from "react";
import KhaltiCheckout from "khalti-checkout-web";
import axios from "axios";
import { APP_BASE_URL } from "../Outsource";
let config = {
  // replace this key with yours
  publicKey: "test_public_key_351d6ecf12e0462082525a4ebe850251",
  productIdentity: "1234567890",
  productName: "Drogon",
  productUrl: "http://gameofthrones.com/buy/Dragons",
  eventHandler: {
    onSuccess(payload) {
      console.log(payload);
      // hit merchant api for initiating verfication
      let data = {
        token: payload.token,
        amount: payload.amount,
      };

      fetch("https://khalti.com/api/v2/payment/verify/", {
        method: "post",
        mode: "no-cors",
        headers: {
          Authorization: "Key test_secret_key_e6db29fbe6f140858966723de09e40d5",
        },
        body: data,
      })
        .then((response) => {
          axios
            .post(APP_BASE_URL + "/khaltipay", {
              status: 1,
            })
            .then(function (response) {
              if (response.data === "fail") {
                console.log("failed");
              } else {
                window.close();
                window.close();
              }
            });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // onError handler is optional
    onError(error) {
      // handle errors
      console.log(error);
    },
    onClose() {
      console.log("widget is closing");
    },
  },
  paymentPreference: [
    "KHALTI",
    "EBANKING",
    "MOBILE_BANKING",
    "CONNECT_IPS",
    "SCT",
  ],
};

let checkout = new KhaltiCheckout(config);
function Khaltiapp() {
  useEffect(() => {
    checkout.show({ amount: 1000 });
  });
  return <div></div>;
}

export default Khaltiapp;
