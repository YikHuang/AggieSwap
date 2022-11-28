import Currency from "./Currency"
import { useState, useRef } from "react";
import Axios from 'axios';
import exchange from './exchange.png';

function Swap() {
  const [payment, setPayment] = useState({paidAmt: 0, paidCurrency: "", receivedAmt: "", receivedCurrency: "", rate: 0});
  const paymentRef = useRef();

  return (
    <div class="center" >
      <div class="flex-container container px-4 px-lg-5">  
        <div id="warpper-transac-text-box">
          <input onChange={(e) => handlePaymentInput(e)} type="number" ref={paymentRef} className="transactionTextbox" />
          <span id="currency-text">XRD</span>
        </div>
        <div class="col-lg-3 col-md-6 text-center">
          <img src={exchange} width="50px" height="50px" />
        </div>
        <div id="warpper-transac-text-box">
          <input type="number" className="transactionTextbox" value={payment.receivedAmt} readOnly></input>
          <span id="currency-text">AggieToken</span>
        </div>
        <Currency payment={payment}/>
      </div>
      <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
        <p class="text-white-75 mb-5 cur-style">1 XRD = 1.863 AG</p>
      </div>
      <div class="flex-container">
          <a href={"/confirm?paidAmt=" + payment.paidAmt + "&paidCurrency=" + payment.paidCurrency + 
                "&receivedAmt=" + payment.receivedAmt + "&receivedCurrency=" + payment.receivedCurrency} 
            className="btn btn-primary btn-xl">Buy</a>
      </div>
    </div>
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
