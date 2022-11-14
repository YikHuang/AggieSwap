import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Axios from 'axios';

function Confirm() {
  const [payment, setPayment] = useSearchParams();
  const [transactionFee, setTransactionFee] = useState({fee: "", currency: ""});
  const [successfulDialog, setSuccessfulDialog] = useState(false);
  const [failedDialog, setFailedDialog] = useState(false);
  const addrRef = useRef();
  const privateKeyRef = useRef();

  const paidAmt = payment.get('paidAmt');
  const paidCurrency = payment.get('paidCurrency');
  const receivedAmt = payment.get('receivedAmt');
  const receivedCurrency = payment.get('receivedCurrency');

  useEffect(() => {
    if(transactionFee.fee === ""){
      SendGetTransacFeeRequest();
    }
  })


  return (
    <>
      <div>
        <h1>{paidAmt} {paidCurrency} =&gt; {receivedAmt} {receivedCurrency}</h1>
      </div>
      <div>
        <h3>Transaction Fee: {transactionFee.fee} {transactionFee.currency}</h3>
      </div>
      <div>
        <h3>Max Slippage: 0.3%</h3>
      </div>
      <div>
        <input type="text" className="transactionTextbox" ref={addrRef} placeholder="Account Address"></input>
      </div>
      <div>
        <input type="text" className="transactionTextbox" ref={privateKeyRef} placeholder="Private Key"></input>
      </div>
      <div className="radiusButton">
        <button onClick={(e) => SendSwapRequest(e)}>Confirm</button>
        <a href="/swap" className="button">Cancel</a>
      </div>
      {successfulDialog && (
        <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
          <h1 className="modal-text">Transaction Success</h1>
          <a href="/wallet" className="close-modal">close</a>
        </div>
        </div>
      )}
      {failedDialog && (
        <div className="modal">
        <div className="overlay"></div>
        <div className="modal-content">
          <h1 className="modal-text">Transaction Failed</h1>
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
