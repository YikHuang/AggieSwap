function TransactionFee({ transactionFee }) {
    if(transactionFee.fee !== "" && transactionFee.currency !== "" ){
      return (
        <>
          {transactionFee.fee} {transactionFee.currency} 
        </>
      );
    }
  }
  
    export default TransactionFee;