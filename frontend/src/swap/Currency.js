
function Currency({payment}) {
  
  if(payment.paidAmt !== 0){
    return (
      <div>
        1 {payment.paidCurrency} = {payment.rate} {payment.receivedCurrency}
      </div>
    );
  }

}

export default Currency
