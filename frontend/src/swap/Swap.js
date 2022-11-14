import Currency from "./Currency"
import { useState, useRef } from "react";
import Axios from 'axios';

function Swap() {
  const [payment, setPayment] = useState({paidAmt: 0, paidCurrency: "", receivedAmt: "", receivedCurrency: "", rate: 0});
  const paymentRef = useRef();

  return (
    <>
      <div>
        <h3>XRD</h3>
        <input onChange={(e) => handlePaymentInput(e)} type="number" ref={paymentRef} className="transactionTextbox" />
      </div>
      <div className="transactionForm">
        <h3>AggieSwap</h3>
        <input type="number" className="transactionTextbox" value={payment.receivedAmt} readOnly></input>
      </div>
      <Currency payment={payment}/>
      <div className="radiusButton">
        <a href={"/confirm?paidAmt=" + payment.paidAmt + "&paidCurrency=" + payment.paidCurrency + 
                "&receivedAmt=" + payment.receivedAmt + "&receivedCurrency=" + payment.receivedCurrency} 
           className="button">Buy</a>
      </div>
    </>
  )

  function handlePaymentInput(e){
    var baseCur = "XRD";
    var paidAmt = Number(paymentRef.current.value);

    SendGetCurrencyRequest(paidAmt, baseCur);
  }

  // Function of sending "get currency" request
  async function SendGetCurrencyRequest(paidAmt, baseCur){

    var response;
    const url = "http://localhost:3005/getCurrency";
    const apiName = "getCurrency";
    const request = {apiName: apiName, baseCur: baseCur};
    console.log(request);
    
    await Axios
      .post(url, request)
      .then(res => {
        response = res.data;

        var receivedAmt = paidAmt * response.amt;
        if(receivedAmt === 0){
          receivedAmt = "";
        }

        setPayment({paidAmt: paidAmt, paidCurrency: baseCur, receivedAmt: receivedAmt, 
          receivedCurrency: response.currency, rate: response.amt});
      })
      .catch(error => {
        console.log(error);
      });

    console.log(response);

  }  

}

export default Swap
