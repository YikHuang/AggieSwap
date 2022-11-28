

function Balance({ balance }) {
  if(balance.xrdAmt !== "" || balance.aggieSwapAmt !== ""){
    return (
      <div class="row gx-4 gx-lg-5 h-100 align-items-center justify-content-center text-center">
        <p class="text-white-75 mb-5">---- Your Account Balance ----</p>
        <p class="text-white-75 mb-5">XRD : {balance.xrdAmt}</p>
        <p class="text-white-75 mb-5">AggieSwap: {balance.aggieSwapAmt}</p>
      </div>
    )
  }
}

export default Balance
