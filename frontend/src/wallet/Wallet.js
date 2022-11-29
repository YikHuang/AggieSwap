import { useRef, useState } from "react"
import Axios from "axios";
import Balance from "./Balance";

function Wallet() {
  const addrRef = useRef();
  const privateKeyRef = useRef();
  const [balance, setBalance] = useState({xrdAmt: "", aggieSwapAmt: ""});

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
            <input type="text" className="transactionTextbox" ref={addrRef} placeholder="Account Address"></input>
          </div>
          <div class="col-lg-3 row-cols-md-auto text-center">
            {/* <h1>=&gt;</h1> */}
            {/* <img src="exchange.png" width="70px" height="70px" onerror="Image error" alt="" /> */}
          </div>
          {/* <div className="transactionForm"> */}
          <div>
            {/* <h3>Private Key</h3> */}
            <input type="text" className="transactionTextbox" ref={privateKeyRef} placeholder="Private Key"></input>
          </div>
        </div>
        <div class="flex-container2 container px-4 px-lg-5">
          <button className="btn btn-primary btn-xl" onClick={(e) => SendGetAccountInfo(e)}>Get Balance</button>
          <a href="/" className="btn btn-primary btn-xl">Cancel</a>
        </div>
        <div>
          <Balance balance={balance}/>
        </div>
      </div>
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
      })
      .catch(error => {
        console.log(error);
      });

    console.log(response);

  }  
}

export default Wallet
