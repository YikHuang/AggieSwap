import { useRef, useState } from "react"
import Axios from "axios";

function Wallet() {
  const addrRef = useRef();
  const privateKeyRef = useRef();
  const [balance, setBalance] = useState({xrdAmt: "", aggieSwapAmt: ""});


  const [successfulDialog, setSuccessfulDialog] = useState(false);
  const [failedDialog, setFailedDialog] = useState(false);


  return (
    <>
      {/* <div class="flex-container2 container px-4 px-lg-5">
        <div>
          <input type="text" className="transactionTextbox" ref={addrRef} placeholder="Account Address"></input>
        </div>
        <div>
          <input type="text" className="transactionTextbox" ref={privateKeyRef} placeholder="Private Key"></input>
        </div>
        
      </div>
      <div class="flex-container2 container px-4 px-lg-5">
        <button className="btn btn-primary btn-xl" onClick={(e) => SendGetAccountInfo(e)}>Get Balance</button>
      </div>
      
      <Balance balance={balance}/> */}



      <div class="center">
        <div class="flex-container2 container row-cols-md-auto text-center">  
        <h1 class="text-white font-weight-bold">Wallet</h1>
          <div id="warpper-transac-text-box">
            {/* <h3>Account Address</h3> */}
            {/* <input type="text" className="transactionTextbox" ref={addrRef} placeholder="Account Address"></input> */}
            <input id="textsize" type="text" ref={addrRef} className="transactionTextbox" />
            <span id="account-text">ID</span>
          </div>
          <div class="col-lg-3 row-cols-md-auto text-center">
            {/* <h1>=&gt;</h1> */}
            {/* <img src="exchange.png" width="70px" height="70px" onerror="Image error" alt="" /> */}
          </div>
          {/* <div className="transactionForm"> */}
          <div id="warpper-transac-text-box">
            {/* <h3>Private Key</h3> */}
            {/* <input type="text" className="transactionTextbox" ref={privateKeyRef} placeholder="Private Key"></input> */}
            <input id="textsize" type="text" ref={privateKeyRef} className="transactionTextbox" />
            <span id="account-text">Password</span>
          </div>
        </div>
        <div class="flex-container2 container px-4 px-lg-5">
          <button className="btn btn-primary btn-xl" onClick={(e) => SendGetAccountInfo(e)}>Get Balance</button>
          <a href="/" className="btn btn-primary btn-xl">Cancel</a>
        </div>
        <div class="flex-container4 row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
          {/* <p class="text-white-75 mb-5"><Balance balance={balance}/></p> */}
        </div>
      </div>

      {successfulDialog && (
    <div className="modal-popup">
    <div className="overlay"></div>
    <div className="modal-content">
      <h3 className="modal-text">XRD: {balance.xrdAmt}</h3>
      <h3 className="modal-text">AGS: {balance.aggieSwapAmt}</h3>
      <a href="/wallet" className="close-modal">close</a>
    </div>
    </div>
  )}
  
  {failedDialog && (
    <div className="modal-popup">
    <div className="overlay"></div>
    <div className="modal-content">
      <h3 className="modal-text">No account found</h3>
      <a href="/wallet" className="close-modal">close</a>
    </div>
    </div>
  )}


    </>
  )


  



  async function SendGetAccountInfo(){

    var response;
    const url = "http://localhost:3005/getAccountInfo";
    const apiName = "getAccountInfo";
    const request = {apiName: apiName, accountAddr: addrRef.current.value};
    console.log(request);
    
    await Axios
      .post(url, request)
      .then(res => {
        response = res.data;
        setBalance({xrdAmt: response.xrdAmt, aggieSwapAmt: response.aggieSwapAmt});

        setSuccessfulDialog(true);

      })
      .catch(error => {
        console.log(error);
        setFailedDialog(true);
      });

    console.log(response);

  }  
}

export default Wallet
