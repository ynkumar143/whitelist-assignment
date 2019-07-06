#Whitelist Assignment 

## Overview

In distributed system, a whitelisting is a procedure which only allows approved Ethereum addresses to interact with the system. For example, users who submit the Ethereum address with proper identification documents will be approved. These users would have few devices and each one of them is associated with an Ethereum address called device address. The user with their whitelisted address can add the device address.

The Whitelist assignment directory is a truffle project that contains required contract, migration and test files. In the assignment you are going to implement the WhiteList.sol contract and write some test in solidity. 

Clone this repo to your local machine. 

Follow the conditions mentioned below while writing functions in WhiteList.sol smart contract. 

The contract contains a framework and comments to implement the contract. Follow the comments outlined in WhiteList.sol (in the contracts directory) to implement the contract. We have written a set of tests (in javascript) to determine if you implement the contract correctly. As an additional challenge, try writing some Solidity tests in TestWhiteList.sol.

To test your implementation start your development blockchain by running `$ truffle develop` from the terminal in the project directory. From the truffle console, compile and migrate the contracts by running `compile` and `migrate`. You can run the pre-written tests by running `test`.

If your tests do not pass, modify the contract, recompile, redeploy and retest. Iterate until all of the tests pass.

## A note on testing

Check out the testing files to see how tests are implemented in Javascript.

## Usage of References

1. To understand the interaction with already developed contract with us, use document "Steps To Clone WhiteList Smart Contract" and write your functions and validations accordingly. 

2. Go through Gas_usages.txt file where you can the see gas usages used for each function. 

We are interest in code, that can execute functions with better gas optimizations than the shared gas_usages.txt file. 

## Conditions

The maximum number of device addresses they can add under their whitelisted account is 64. 
The administrator would require a smart contract to whitelist Ethereum addresses. The same will be used by the whitelisted addresses to add device addresses under already whitelisted Ethereum addresses. 

Here is the snippet of exact function spec

If an Ethereum address is added as a device account, it cannot be added as a primary account. 

An example scenario:
    
    Let's say; A, B, C, D, E, F, G, H are Ethereum addresses

    A is the owner of this smart contract

    A adds B, C to whitelist (addUserToWhitelist )

    B adds D, E, F as devices (addDevice)

    C adds G, H as devices (addDevice)

## Final Output

1. See the list of devices that are added by users B. Output should return D, E, F addresses. 

2. Function to display owner of device / user. (Note: User's owner should be owner of the contract)

3. Function to verify input ethereum address is whitelisted or not. 

4. Remove any WhitelistedUser. Removal can be done by only owner of the contract. User's removal should remove all the listed devices under this user. 

5. Remove any WhitelistedDevice. Removal can be done by only device owner. 

You are free to use Remix or any other web compiled platforms instead of truffle and local instances. 

