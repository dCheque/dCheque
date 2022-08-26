# Cheq v0.0
Deposit ETH and write cheques to others that are time locked and can be reversed

1. Deposit ETH into the dApp
2. writeCheque() to an address for an amount specified
3. The recipient can cashCheque() once the check matures and the dApp will transfer the ETH
4. If the drawer of the cheque decides to void the payment, their trusted reviewer can do so on their behalf


## Set up
Run the command below to install from scratch:
```
make fresh-install
```
Run the front-end:
```
npm run start
```
Run the local blockchain:
```
anvil
```
Deploy the contracts to the blockchain
```
make deploy
```


Run the commands below to update dependencies:
```
forge update lib/forge-std
forge update lib/openzeppelin-contracts
```