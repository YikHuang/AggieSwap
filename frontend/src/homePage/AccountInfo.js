
function AccountInfo({ accountInfo }) {
  if(accountInfo.addr !== "" && accountInfo.privateKey !== "" ){
    return (
      <div>
        <h3>
          ID : {accountInfo.addr}
        </h3>
        <h3>
          Password : {accountInfo.privateKey}
        </h3>        
      </div>
    );
  }
}

  export default AccountInfo;
  