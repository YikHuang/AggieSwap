import Axios from 'axios';
import { useState } from "react";
import AccountInfo from './AccountInfo';

function CreateAccount() {
  const [accountInfo, setAccountInfo] = useState({ addr: "", privateKey: "" });

  return(
    <>
      <div className="underscoreButton">
        <button onClick={(e) => SendCreateAccountRequest(e)}>Create Account</button>
      </div>
      <AccountInfo accountInfo={accountInfo}/>
    </>
  );

  
  // Function of sending create account request
  async function SendCreateAccountRequest(e){
    e.preventDefault();
  
    var response;
    const url = "http://localhost:3005/createAccount";
    const apiName = "createAccount";  
    const request = {apiName: apiName};
    console.log(request);
    
    await Axios
      .post(url, request)
      .then(res => {
        response = res.data;
      })
      .catch(error => {
        console.log(error);
      });

    console.log(response);
    setAccountInfo({addr: response.accountAddr, privateKey: response.privateKey});

  }  
}


export default CreateAccount;
