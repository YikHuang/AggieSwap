import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Axios from 'axios';
import arrow from './arrow.png';
import TransactionFee from './TransactionFee';

function Confirm() {
  const [payment, setPayment] = useSearchParams();
  const [transactionFee, setTransactionFee] = useState({fee: "", currency: ""});
  const [successfulDialog, setSuccessfulDialog] = useState(false);
  const [failedDialog, setFailedDialog] = useState(false);
  const [transactionFeeButton, setTransactionFeeButton] = useState(true);
  const addrRef = useRef();
  const privateKeyRef = useRef();

  const paidAmt = payment.get('paidAmt');
  const paidCurrency = payment.get('paidCurrency');
  const receivedAmt = payment.get('receivedAmt');
  const receivedCurrency = payment.get('receivedCurrency');


  return (
    <>
      <div className="flex-container container row-cols-md-auto text-center">
        <div>
          <h2>{paidAmt} {paidCurrency}<img src={arrow} width="28px" height="28px" />
          {receivedAmt} {receivedCurrency}</h2>
          <h3>
            Transaction Fee: <TransactionFee transactionFee={transactionFee}/>
            {transactionFeeButton && <button onClick={(e) => SendGetTransacFeeRequest(e)}>Show Transaction Fee</button>}
          </h3>
          <h3>Max Slippage: 0.3%</h3>
        </div>
        <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
          <p class="text-white-75 mb-5"></p>        
          <p class="text-white-75 mb-5">If the information above is right, please login again</p>        
        </div>
        <div id="warpper-transac-text-box">
          {/* <input type="text" className="transactionTextbox" ref={addrRef} placeholder="Account Address"></input> */}
          <input type="text" ref={addrRef} className="transactionTextbox" />
          <span id="currency-text">ID</span>
        </div>
        <div id="warpper-transac-text-box">
          {/* <input type="text" className="transactionTextbox" ref={privateKeyRef} placeholder="Private Key"></input> */}
          <input type="text" ref={privateKeyRef} className="transactionTextbox" />
            <span id="currency-text">Password</span>
        </div>
        
      </div>
      <div class="flex-container3">
        <button className="btn btn-primary btn-xl" onClick={(e) => SendSwapRequest(e)}>Confirm</button>
        <a href="/swap" className="btn btn-primary btn-xl">Cancel</a>
      </div>



      {successfulDialog && (
        <div className="modal-popup">
        <div className="overlay"></div>
        <div className="modal-content">
          <h3 className="modal-text">Transaction Success</h3>
          <a href="/swap" className="close-modal">close</a>
        </div>
        </div>
      )}
      {failedDialog && (
        <div className="modal-popup">
        <div className="overlay"></div>
        <div className="modal-content">
          <h3 className="modal-text">Transaction Failed</h3>
          <a href="/swap" className="close-modal">close</a>
        </div>
        </div>
      )}

    </>
  )


  async function SendGetTransacFeeRequest(){

    var response;
    const url = "http://localhost:3005/getTransacFee";
    const apiName = "getTransacFee";
    const request = {apiName: apiName};
    console.log(request);
    
    await Axios
      .post(url, request)
      .then(res => {
        response = res.data;
        setTransactionFee({fee: response.fee, currency: response.currency});
        setTransactionFeeButton(false);
      })
      .catch(error => {
        console.log(error);
      });

    console.log(response);

  }  

  async function SendSwapRequest(e){
    e.preventDefault();

    var response;
    const url = "http://localhost:3005/swap";
    const apiName = "swap";
    const accountAddr = addrRef.current.value;
    const privateKey = privateKeyRef.current.value;

    const request = {apiName: apiName, accountAddr: accountAddr, privateKey: privateKey, 
      amt: paidAmt, fee: transactionFee.fee, from: paidCurrency, to: receivedCurrency};
    console.log(request);
    
    await Axios
      .post(url, request)
      .then(res => {
        response = res.data;
        if(response.isSuccessful == true){
          setSuccessfulDialog(true);
        }
        else{
          setFailedDialog(true);
        }
      })
      .catch(error => {
        console.log(error);
      });

    console.log(response);

  }  

}

export default Confirm