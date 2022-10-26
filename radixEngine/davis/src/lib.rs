use scrypto::prelude::*;

blueprint! {
    struct Davis {
        // Define what resources and data will be managed by Davis components
        aggieSwap: Vault,
        xrd: Vault,
        price: Decimal,
        transactionFee: Decimal,
    }

    impl Davis {
        // Implement the functions and methods which will manage those resources and data
        
        // This is a function, and can be called directly on the blueprint once deployed
        pub fn new(price: Decimal, transactionFee: Decimal) -> ComponentAddress {
            // Create a new token called "AggieSwap" with a fixed supply of 1000, and put that supply into a bucket
            let aggieSwapBucket: Bucket = ResourceBuilder::new_fungible()
                .metadata("name", "AggieSwap")
                .metadata("symbol", "AS")
                .initial_supply(1000);

            // Instantiate a Davis component, populating its vault with our supply of 1000 AggieSwap
            Self {
                aggieSwap: Vault::with_bucket(aggieSwapBucket),
                xrd: Vault::new(RADIX_TOKEN),
                price: price,
                transactionFee: transactionFee,
            }
            .instantiate()
            .globalize()
        }

        // Get the price of AggieSwap
        pub fn get_price(&mut self) -> Decimal{
            self.price
        }

        pub fn get_transaction_fee(&mut self) -> Decimal{
            self.transactionFee
        }


        // Buy AggieSwap
        pub fn buy_token(&mut self, mut payment: Bucket, mut fee: Bucket) -> (Bucket, Bucket, Bucket) {
            
            assert!(payment.amount() >= self.price, "Payment is not enough for buying at least one token");
            assert!(fee.amount() >= self.transactionFee, "Transaction fee is not enough for executing the transaction");

            // Calculate how many tokens can the user gets
            let tokens:Decimal;
            let cost:Decimal;

            tokens = (payment.amount() / self.price).floor();
            cost = tokens * self.price;
            
            // Take the xrd from bucket to vault
            self.xrd.put(payment.take(cost));
            self.xrd.put(fee.take(self.transactionFee));

            // If the semi-colon is omitted on the last line, the last value seen is automatically returned
            (self.aggieSwap.take(tokens), payment, fee)
        }
    }
}
