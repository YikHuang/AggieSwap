import { useRef, useState } from "react"
import Axios from "axios";
import Balance from "./Balance";

function Wallet() {
  const addrRef = useRef();
  const privateKeyRef = useRef();
  const [balance, setBalance] = useState({xrdAmt: "", aggieSwapAmt: ""});

  return (
    <>
      <div>
        <input type="text" className="transactionTextbox" ref={addrRef} placeholder="Account Address"></input>
      </div>
      <div>
        <input type="text" className="transactionTextbox" ref={privateKeyRef} placeholder="Private Key"></input>
      </div>
      <div>
        <button className="btn btn-primary btn-xl" onClick={(e) => SendGetAccountInfo(e)}>Get Balance</button>
      </div>
      <Balance balance={balance}/>
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
