
function Balance({ balance }) {
  if(balance.xrdAmt !== "" || balance.aggieSwapAmt !== ""){
    return (
      <div>
        <h1>---- Account Balance ----</h1>
        <h2>XRD : {balance.xrdAmt}</h2>
        <h2>AggieSwap: {balance.aggieSwapAmt}</h2>
      </div>
    )
  }
}

export default Balance
