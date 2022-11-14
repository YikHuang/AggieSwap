
function AccountInfo({ accountInfo }) {
  if(accountInfo.addr !== "" && accountInfo.privateKey !== "" ){
    return (
      <div>
        <h3>
          Address : {accountInfo.addr}
        </h3>
        <h3>
          Private Key : {accountInfo.privateKey}
        </h3>        
      </div>
    );
  }
}

  export default AccountInfo;
  