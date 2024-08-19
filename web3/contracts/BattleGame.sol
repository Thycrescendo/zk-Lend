// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BattleGame {
    mapping(address => uint256) public balances;

    // Event emitted when a deposit is made
    event Deposit(address indexed account, uint256 amount);

    // Function to deposit Ether into the contract
    function deposit() external payable {
        balances[msg.sender] += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    // Function to view the balance of the caller
    function getBalance() external view returns (uint256) {
        return balances[msg.sender];
    }
}